import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import axios from "../axiosConfig/axios";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Spinner from "../components/layout/Spinner";
import withAuth from "../HOCs/withAuth";
import { Page, Survey } from "../interfaces/Data";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import styles from "../styles/survey.module.css";
import SurveyInput from "../components/reduxForm/SurveyInput";
import MultiSelect from "../components/reduxForm/MultiSelect";

const survey = () => {
  const [html, setHtml] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Survey[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const { data } = await axios.get("/recruitment/forms/?node_type=Both", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setHtml(
          (data.forms[0].pages[1].sections[0].questions as Survey[]).map(
            q => q.text
          )
        );
        setQuestions(data.forms[0].pages[1].sections[0].questions);
        setPages(data.forms[0].pages);
        console.log(data.forms[0].pages[1]);
      } catch (error) {
        console.log(error.response);
      }
    };
    getCurrUser();
  }, []);
  return (
    <Layout title="Survey">
      <div className={styles.container}>
        <Sidebar active="survey" />
        <div className={styles.main}>
          <div className={styles.form_prt}>
            <form onSubmit={e => e.preventDefault()}>
              {pages.length &&
                pages
                  .find((p, i) => i === currentPage)
                  .sections.map(s =>
                    s.questions.map(q => {
                      if (q.widget === "text" || q.widget === "tel") {
                        return (
                          <SurveyInput
                            label={q.text}
                            key={q.id}
                            type={q.type !== "tel" ? "text" : "number"}
                          />
                        );
                      }
                      if (q.widget === "multiselect" || q.widget === "select") {
                        return (
                          <MultiSelect
                            dropdown_options={q.q_options}
                            select_type={q.widget}
                            text={q.text}
                          />
                        );
                      }
                      return null;
                    })
                  )}
            </form>

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
              <div
                onClick={() => setCurrentPage(c => c + 1)}
                className={
                  currentPage === pages.length - 1 ? styles.hide_btn : ""
                }
              >
                <p>next</p>
                <BsArrowRight size={25} />
              </div>
            </div>
          </div>
          {/* {html.length
            ? html.map(h => (
                <div dangerouslySetInnerHTML={{ __html: h }} key={h}></div>
              ))
            : null}
          {questions.length ? (
            <img
              src={questions[0].uploads[0].file_url}
              style={{ height: "70%", width: "70%" }}
            />
          ) : null} */}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(survey);
