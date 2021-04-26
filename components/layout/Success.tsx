import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { IoMdSad } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Page } from "../../interfaces/Data";
import { Redux } from "../../interfaces/Redux";
import styles from "../../styles/success.module.css";

export interface SetSurveySubmitted {
  type: "setSurveySubmitted";
  payload: "success" | "error";
}

interface Props {
  pages: Page[] | null;
}

const Success: React.FC<Props> = ({ pages }) => {
  const { surveySubmitted } = useSelector((state: Redux) => state.survey);
  const renderMessage = () => {
    if (surveySubmitted === "success") {
      return (
        <>
          <BsCheckCircle size={90} />
          <p>Survey submitted successfully</p>
        </>
      );
    }
    if (surveySubmitted === "error") {
      return (
        <>
          <IoMdSad size={90} />
          <p>error submitting survey, please reload the page and try again</p>
        </>
      );
    }
    if (pages && !pages.length) {
      return (
        <>
          <TiCancel size={90} />
          <p>No survey data currently available. Please try again later.</p>
        </>
      );
    }
  };
  return (
    <div
      className={`${styles.container} ${
        surveySubmitted || (pages && !pages.length) ? styles.submitted : ""
      }`}
    >
      {renderMessage()}
    </div>
  );
};

export default Success;
