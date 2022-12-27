import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import cn from "classnames";
import stylesLayout from "../../common/Layout.module.scss";
import styles from "./SingleWorkout.module.scss";
import bgImage from "./../../../images/home-bg.jpg";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../common/Header/Header";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import { Fragment, useEffect } from "react";

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
    error: errorCompleted,
    isSuccess: isSuccessMutate
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
        /*         navigate(`/workouts`); */
      }
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      data?.exerciseLogs?.every((log) => log.completed)
    ) {
      setWorkoutCompleted();
    }
  }, [isSuccess, data?.exerciseLogs]);

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
        {isMutationLoading && <Loader />}
        {isError && <Alert type="error">Workout wasn't found!</Alert>}
        {errorCompleted && (
          <Alert type="error">{errorCompleted}</Alert>
        )}

        {/*        {isSuccessMutate && <Alert>Exercise log created</Alert>} */}
        {isSuccess &&
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
