import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import { useQuery } from "react-query";

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
        {isLoading && <Loader />}
        {isSuccess &&
          data.exercises.map((ex, idx) => {
            return (
              <Fragment key={`ex${ex.name}`}>
                <Link to={`/exercises/${ex._id}`}>
                  <div className={styles["wrapper-exercise"]}>
                    <span>{ex.name}</span>
                    <img
                      src={`/uploads/exercise/icon-${ex.imageName}.svg`}
                      alt={ex.name}
                    />
                  </div>
                </Link>
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
