import React from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FcSurvey } from "react-icons/fc";
import styles from "../../styles/sidebar.module.css";

interface Props {
  active: "profile" | "survey";
}

const Sidebar: React.FC<Props> = ({ active }) => {
  return (
    <div className={styles.container}>
      <Link href="/profile">
        <div className={active == "profile" ? styles.active : ""}>
          <CgProfile size={25} />
          <p>
            <a>Profile</a>
          </p>
        </div>
      </Link>
      <Link href="/">
        <div className={active == "survey" ? styles.active : ""}>
          <FcSurvey size={25} />
          <p>
            <a>Survey</a>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
