import styles from "./Button.module.scss";

const Button = ({
  callback,
  variant = "main",
  type = "button",
  children
}) => {
  return (
    <div className={styles.wrapper}>
      <button
        type={type}
        className={styles.button + " " + styles[variant]}
        onClick={callback}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
