import { useState } from "react";
import Select from "react-select";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./NewWorkout.module.scss";
import bgImage from "./../../../images/bg-workout.jpg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation, useQuery } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Loader/Loader";
import Alert from "../../ui/Alert/Alert";

const NewWorkout = () => {
  const [name, setName] = useState("");
  const [exercisesCurrent, setExercisesCurrent] = useState([]);
  const { isAuth } = useAuth();
  const location = useLocation();

  const { data, isSuccess } = useQuery(
    "list exercises",
    () =>
      $api({
        url: "/exercises",
        auth: true
      }),
    {
      refetchOnWindowFocus: false
    }
  );

  const {
    mutate,
    isLoading,
    error,
    isSuccess: isSuccessMutate
  } = useMutation(
    "Create new workout",
    ({ exIds }) =>
      $api({
        url: "/workouts",
        type: "POST",
        body: { name, exerciseIds: exIds }
      }),
    {
      onSuccess(dataMutated) {
        console.log(dataMutated);
        setName("");
        setExercisesCurrent([]);
      }
    }
  );

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const exIds = exercisesCurrent.map((ex) => ex.value);

    mutate({ exIds });
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new workout" />

      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        {isSuccessMutate && <Alert>Workout created</Alert>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Link to="/new-exercise" className="dark-link">
            Add new exercise
          </Link>
          {isSuccess && data && (
            <Select
              classNamePrefix="select2-selection"
              placeholder="Exercises"
              title="Exercises"
              options={data.map((ex) => ({
                value: ex._id,
                label: ex.name
              }))}
              value={exercisesCurrent}
              onChange={setExercisesCurrent}
              isMulti={true}
            />
          )}

          <Button type="submit" variant="accent">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
