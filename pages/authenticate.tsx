import React from "react";
import Layout from "../components/layout/Layout";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import styles from "../styles/authenticate.module.css";
import withoutAuth from "../HOCs/withoutAuth";

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

export default withoutAuth(authenticate);
