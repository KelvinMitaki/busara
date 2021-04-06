import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import axios from "../axiosConfig/axios";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Spinner from "../components/layout/Spinner";
import withAuth from "../HOCs/withAuth";
import { Survey } from "../interfaces/Data";
import { wrapper } from "../redux";
import styles from "../styles/survey.module.css";

const survey = () => {
  const [html, setHtml] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Survey[]>([]);
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
          <p>Survey</p>
          {html.length
            ? html.map(h => (
                <div dangerouslySetInnerHTML={{ __html: h }} key={h}></div>
              ))
            : null}
          {questions.length ? (
            <img
              src={questions[0].uploads[0].file_url}
              style={{ height: "70%", width: "70%" }}
            />
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(survey);
