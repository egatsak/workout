import { Navigate, useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import { $api } from "../../../api/api";

import cn from "classnames";
import stylesLayout from "../../common/Layout.module.scss";
import styles from "./SingleExercise.module.scss";
import bgImage1 from "./../../../images/bg-workoutpage.jpg";
import bgImage2 from "./../../../images/bg-exercisepage-alt.jpg";
import checkboxImage from "./../../../images/icon-checkbox.svg";
import checkboxCompletedImage from "./../../../images/icon-checkbox-selected.svg";

import Header from "../../common/Header/Header";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";
import { useEffect, useState } from "react";

function randomInteger(min) {
  return function (max) {
    const random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };
}

const randomIntegerFrom1 = randomInteger(1);

const SingleExercise = () => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const { id } = useParams();
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    randomIntegerFrom1(2) === 1
      ? setBgImage(bgImage1)
      : setBgImage(bgImage2);
  }, []);

  const { data, isSuccess, isLoading, isError, refetch } = useQuery(
    "get exercise",
    () =>
      $api({
        url: `/exercises/log/${id}`
      }),
    {
      refetchOnWindowFocus: false
    }
  );

  const {
    mutate,
    isLoading: isLoadingMutation,
    error: errorMutation
  } = useMutation(
    "Change log state",
    ({ timeIndex, key, value }) =>
      $api({
        url: "/exercises/log",
        type: "PUT",
        body: { timeIndex, key, value, logId: id }
      }),
    {
      onSuccess() {
        refetch();
      },
      onError() {}
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
          backgroundImage: `url(${bgImage})`
        }}
      >
        <Header />
        {isSuccess && !isLoading && (
          <div className={cn(stylesLayout.heading, styles.heading)}>
            <img
              src={`/uploads/exercise/icon-${data.exercise.imageName}.svg`}
              alt={data.exercise.name}
            />
            <h1> {data.exercise.name}</h1>
          </div>
        )}
      </div>

      <div className={cn(styles.wrapper, styles.main)}>
        {(isLoading || isLoadingMutation) && <Loader />}
        {(isError || data?.length === 0) && (
          <Alert type="warning">Times not found</Alert>
        )}
        {errorMutation && <Alert type="error">{errorMutation}</Alert>}
        {isSuccess && (
          <div className={styles["table-wrapper"]}>
            <div className={styles.row} key="heading">
              <div className={cn(styles.opacity, styles.column)}>
                Previous
              </div>
              <div className={styles.column}>Weight / Repeats</div>
              <div className={styles.column}>Completed</div>
            </div>

            {data.times.map((item, idx) => {
              return (
                <div
                  className={cn(styles.row, {
                    [styles.completed]: item.completed
                  })}
                  key={item._id}
                >
                  <div className={cn(styles.opacity, styles.column)}>
                    <input
                      type="number"
                      value={item.prevWeight}
                      disabled
                    />
                    <i>kg /</i>
                    <input
                      type="number"
                      value={item.prevRepeat}
                      disabled
                    />
                  </div>
                  <div className={styles.column}>
                    <input
                      type="number"
                      defaultValue={item.weight}
                      disabled={item.completed}
                      onChange={() => {}}
                      onBlur={(e) => {
                        mutate({
                          timeIndex: idx,
                          key: "weight",
                          value: e.target.value
                        });
                      }}
                    />
                    <i>kg /</i>
                    <input
                      type="number"
                      defaultValue={item.repeat}
                      disabled={item.completed}
                      onChange={() => {}}
                      onBlur={(e) => {
                        mutate({
                          timeIndex: idx,
                          key: "repeat",
                          value: e.target.value
                        });
                      }}
                    />
                  </div>
                  <div className={styles.column}>
                    <img
                      src={
                        item.completed
                          ? checkboxCompletedImage
                          : checkboxImage
                      }
                      alt="Checkbox"
                      className={styles.checkbox}
                      onClick={() => {
                        mutate({
                          timeIndex: idx,
                          key: "completed",
                          value: !item.completed
                        });
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleExercise;
