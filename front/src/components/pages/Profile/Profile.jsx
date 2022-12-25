import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useQuery } from "react-query";

import cn from "classnames";
import stylesLayout from "../../common/Layout.module.scss";
import styles from "./Profile.module.scss";
import bgImage from "./../../../images/bg-profile.jpg";
import beforeImage from "./../../../images/img-before.jpg";
import afterImage from "./../../../images/img-after.jpg";

import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";
import Header from "../../common/Header/Header";
import Counters from "../../ui/Counters/Counters";
import userImage from "../../../images/header/user.svg";

const Profile = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  const { data, isSuccess } = useQuery(
    "home page counters",
    () =>
      $api({
        url: "/users/profile",
        auth: true
      }),
    {
      refetchOnWindowFocus: false
      /*       enabled: isAuth */
    }
  );

  if (!isAuth) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return (
    <>
      <div
        className={cn(stylesLayout.wrapper, stylesLayout.otherpage)}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header />
        {isSuccess && (
          <div className={styles["profile"]}>
            <img src={userImage} alt="Profile icon" />
            <h1 className={stylesLayout.heading}>{data.email}</h1>
          </div>
        )}
        {isSuccess && <Counters data={data} />}
      </div>
      <div className={styles.wrapper}>
        <div className={styles["before-after"]}>
          <div>
            <div className={styles.heading}>Before</div>
            <div className={styles["img-wrapper"]}>
              <img src={beforeImage} alt="Before workouts" />
            </div>
          </div>

          <div>
            <div className={styles.heading}>After</div>
            <div className={styles["img-wrapper"]}>
              <img src={afterImage} alt="After workouts" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
