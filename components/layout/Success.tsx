import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdSad } from "react-icons/io";
import { useSelector } from "react-redux";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/success.module.css";

export interface SetSurveySubmitted {
  type: "setSurveySubmitted";
  payload: "success" | "error";
}

const Success = () => {
  const { surveySubmitted } = useSelector((state: Redux) => state.survey);
  return (
    <div
      className={`${styles.container} ${
        surveySubmitted ? styles.submitted : ""
      }`}
    >
      {surveySubmitted === "success" ? (
        <>
          <BsCheckCircle size={90} />
          <p>Survey submitted successfully</p>
        </>
      ) : (
        <>
          <IoMdSad size={90} />
          <p>error submitting survey, please reload the page and try again</p>
        </>
      )}
    </div>
  );
};

export default Success;
