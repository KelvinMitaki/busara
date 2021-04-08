import React from "react";
import styles from "../../styles/survey.module.css";

interface Props {
  image: string;
  image_alt: string;
  text: string;
  required: boolean;
}

const SurveyImage: React.FC<Props> = ({ image, text, required, image_alt }) => {
  return (
    <div className={styles.survey_image}>
      <p
        dangerouslySetInnerHTML={{
          __html: `<div>${text}</div> ${required ? `<span>*</span>` : ""}`
        }}
      />
      <img src={image} alt={image_alt} className={styles.img} />
    </div>
  );
};

export default SurveyImage;
