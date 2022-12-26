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
import { Fragment } from "react";

const SingleWorkout = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { data, isSuccess, isLoading, isError } = useQuery(
    "get workout",
    () =>
      $api({
        url: `/workouts/${id}`
      }),
    {
      refetchOnWindowFocus: false,
      retry: 1
      /*       enabled: isAuth */
    }
  );

  const {
    mutate,
    isLoading: isMutationLoading,
    error,
    isSuccess: isSuccessMutate
  } = useMutation(
    "Create new workout",
    ({ exId, times }) =>
      $api({
        url: "/exercises/log",
        type: "POST",
        body: { exId, times }
      }),
    {
      onSuccess(dataMutated) {
        navigate(`/exercise/${dataMutated._id}`);
      }
    }
  );

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
            <h1 className={stylesLayout.heading}>{data.name}</h1>
          </div>
        )}
      </div>

      <div className={cn(styles.wrapper, styles.main)}>
        {isMutationLoading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        {isSuccessMutate && <Alert>Exercise log created</Alert>}
        {isSuccess &&
          data.exercises.map((ex, idx) => {
            return (
              <Fragment key={`ex${ex.name}`}>
                <button
                  className={styles["wrapper-exercise"]}
                  aria-label="Link to exercise"
                  onClick={() => {
                    mutate({
                      exId: ex._id,
                      times: ex.times
                    });
                  }}
                >
                  <span>{ex.name}</span>
                  <img
                    src={`/uploads/exercise/icon-${ex.imageName}.svg`}
                    alt={ex.name}
                  />
                </button>
                {idx % 2 === 1 && <div className={styles.line}></div>}
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
