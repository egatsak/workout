import { Link, Navigate, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

import cn from "classnames";
import styles from "./SingleWorkout.module.scss";
import bgImage from "./../../../images/bg-workout.jpg";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import Layout from "../../common/Layout";

const WorkoutsList = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const { data, isSuccess, isLoading, isError } = useQuery(
    "get workouts",
    () =>
      $api({
        url: `/workouts`
      }),
    {
      refetchOnWindowFocus: false,
      retry: 1
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
        {isSuccess &&
          data.map((workout) => (
            <Link
              to={`/workout/${workout._id}`}
              key={`ex${workout._id}`}
            >
              <div className={styles["wrapper-exercise"]}>
                <span>{workout.name}</span>
              </div>
            </Link>
          ))}
        {(isError || data?.length === 0) && (
          <Alert type="warning">Workouts not found</Alert>
        )}
      </div>
    </>
  );
};

export default WorkoutsList;
