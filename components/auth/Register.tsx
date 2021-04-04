import React, { useState } from "react";
import styles from "../../styles/authenticate.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhoneAndroid } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAuthenticate } from "../../pages/authenticate";
import { Redux } from "../../interfaces/Redux";
import { Field, InjectedFormProps, reduxForm, reset } from "redux-form";
import Input from "../reduxForm/Input";
import validator from "validator";
import axios from "../../axiosConfig/axios";

interface FormValues {
  full_name: string;
  email: string;
  password1: string;
  password2: string;
  phone_number: string;
  location?: "Dummy";
  username?: string;
  referral_code?: string;
  device_details?: string;
}

const Register: React.FC<InjectedFormProps<FormValues>> = props => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state: Redux) => state.style);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>("");
  return (
    <div
      className={`custom_modal ${styles.register} ${
        authenticate === "register" ? styles.show__register : ""
      }`}
    >
      <form
        onSubmit={props.handleSubmit(async formValues => {
          try {
            const modifiedFormValues = {
              ...formValues,
              phone_number: `+${formValues.phone_number}`,
              username: formValues.email,
              referral_code: "",
              location: "Dummy",
              device_details: JSON.stringify({
                device: "Dummy"
              } as unknown) as string
            } as FormValues;
            setLoading(true);
            setErr("");
            await axios.post("/users/registration/", modifiedFormValues);
            setLoading(false);
            dispatch(reset("Register"));
          } catch (error) {
            if (
              error.response &&
              error.response.data &&
              error.response.data.Error
            ) {
              setErr(error.response.data.Error);
            }
            setLoading(false);
          }
        })}
      >
        <div className={styles.main}>
          <p>register</p>
          <div className={styles.input}>
            <div className={styles.icon}>
              <AiOutlineUser size={20} />
            </div>
            <span></span>
            <Field component={Input} placeholder="Full Name" name="full_name" />
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
            <Field
              component={Input}
              placeholder="Password"
              name="password1"
              type="password"
            />
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
              type="password"
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
          <button>
            create account
            {loading && (
              <span className="spinner-border" style={{ marginLeft: "1rem" }} />
            )}
          </button>
          {err && <div className={styles.server_error}>{err}</div>}
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
      </form>
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
    </div>
  );
};

const validate = (formValues: FormValues) => {
  const errors = {} as FormValues;
  if (
    !formValues.full_name ||
    (formValues.full_name && !formValues.full_name.trim().length)
  ) {
    errors.full_name = "Enter a valid full name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email))
  ) {
    errors.email = "Enter a valid email";
  }
  if (
    !formValues.password1 ||
    (formValues.password1 && formValues.password1.trim().length < 6)
  ) {
    errors.password1 = "Password must be six characters minimum";
  }
  if (formValues.password1 !== formValues.password2) {
    errors.password2 = "Passwords do not match";
  }
  if (
    !formValues.phone_number ||
    (formValues.phone_number &&
      !validator.isNumeric(formValues.phone_number)) ||
    (formValues.phone_number && formValues.phone_number.trim().length !== 12) ||
    (formValues.phone_number &&
      formValues.phone_number.trim().slice(0, 4) !== "2547")
  ) {
    errors.phone_number = "Enter a valid phone number starting with 2547";
  }
  return errors;
};

export default reduxForm({ form: "Register", validate })(Register);
