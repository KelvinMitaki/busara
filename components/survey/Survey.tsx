import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { Page, Ans } from "../../interfaces/Data";
import styles from "../../styles/survey.module.css";
import Spinner from "../layout/Spinner";
import MultiSelect from "../reduxForm/MultiSelect";
import SurveyImage from "../reduxForm/SurveyImage";
import SurveyInput from "../reduxForm/SurveyInput";

interface Props {
  pages: Page[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Survey: React.FC<Props> = ({ pages, currentPage, setCurrentPage }) => {
  const [answers, setAnswers] = useState<Ans[]>([]);
  const onFormSubmit = () => {};
  console.log(answers);
  return (
    <React.Fragment>
      <form onSubmit={e => e.preventDefault()}>
        <div style={{ width: "100%" }}>
          <h1>* is required</h1>
          {pages.length ? (
            pages
              .find((p, i) => i === currentPage)
              .sections.map(s => (
                <React.Fragment key={s.id}>
                  <h2>{s.description}</h2>
                  {s.questions.map(q => {
                    if (q.widget === "text" || q.widget === "tel") {
                      return (
                        <SurveyInput
                          label={q.text}
                          key={q.id}
                          type={q.type !== "tel" ? "text" : "number"}
                          required={q.is_mandatory}
                          setAnswers={setAnswers}
                          column_match={q.column_match}
                          q_id={q.id.toString()}
                        />
                      );
                    }
                    if (q.widget === "multiselect" || q.widget === "select") {
                      return (
                        <MultiSelect
                          dropdown_options={q.q_options}
                          select_type={q.widget}
                          text={q.text}
                          key={q.id}
                          required={q.is_mandatory}
                          setAnswers={setAnswers}
                          column_match={q.column_match}
                          q_id={q.id.toString()}
                        />
                      );
                    }
                    if (q.widget === "article-image") {
                      return (
                        <SurveyImage
                          image={q.uploads[0].file_url}
                          text={q.text}
                          key={q.id}
                          required={q.is_mandatory}
                          image_alt={q.uploads[0].file_description}
                        />
                      );
                    }
                    return null;
                  })}
                </React.Fragment>
              ))
          ) : (
            <Spinner context="unauth" embeddedInComponent />
          )}
        </div>
        {pages.length ? (
          <div className={styles.navigation}>
            <div
              onClick={() => setCurrentPage(c => c - 1)}
              className={currentPage === 0 ? styles.hide_btn : ""}
            >
              <BsArrowLeft size={25} />
              <p>prev</p>
            </div>
            <span>
              {currentPage + 1} / {pages.length}
            </span>
            {currentPage + 1 === pages.length ? (
              <div onClick={onFormSubmit}>
                <p>submit</p>
                {/* <IoIosSend size={25} /> */}
                <span
                  className="spinner-border"
                  style={{ color: "var(--secondary-color)" }}
                ></span>
              </div>
            ) : (
              <div onClick={() => setCurrentPage(c => c + 1)}>
                <p>next</p>
                <BsArrowRight size={25} />
              </div>
            )}
          </div>
        ) : null}
      </form>
    </React.Fragment>
  );
};

export default Survey;
