import React from "react";
import Register from "../components/Register";
import styles from "../styles/authenticate.module.css";

const authenticate = () => {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
};

export default authenticate;
