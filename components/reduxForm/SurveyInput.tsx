import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  label: string;
}

const SurveyInput = () => {
  return (
    <div className={styles.input}>
      <label htmlFor="survery_inp">test</label>
      <input type="text" id="survery_inp" />
    </div>
  );
};

export default SurveyInput;
