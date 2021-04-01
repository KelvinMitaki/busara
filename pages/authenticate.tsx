import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "../styles/authenticate.module.css";

export interface ToggleAuthenticate {
  type: "ToggleAuth";
  payload: "login" | "register";
}

const authenticate = () => {
  return (
    <div className={styles.container}>
      <Register />
      <Login />
    </div>
  );
};

export default authenticate;
