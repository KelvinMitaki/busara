import React from "react";
import styles from "../styles/authenticate.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhoneAndroid } from "react-icons/md";
import { RiLockFill } from "react-icons/ri";

const Register = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <p>hello</p>
        <div>
          <div>
            <AiOutlineUser />
          </div>
          <input type="text" />
        </div>
        <div>
          <div>
            <MdEmail />
          </div>
          <input type="text" />
        </div>
        <div>
          <div>
            <RiLockFill />
          </div>
          <input type="text" />
        </div>
        <div>
          <div>
            <RiLockFill />
          </div>
          <input type="text" />
        </div>
        <div>
          <div>
            <MdPhoneAndroid />
          </div>
          <input type="text" />
        </div>
        <div>
          <div>
            <MdLocationOn />
          </div>
          <input type="text" />
        </div>
        <button>create account</button>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
          numquam architecto suscipit libero, quod ipsam officiis, perspiciatis,
          aut et voluptatibus iusto sunt dicta commodi nihil excepturi possimus!
          Facilis, explicabo expedita.
        </p>
      </div>
    </form>
  );
};

export default Register;
