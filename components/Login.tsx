import React from "react";
import styles from "../styles/authenticate.module.css";

const Login = () => {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={`modal ${styles.login}`}
    ></form>
  );
};

export default Login;
