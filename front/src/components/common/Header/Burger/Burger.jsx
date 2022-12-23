import { useState } from "react";

import { menu } from "./menuBase";

import styles from "./Burger.module.scss";
import hamburgerImage from "../../../../images/header/hamburger.svg";
import hamburgerClose from "../../../../images/header/hamburger-close.svg";

import { Link } from "react-router-dom";

const Burger = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        <img
          src={show ? hamburgerClose : hamburgerImage}
          alt="Burger"
        />
      </button>

      <nav
        className={
          show
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
            <span href="" onClick={() => {}}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Burger;
