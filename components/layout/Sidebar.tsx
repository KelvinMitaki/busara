import React from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FcSurvey } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import styles from "../../styles/sidebar.module.css";

interface Props {
  active: "profile" | "survey";
}

const Sidebar: React.FC<Props> = ({ active }) => {
  const logout = () => {
    localStorage.removeItem("token");
    location.replace("/authenticate");
  };
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
      <div onClick={logout}>
        <BiLogOut size={25} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
