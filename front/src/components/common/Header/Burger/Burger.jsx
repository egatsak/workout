import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { menu } from "./menuBase";
import { useOutsideAlerter } from "../../../../hooks/useOutsideAlerter";

import styles from "./Burger.module.scss";
import hamburgerImage from "../../../../images/header/hamburger.svg";
import hamburgerClose from "../../../../images/header/hamburger-close.svg";

const Burger = () => {
  const { isAuth, setIsAuth } = useAuth();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideAlerter(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsComponentVisible(false);
    navigate("/");
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        onClick={() => {
          if (isAuth) {
            setIsComponentVisible(!isComponentVisible);
          } else {
            navigate("/auth");
          }
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
          {menu.map((item) => {
            return (
              <li key={`menu_${item.title}`}>
                <Link to={item.link}>{item.title}</Link>
              </li>
            );
          })}
          {isAuth && (
            <li>
              <span onClick={handleLogout}>Logout</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Burger;
