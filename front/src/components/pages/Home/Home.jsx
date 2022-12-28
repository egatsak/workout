import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import Layout from "../../common/Layout";
import Button from "../../ui/Button/Button";
import Counters from "../../ui/Counters/Counters";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

import styles from "./Home.module.scss";
import bgImage from "../../../images/bg-home.jpg";
import Loader from "../../ui/Loader/Loader";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const { data, isSuccess, isLoading } = useQuery(
    "home page counters",
    () =>
      $api({
        url: "/users/profile",
        auth: true
      }),
    {
      refetchOnWindowFocus: false,
      enabled: isAuth
    }
  );

  return (
    <Layout height="100%" bgImage={bgImage}>
      <Button
        variant={isAuth ? "accent" : "main"}
        callback={() => {
          navigate(isAuth ? "/new-workout" : "/auth");
        }}
      >
        {isAuth ? "New workout" : "Authorize"}
      </Button>
      <div className={styles.anchor}></div>
      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      )}

      {!isLoading && (
        <h2>Hi {isAuth ? data?.email + "!" : "Anonymous!"}</h2>
      )}
      {isAuth && (
        <h1 className={styles.heading}>
          Welcome to{" "}
          <span style={{ whiteSpace: "nowrap" }}>Workout App!</span>
        </h1>
      )}
      {isSuccess && isAuth && <Counters data={data} />}
    </Layout>
  );
};

export default Home;
