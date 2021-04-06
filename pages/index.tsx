import { GetServerSideProps } from "next";
import { useEffect } from "react";
import axios from "../axiosConfig/axios";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import Spinner from "../components/layout/Spinner";
import { wrapper } from "../redux";
import styles from "../styles/survery.module.css";

const survey = () => {
  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const { data } = await axios.get("/recruitment/forms/?node_type=Both", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log(data);
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
          <Spinner />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(({ store }) => {
  console.log(store.getState());
  return {
    props: {}
  };
});

export default survey;
