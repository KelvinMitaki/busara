import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  image: string;
  text: string;
  required: boolean;
}

const SurveyImage: React.FC<Props> = ({ image, text, required }) => {
  return (
    <div className={styles.survey_image}>
      <p
        dangerouslySetInnerHTML={{
          __html: `<div>${text}</div> ${required ? `<span>*</span>` : ""}`
        }}
      />
      <div
        style={{
          backgroundImage: `url(
            https://images.unsplash.com/photo-1517783887476-66ca3d04b132?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=438&q=80
        )`
        }}
        className={styles.img}
      ></div>
    </div>
  );
};

export default SurveyImage;
