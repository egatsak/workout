import React from "react";
import Header from "./Header/Header";

import cn from "classnames";
import styles from "./Layout.module.scss";

const Layout = ({ children, bgImage, heading = "" }) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.otherpage]: !!heading
      })}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Layout;
