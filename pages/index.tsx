import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import axios from "../axiosConfig/axios";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Spinner from "../components/layout/Spinner";
import withAuth from "../HOCs/withAuth";
import { wrapper } from "../redux";
import styles from "../styles/survey.module.css";

export interface Survey {
  airtime_compensation: number;
  cash_compensation: number;
  column_match: string;
  created: string;
  default: string;
  description: string;
  detail: string;
  error_message: string;
  estimated_time: number;
  extras: { [key: string]: string };
  field_length: number;
  has_skip: boolean;
  id: number;
  is_active: boolean;
  is_enabled: boolean;
  is_mandatory: boolean;
  is_unique: boolean;
  is_unique_with: unknown[];
  is_visible: boolean;
  modified: string;
  q_options: { id: number; name: string; sort_order: number }[];
  sort_order: number;
  text: string;
  type: string;
  uploads: {
    file_description: string;
    file_name: string;
    file_url: string;
    id: number;
  }[];
  validation_rule: string;
  widget: string;
}

const survey = () => {
  const [html, setHtml] = useState<string[]>([]);
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const { data } = await axios.get("/recruitment/forms/?node_type=Both", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setHtml(data.forms[0].pages[1].sections[0].questions.map(q => q.text));
        console.log(data.forms[0].pages[1].sections[0].questions);
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
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(survey);
