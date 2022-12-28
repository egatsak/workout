import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import Layout from "../../common/Layout";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import Loader from "../../ui/Loader/Loader";
import Alert from "../../ui/Alert/Alert";

import { $api } from "../../../api/api";

import styles from "./Register.module.scss";
import bgImage from "./../../../images/bg-auth.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  const {
    mutate: register,
    isLoading,
    error
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
      onSuccess() {
        navigate("/auth");
      },
      onError() {
        setEmail("");
        setConfirmPassword("");
        setPassword("");
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsPasswordsMatch(false);
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
        {!isPasswordsMatch && (
          <Alert type="error">Passwords don't match!</Alert>
        )}

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
            onChange={(e) => {
              setIsPasswordsMatch(true);
              setPassword(e.target.value);
            }}
            required
          />
          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setIsPasswordsMatch(true);
              setConfirmPassword(e.target.value);
            }}
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
