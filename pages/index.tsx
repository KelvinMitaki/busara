import { useEffect, useState } from "react";
import axios from "../axiosConfig/axios";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import withAuth from "../HOCs/withAuth";
import { Page } from "../interfaces/Data";
import styles from "../styles/survey.module.css";
import Survey from "../components/survey/Survey";
import Success from "../components/layout/Success";

const survey = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [surveyId, setSurveyId] = useState<number | null>(null);
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const { data } = await axios.get("/recruitment/forms/?node_type=Both", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setPages(data.forms[0].pages);
        setSurveyId(data.forms[0].id);
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
            <Survey
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              survey_id={surveyId}
            />
          </div>
          <Success />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(survey);
