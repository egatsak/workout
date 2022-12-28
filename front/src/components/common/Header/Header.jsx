import { useLocation, useNavigate } from "react-router-dom";

import Burger from "./Burger/Burger.jsx";

import { useAuth } from "../../../hooks/useAuth";

import styles from "./Header.module.scss";
import userImage from "../../../images/header/user.svg";
import arrowImage from "../../../images/header/icon-arrow.svg";
import authImage from "../../../images/header/dumbbell.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  return (
    <header className={styles.header}>
      {location.pathname === "/" ? (
        <button
          type="button"
          onClick={() => navigate(isAuth ? "/profile" : "/auth")}
        >
          <img
            src={isAuth ? authImage : userImage}
            alt="Auth"
            height={`${isAuth ? "30px" : "inherit"}`}
          />
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
