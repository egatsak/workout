import { Fragment } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import Layout from "../../common/Layout";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

import cn from "classnames";
import styles from "./SingleWorkout.module.scss";
import bgImage from "./../../../images/bg-workout.jpg";

const WorkoutsList = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isSuccess, isLoading, isError } = useQuery(
    "get workouts",
    () =>
      $api({
        url: `/workouts`
      }),
    {
      refetchOnWindowFocus: false
    }
  );

  const { mutate: createWorkoutLog, isSuccess: isSuccessMutation } =
    useMutation(
      "Create new workout log",
      ({ workoutId }) =>
        $api({
          url: "/workouts/log",
          type: "POST",
          body: { workoutId }
        }),
      {
        onSuccess(data) {
          navigate(`/workout/${data._id}`);
        }
      }
    );

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <>
      <Layout bgImage={bgImage} heading="Workouts" />

      <div className={cn(styles.wrapper, styles.main)}>
        {isLoading && <Loader />}
        {isSuccessMutation && <Alert>Workout log created</Alert>}
        {isSuccess &&
          data.map((workout) => {
            return (
              <Fragment key={`workout_${workout._id}`}>
                <button
                  className={styles["wrapper-exercise"]}
                  aria-label="Create new workout"
                  onClick={() => {
                    createWorkoutLog({
                      workoutId: workout._id
                    });
                  }}
                >
                  <span>{workout.name}</span>
                </button>
              </Fragment>
            );
          })}
        {(isError || data?.length === 0) && (
          <Alert type="warning">Workouts not found</Alert>
        )}
      </div>
    </>
  );
};

export default WorkoutsList;
