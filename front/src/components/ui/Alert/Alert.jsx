import React from "react";

import styles from "./Alert.module.scss";

import cn from "classnames";

const Alert = ({ type = "success", children }) => {
  return (
    <div
      className={cn(styles.alert, {
        [styles.error]: type === "error",
        [styles.success]: type === "success",
        [styles.warning]: type === "warning"
      })}
    >
      {children}
    </div>
  );
};

export default Alert;
