import React from "react";
import {
  AiFillCompass,
  AiFillTrademarkCircle,
  AiOutlineNumber
} from "react-icons/ai";
import { IoLanguage } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdPhoneAndroid, MdSubject } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import Layout from "../components/layout/Layout";
import Sidebar from "../components/layout/Sidebar";
import styles from "../styles/profile.module.css";
import withAuth from "../HOCs/withAuth";

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
        <Sidebar active="profile" />
        <div className={styles.content}>
          <div className={styles.property}>
            <label>id</label>
            <div>
              <input readOnly type="text" value="2169712987632869812708" />
              <AiOutlineNumber size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>full name</label>
            <div>
              <input readOnly type="text" value="Kelvin Mitaki" />
              <FaUserAlt size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>email</label>
            <div>
              <input readOnly type="text" value="mitakikelvin1@gmail.com" />
              <MdEmail size={25} />
            </div>
          </div>

          <div className={styles.property}>
            <label>phone number</label>
            <div>
              <input readOnly type="text" value="+254721559392" />
              <MdPhoneAndroid size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>language</label>
            <div>
              <input readOnly type="text" value="English" />
              <IoLanguage size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>timezone</label>
            <div>
              <input readOnly type="text" value="Africa/Nairobi" />
              <AiFillCompass size={25} />
            </div>
          </div>

          <div className={styles.property}>
            <label>approver level</label>
            <div>
              <input readOnly type="text" value="Initiator" />
              <AiFillTrademarkCircle size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>subject</label>
            <div>
              <input readOnly type="text" value="9279871298863879127" />
              <MdSubject size={25} />
            </div>
          </div>
          <div className={styles.property}>
            <label>universe</label>
            <div>
              <input readOnly type="text" value="1" />
              <GiWorld size={25} />
            </div>
          </div>
          <div className={styles.bottom}></div>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(profile);
