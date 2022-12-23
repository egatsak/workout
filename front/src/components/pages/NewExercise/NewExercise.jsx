import { useState } from "react";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./NewExercise.module.scss";
import bgImage from "./../../../images/bg-exercise.jpg";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const data = ["chest", "shoulders", "biceps", "legs", "hit"];

const NewExercise = () => {
  const [name, setName] = useState("");
  const [times, setTimes] = useState(0);
  const [imageId, setImageId] = useState(0);

  const { isAuth } = useAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new exercise" />

      <div className={styles.wrapper}>
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
                  src={`uploads/exercise/icon-${item}.svg`}
                  alt={`Icon-${item}`}
                />
              );
            })}
          </div>
          {/*  <Select
            classNamePrefix="select2-selection"
            placeholder="Exercises"
            title="Exercises"
            options={[
              { value: "sdfsdf", label: "Push-ups" },
              { value: "sgnods", label: "Pull-ups" }
            ]}
                  value={exercises}
            onChange={setExercises} 
            isMulti={true}
          /> */}
          <Button type="submit" variant="accent">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewExercise;
