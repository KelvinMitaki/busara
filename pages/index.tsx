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
import SurveyImage from "../components/reduxForm/SurveyImage";

const survey = () => {
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
                      if (q.widget === "article-image") {
                        return (
                          <SurveyImage
                            image={q.uploads[0].file_url}
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
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(survey);
