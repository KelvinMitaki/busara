import React from "react";
import Router from "next/router";
import styles from "../../styles/spinner.module.css";
import Sidebar from "./Sidebar";

interface Props {
  context: "auth" | "unauth";
  embeddedInComponent?: boolean;
}

const Spinner: React.FC<Props> = ({ context, embeddedInComponent }) => {
  return (
    <div className={`${styles.container} ${embeddedInComponent ? styles.auth__container : ""}`}>
      <div className={styles.sidebar}>
        {context === "auth" && (
          <Sidebar
            active={
              typeof window !== "undefined" && Router.route.includes("profile")
                ? "profile"
                : "survey"
            }
          />
        )}
      </div>
      <div className={styles.main} style={{ ...(context === "unauth" && { width: "100%" }) }}>
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
