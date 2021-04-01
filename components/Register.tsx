import React from "react";
import styles from "../styles/authenticate.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhoneAndroid } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";

const Register = () => {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={`modal ${styles.register}`}
    >
      <div className={styles.main}>
        <p>hello</p>
        <div className={styles.input}>
          <div className={styles.icon}>
            <AiOutlineUser size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdEmail size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <RiLockFill size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <RiLockFill size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdPhoneAndroid size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdLocationOn size={20} />
          </div>
          <span></span>
          <input type="text" />
        </div>
        <button>create account</button>
      </div>
      <div className={styles.sub}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
          numquam architecto suscipit libero, quod ipsam officiis, perspiciatis,
          aut et voluptatibus iusto sunt dicta commodi nihil excepturi possimus!
          Facilis, explicabo expedita.
        </p>
      </div>
    </form>
  );
};

export default Register;
