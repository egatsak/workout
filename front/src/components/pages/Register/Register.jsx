import { useState } from "react";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./Register.module.scss";
import bgImage from "./../../../images/bg-auth.jpg";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Loader/Loader";
import Alert from "../../ui/Alert/Alert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: register,
    isLoading,
    error,
    data
  } = useMutation(
    "Register",
    () =>
      $api({
        url: "/users",
        type: "POST",
        auth: false,
        body: { email, password }
      }),
    {
      onSuccess(data) {
        console.log(data);
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    register();
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Register" />

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
          <Input
            type="password"
            placeholder="Confirm password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/auth" className="dark-link">
            Already have an account? Sign in here!
          </Link>
          <Button type="submit" variant="accent">
            Sign up
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
