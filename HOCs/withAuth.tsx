import React, { useEffect } from "react";
import Router from "next/router";
import { User } from "../pages/profile";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig/axios";

export interface SetCurrentUser {
  type: "setCurrentUser";
  payload: User;
}

const withAuth = (WrappedComponent: React.FC) => {
  const Component = async (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const userAuthenticate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.replace("/authenticate");
          return;
        }
        try {
          const { data } = await axios.get("/users/current-user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          dispatch<SetCurrentUser>({ type: "setCurrentUser", payload: data });
        } catch (error) {
          Router.replace("/authenticate");
        }
      };
      userAuthenticate();
    }, []);
    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
