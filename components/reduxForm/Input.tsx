import React from "react";
import { WrappedFieldProps } from "redux-form";
import styles from "../../styles/authenticate.module.css";

interface Props {
  placeholder: string;
  type?: string;
}

const Input: React.FC<WrappedFieldProps & Props> = ({
  input,
  meta,
  placeholder,
  type
}) => {
  return (
    <>
      <input
        type={type || "text"}
        placeholder={placeholder}
        {...input}
        onCopy={e => e.preventDefault()}
        onCut={e => e.preventDefault()}
        onPaste={e => e.preventDefault()}
        {...(input.name === "full_name" && {
          style: { textTransform: "capitalize" }
        })}
      />
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </>
  );
};

export default Input;
