import { useState } from "react";
import Select from "react-select";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./NewWorkout.module.scss";
import bgImage from "./../../../images/bg-workout.jpg";
import { Link } from "react-router-dom";

const NewWorkout = () => {
  const [name, setName] = useState("");
  const [exercises, setExercises] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new workout" />

      <div className={styles.wrapper}>
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
          <Select
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
          />
          <Button type="submit" variant="accent">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
