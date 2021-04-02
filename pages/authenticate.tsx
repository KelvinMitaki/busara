import React from "react";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "../styles/authenticate.module.css";

export interface ToggleAuthenticate {
  type: "ToggleAuth";
  payload: "login" | "register";
}

const authenticate = () => {
  return (
    <Layout title="Authenticate">
      <div className={styles.container}>
        <Register />
        <Login />
      </div>
    </Layout>
  );
};

export default authenticate;
