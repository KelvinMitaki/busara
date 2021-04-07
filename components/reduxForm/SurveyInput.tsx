import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  label: string;
  type: "text" | "number";
}

const SurveyInput: React.FC<Props> = ({ label, type }) => {
  return (
    <div className={styles.input}>
      <label
        htmlFor="survery_inp"
        dangerouslySetInnerHTML={{ __html: label }}
      ></label>
      <input type={type} id="survery_inp" />
    </div>
  );
};

export default SurveyInput;
