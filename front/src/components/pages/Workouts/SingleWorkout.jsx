import { Fragment, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import Header from "../../common/Header/Header";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

import cn from "classnames";
import stylesLayout from "../../common/Layout.module.scss";
import styles from "./SingleWorkout.module.scss";
import bgImage from "./../../../images/bg-home.jpg";

const SingleWorkout = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError } = useQuery(
    "get workout",
    () =>
      $api({
        url: `/workouts/log/${id}`
      }),
    {
      refetchOnWindowFocus: false
    }
  );

  const {
    mutate: setWorkoutCompleted,
    isLoading: isMutationLoading,
    error: errorCompleted
  } = useMutation(
    "Change log state",
    () =>
      $api({
        url: "/workouts/log/completed",
        type: "PUT",
        body: { logId: id }
      }),
    {
      onSuccess() {
        navigate(`/workouts`);
      }
    }
  );

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (
      isSuccess &&
      data?.exerciseLogs?.every((log) => log.completed)
    ) {
      setWorkoutCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data?.exerciseLogs, isLoading]);

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <>
      <div
        className={cn(stylesLayout.wrapper, stylesLayout.otherpage)}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPositionY: "10%"
        }}
      >
        <Header />
        {isSuccess && (
          <div className={styles.profile}>
            <time className={styles.time}>{data.minutes} min.</time>
            <h1 className={stylesLayout.heading}>
              {data.workout.name}
            </h1>
          </div>
        )}
      </div>

      <div className={cn(styles.wrapper, styles.main)}>
        {(isLoading || isMutationLoading) && <Loader />}
        {isError && <Alert type="error">Workout wasn't found!</Alert>}
        {errorCompleted && (
          <Alert type="error">{errorCompleted}</Alert>
        )}

        {isSuccess &&
          !isLoading &&
          data.exerciseLogs.map((exLog, idx) => {
            return (
              <Fragment key={`ex${exLog._id}`}>
                <button
                  className={styles["wrapper-exercise"]}
                  aria-label="Link to exercise"
                  onClick={() => {
                    navigate(`/exercise/${exLog._id}`);
                  }}
                >
                  <span>{exLog.exercise.name}</span>
                  <img
                    src={`/uploads/exercise/icon-${exLog.exercise.imageName}.svg`}
                    alt={exLog.exercise.imageName}
                  />
                </button>
                {idx % 2 !== 0 &&
                  idx !== data.exerciseLogs.length - 1 && (
                    <div className={styles.line}></div>
                  )}
              </Fragment>
            );
          })}
        {(isError || data?.length === 0) && (
          <Alert type="warning">Exercises not found</Alert>
        )}
      </div>
    </>
  );
};

export default SingleWorkout;
