import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "../styles/authenticate.module.css";

const authenticate = () => {
  return (
    <div className={styles.container}>
      <Register />
      <Login />
    </div>
  );
};

export default authenticate;
