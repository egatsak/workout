import { useState } from "react";

import { menu } from "./menuBase";

import styles from "./Burger.module.scss";
import hamburgerImage from "../../../../images/header/hamburger.svg";
import hamburgerClose from "../../../../images/header/hamburger-close.svg";

import { Link } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { useOutsideAlerter } from "../../../../hooks/useOutsideAlerter";

const Burger = () => {
  const [show, setShow] = useState(false);
  const { setIsAuth } = useAuth();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    ///////////////////////////////!!!!!!!!!!!!!!!!!!!!!
    setIsAuth(false);
    setIsComponentVisible(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        onClick={() => {
          setIsComponentVisible(!isComponentVisible);
        }}
      >
        <img
          src={isComponentVisible ? hamburgerClose : hamburgerImage}
          alt="Menu"
        />
      </button>

      <nav
        className={
          isComponentVisible
            ? `${styles.menu} ${styles["menu--active"]}`
            : `${styles.menu}`
        }
      >
        <ul>
          {menu.map((item, i) => {
            return (
              <li key={`menu_${i}`}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
          <li>
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Burger;
