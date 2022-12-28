import imgLoader from "../../../images/three-dots.svg";

const Loader = () => {
  return (
    <img
      style={{ textAlign: "center" }}
      src={imgLoader}
      alt="Loading..."
    />
  );
};

export default Loader;
