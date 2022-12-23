import React from "react";

import styles from "./Counters.module.scss";

const counters = { minutes: 1, workouts: 2, kgs: 3 };

const Counters = () => {
  return (
    <div className={styles.wrapper}>
      {Object.entries(counters).map((item) => {
        return (
          <div className={styles.count} key={"key" + item[0]}>
            <div className={styles.heading}>{item[0]}</div>
            <div className={styles.number}>{item[1]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Counters;
