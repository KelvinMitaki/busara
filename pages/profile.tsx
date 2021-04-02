import React from "react";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import styles from "../styles/profile.module.css";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  groups: number[];
  device_details: { [key: string]: string };
  is_active: boolean;
  language: string;
  user_timezone: string;
  universe: number;
  access_token: string;
  is_subject: boolean;
  permissions: unknown[];
  referral_code: string;
  name: string;
  project: null;
  approver_level: string;
  universe_name: string;
  sujbect: string;
}

const profile = () => {
  return (
    <Layout title="Profile">
      <div className={styles.container}>
        <Sidebar />
        <div>
          <p>profile</p>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
