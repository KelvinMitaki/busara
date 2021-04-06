import React from "react";
import Router from "next/router";
import styles from "../../styles/spinner.module.css";
import Sidebar from "./Sidebar";

const Spinner = () => {
  return (
    <div className={styles.container}>
      <Sidebar
        active={Router.route.includes("profile") ? "profile" : "survey"}
      />
      <div className={styles.main}>
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
