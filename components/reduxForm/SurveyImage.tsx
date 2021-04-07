import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  image: string;
  text: string;
}

const SurveyImage: React.FC<Props> = ({ image, text }) => {
  return (
    <div className={styles.survey_image}>
      <p dangerouslySetInnerHTML={{ __html: text }}></p>
      <div
        style={{
          backgroundImage: `url(
            https://images.unsplash.com/photo-1517783887476-66ca3d04b132?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=438&q=80
        )`
        }}
      ></div>
    </div>
  );
};

export default SurveyImage;
