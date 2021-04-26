import React, { useState } from "react";
import styles from "../../styles/authenticate.module.css";
import { MdEmail } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { ToggleAuthenticate } from "../../pages/authenticate";
import { Redux } from "../../interfaces/Redux";
import { Field, InjectedFormProps, reduxForm, reset } from "redux-form";
import Input from "../reduxForm/Input";
import validator from "validator";
import axios from "../../axiosConfig/axios";
import Router from "next/router";
interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC<InjectedFormProps<FormValues>> = props => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state: Redux) => state.style);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");

  return (
    <div
      className={`custom_modal ${styles.login} ${
        authenticate === "login" ? styles.show__login : ""
      }`}
    >
      <form
        onSubmit={props.handleSubmit(async formValues => {
          try {
            setLoading(true);
            setErr("");
            const res = await axios.post(
              "/oauth/token/",
              qs.stringify({
                ...formValues,
                grant_type: "password"
              }),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                auth: {
                  username: process.env.NEXT_PUBLIC_CLIENT_ID,
                  password: process.env.NEXT_PUBLIC_SECRET
                }
              }
            );
            localStorage.setItem("token", res.data.access_token);

            setLoading(false);
            dispatch(reset("Login"));
            Router.replace("/profile");
          } catch (error) {
            console.log(error.response);
            if (error.response && error.response.data && error.response.data.error) {
              setErr(error.response.data.error);
            }
            setLoading(false);
          }
        })}
      >
        <div className={styles.main}>
          <p>login</p>
          <div className={styles.input}>
            <div className={styles.icon}>
              <MdEmail size={20} />
            </div>
            <span></span>
            <Field component={Input} placeholder="Email" name="username" />
          </div>
          <div className={styles.input}>
            <div className={styles.icon}>
              <RiLockFill size={20} />
            </div>
            <span></span>
            <Field component={Input} placeholder="Password" name="password" type="password" />
          </div>
          <button>
            continue
            {loading && <span className="spinner-border" style={{ marginLeft: "1rem" }} />}
          </button>
          {err && <div className={styles.server_error}>Invalid email or password</div>}
          <div className={styles.sm}>
            <p>don't have an account?</p>
            <div
              onClick={() =>
                dispatch<ToggleAuthenticate>({
                  type: "ToggleAuth",
                  payload: "register"
                })
              }
            >
              register
            </div>
          </div>
        </div>
      </form>
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
    </div>
  );
};
const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (!formValues.username || (formValues.username && !validator.isEmail(formValues.username))) {
    errors.username = "Enter a valid email";
  }
  if (!formValues.password || (formValues.password && formValues.password.trim().length < 6)) {
    errors.password = "Password must be six characters minimum";
  }
  return errors;
};
export default reduxForm({ form: "Login", validate })(Login);
