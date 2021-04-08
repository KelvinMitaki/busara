import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import axios from "../../axiosConfig/axios";
import qs from "qs";
import { Page, Ans, Submit } from "../../interfaces/Data";
import styles from "../../styles/survey.module.css";
import Spinner from "../layout/Spinner";
import MultiSelect from "../reduxForm/MultiSelect";
import SurveyImage from "../reduxForm/SurveyImage";
import SurveyInput from "../reduxForm/SurveyInput";

interface Props {
  pages: Page[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  survey_id: number;
}
let START_TIME: string;
const Survey: React.FC<Props> = ({
  pages,
  currentPage,
  setCurrentPage,
  survey_id
}) => {
  useEffect(() => {
    START_TIME = format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS xxxx");
  }, []);
  const [answers, setAnswers] = useState<Ans[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const onFormSubmit = async () => {
    const emptyAnswers = answers.some(a => !a.q_ans.trim().length);
    const questions = pages.map(p => p.sections.map(s => s.questions)).flat(2);
    const unAnsweredQuestions = questions.filter(q => {
      if (q.is_mandatory) {
        return !answers.some(a => parseInt(a.q_id) === q.id);
      }
      return false;
    });
    if (!unAnsweredQuestions.length && !emptyAnswers) {
      try {
        setLoading(true);
        console.log(
          JSON.stringify([
            {
              ans: answers,
              local_id: 0,
              location: { accuracy: 0, lat: 0, lon: 0 },
              survey_id,
              start_time: START_TIME,
              end_time: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS xxxx")
            }
          ])
        );
        const { data } = await axios.post(
          "/recruitment/answers/submit/",
          {
            data: qs.stringify([
              {
                ans: answers,
                local_id: 0,
                location: { accuracy: 0, lat: 0, lon: 0 },
                survey_id,
                start_time: START_TIME,
                end_time: format(new Date(), "yyyy-MM-dd HH:mm:ss.SSS xxxx")
              } as Submit
            ])
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        console.log(error.response.data);
      }
    }
  };
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
                          answers={answers}
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
                {!loading ? (
                  <IoIosSend size={25} />
                ) : (
                  <span
                    className="spinner-border"
                    style={{ color: "var(--secondary-color)" }}
                  />
                )}
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
