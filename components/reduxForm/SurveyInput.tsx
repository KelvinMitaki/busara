import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  label: string;
  type: "text" | "number";
  required: boolean;
}

const SurveyInput: React.FC<Props> = ({ label, type, required }) => {
  return (
    <div className={styles.input}>
      <label
        htmlFor="survery_inp"
        dangerouslySetInnerHTML={{
          __html: `<div>${label}</div> ${required ? `<span>*</span>` : ""}`
        }}
      />

      <input type={type} id="survery_inp" />
    </div>
  );
};

export default SurveyInput;
