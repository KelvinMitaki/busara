import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/authenticate.module.css";

interface Props {
  placeholder: string;
  type: string;
}

const Input: React.FC<WrappedFieldProps & Props> = ({
  input,
  meta,
  placeholder,
  type
}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} {...input} />
    </>
  );
};

export default Input;
