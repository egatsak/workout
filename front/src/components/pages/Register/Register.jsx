import { useState } from "react";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

import styles from "./Register.module.scss";
import bgImage from "./../../../images/bg-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { $api } from "../../../api/api";
import Loader from "../../ui/Loader/Loader";
import Alert from "../../ui/Alert/Alert";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

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
        navigate("/auth");
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      //error = "Passwords don't match!";
      console.log("Passwords don't match!");
      setConfirmPassword("");
      setPassword("");
      return;
    }
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
