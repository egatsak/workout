import cn from "classnames";
import styles from "./Alert.module.scss";

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
