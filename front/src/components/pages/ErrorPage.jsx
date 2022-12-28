import React from "react";
import Layout from "../common/Layout";

import styles from "./Auth/Auth.module.scss";
import bgImage from "../../images/bg-exercise.jpg";

const ErrorPage = () => {
  return (
    <>
      <Layout bgImage={bgImage} heading="Page not found" />
      <div className={styles.wrapper}>
        <h2>Please make sure that you've entered the correct URL!</h2>
      </div>
    </>
  );
};

export default ErrorPage;
