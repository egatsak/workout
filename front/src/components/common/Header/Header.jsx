import React from "react";
import styles from "./Header.module.scss";

import userImage from "../../../images/header/user.svg";
import arrowImage from "../../../images/header/icon-arrow.svg";

import Burger from "./Burger/Burger.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      {location.pathname === "/" ? (
        <button type="button" onClick={() => navigate("/auth")}>
          <img src={userImage} alt="Auth" />
        </button>
      ) : (
        <button type="button" onClick={() => navigate(-1)}>
          <img src={arrowImage} alt="Back" />
        </button>
      )}

      <Burger />
    </header>
  );
};

export default Header;
