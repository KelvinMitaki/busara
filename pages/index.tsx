import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import styles from "../styles/Home.module.css";

const survey = () => {
  return (
    <Layout title="Survey">
      <div className={styles.container}>
        <Sidebar />
        <div>
          <p>Survey</p>
        </div>
      </div>
    </Layout>
  );
};

export default survey;
