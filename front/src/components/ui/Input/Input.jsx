import styles from "./Input.module.scss";

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  ...props
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={styles.input}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
