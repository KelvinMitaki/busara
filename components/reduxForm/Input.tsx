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
    <div>
      <input type={type} placeholder={placeholder} {...input} />
    </div>
  );
};

export default Input;
