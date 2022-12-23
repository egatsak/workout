import React from "react";

import styles from "./Counters.module.scss";

const Counters = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.count}>
        <div className={styles.heading}>Minutes</div>
        <div className={styles.number}>{data.minutes}</div>
      </div>
      <div className={styles.count}>
        <div className={styles.heading}>Workouts</div>
        <div className={styles.number}>{data.workouts}</div>
      </div>
      <div className={styles.count}>
        <div className={styles.heading}>Kgs</div>
        <div className={styles.number}>{data.kgs}</div>
      </div>
    </div>
  );
};

export default Counters;
