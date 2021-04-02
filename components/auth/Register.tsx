import React from "react";
import styles from "../../styles/authenticate.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhoneAndroid } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAuthenticate } from "../../pages/authenticate";
import { Redux } from "../../interfaces/Redux";
import { Field, reduxForm } from "redux-form";
import Input from "../reduxForm/Input";

interface FormValues {
  full_name: string;
  email: string;
  password1: string;
  password2: string;
  phone_number: string;
  location?: string;
}

const Register = () => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state: Redux) => state.style);
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className={`modal ${styles.register} ${
        authenticate === "register" ? styles.show__register : ""
      }`}
    >
      <div className={styles.main}>
        <p>register</p>
        <div className={styles.input}>
          <div className={styles.icon}>
            <AiOutlineUser size={20} />
          </div>
          <span></span>
          <Field component={Input} placeholder="Username" name="full_name" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdEmail size={20} />
          </div>
          <span></span>
          <Field component={Input} placeholder="Email" name="email" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <RiLockFill size={20} />
          </div>
          <span></span>
          <Field component={Input} placeholder="Password" name="password1" />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <RiLockFill size={20} />
          </div>
          <span></span>
          <Field
            component={Input}
            placeholder="Confirm Password"
            name="password2"
          />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdPhoneAndroid size={20} />
          </div>
          <span></span>
          <Field
            component={Input}
            placeholder="Phone Number"
            name="phone_number"
          />
        </div>
        <div className={styles.input}>
          <div className={styles.icon}>
            <MdLocationOn size={20} />
          </div>
          <span></span>
          <Field component={Input} placeholder="Location" name="location" />
        </div>
        <button>create account</button>
        <div className={styles.sm}>
          <p>already have an account?</p>
          <div
            onClick={() =>
              dispatch<ToggleAuthenticate>({
                type: "ToggleAuth",
                payload: "login"
              })
            }
          >
            login
          </div>
        </div>
      </div>
      <div className={styles.sub}>
        <p>already have an account?</p>
        <button
          onClick={() =>
            dispatch<ToggleAuthenticate>({
              type: "ToggleAuth",
              payload: "login"
            })
          }
        >
          take me to login
        </button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "Register" })(Register);
