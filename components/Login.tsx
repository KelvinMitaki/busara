import React from "react";
import styles from "../styles/authenticate.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAuthenticate } from "../pages/authenticate";
import { Redux } from "../interfaces/Redux";
const Login = () => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state: Redux) => state.style);
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={`modal ${styles.login} ${
        authenticate === "login" ? styles.show__login : ""
      }`}
    >
      <div className={styles.main}>
        <p>login</p>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdEmail size={20} />
          </div>
          <span></span>
          <input type="text" placeholder="Email" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <RiLockFill size={20} />
          </div>
          <span></span>
          <input type="text" placeholder="Password" />
        </div>
        <button>continue</button>
      </div>
      <div className={styles.sub}>
        <p>don't have an account?</p>
        <button
          onClick={() =>
            dispatch<ToggleAuthenticate>({
              type: "ToggleAuth",
              payload: "register"
            })
          }
        >
          take me to register
        </button>
      </div>
    </form>
  );
};

export default Login;
