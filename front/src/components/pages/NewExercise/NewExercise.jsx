import { useState } from "react";
import cn from "classnames";
import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./NewExercise.module.scss";
import bgImage from "./../../../images/bg-exercise.jpg";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Loader/Loader";
import Alert from "../../ui/Alert/Alert";

const data = ["chest", "shoulders", "biceps", "legs", "hit"];

const NewExercise = () => {
  const [name, setName] = useState("");
  const [times, setTimes] = useState(3);
  const [imageName, setImageName] = useState("chest");

  const { isAuth } = useAuth();
  const location = useLocation();

  const { isSuccess, mutate, isLoading, error } = useMutation(
    "Create new exercise",
    () =>
      $api({
        url: "/exercises",
        type: "POST",
        body: { name, times, imageName }
      }),
    {
      onSuccess(data) {
        console.log(data);
        setName("");
        setTimes(3);
        setImageName("chest");
      }
    }
  );

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new exercise" />

      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        {isSuccess && <Alert>Exercise created</Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Enter times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            required
          />
          <div className={styles.images}>
            {data.map((item) => {
              return (
                <img
                  key={`ex_${item}`}
                  src={`uploads/exercise/icon-${item}.svg`}
                  alt={`Icon-${item}`}
                  className={cn({
                    [styles.active]: imageName === item
                  })}
                  onClick={() => {
                    setImageName(item);
                  }}
                />
              );
            })}
          </div>

          <Button type="submit" variant="accent">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewExercise;
