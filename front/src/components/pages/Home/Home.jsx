import Layout from "../../common/Layout";
import Button from "../../ui/Button/Button";
import Counters from "../../ui/Counters/Counters";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.scss";

import bgImage from "../../../images/home-bg.jpg";
import { useQuery } from "react-query";
import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const { data, isSuccess } = useQuery(
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
        variant="main"
        callback={() => {
          navigate("/new-workout");
        }}
      >
        New
      </Button>
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      <h2>Hi {data?.email}</h2>
      {isSuccess && isAuth && <Counters data={data} />}
    </Layout>
  );
};

export default Home;
