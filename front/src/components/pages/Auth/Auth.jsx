import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import Alert from "../../ui/Alert/Alert";
import Loader from "../../ui/Loader/Loader";

import styles from "./Auth.module.scss";
import bgImage from "./../../../images/bg-auth.jpg";
import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
    data
  } = useMutation(
    "Authorization",
    () =>
      $api({
        url: "/users/login",
        type: "POST",
        auth: false,
        body: { email, password }
      }),
    {
      onSuccess(data) {
        console.log(data);
        successLoginHandler(data.token);
      },
      onError() {
        setPassword("");
      }
    }
  );

  const successLoginHandler = (token) => {
    localStorage.setItem("token", token);

    setIsAuth(true);
    setEmail("");
    setPassword("");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    login();
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Login" />
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {error && <Alert type="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/register" className="dark-link">
            New to Workout App? Sign up here!
          </Link>
          <Button type="submit" variant="accent">
            Sign in
          </Button>
        </form>
      </div>
    </>
  );
};

export default Auth;
