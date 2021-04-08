import React, { useEffect, useState } from "react";
import Router from "next/router";
import { User } from "../pages/profile";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig/axios";
import Spinner from "../components/layout/Spinner";

export interface SetCurrentUser {
  type: "setCurrentUser";
  payload: User;
}

const withAuth = (WrappedComponent: React.FC) => {
  const Component = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    useEffect(() => {
      const userAuthenticate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          Router.replace("/authenticate");
          return;
        }
        try {
          setLoading(true);
          const { data } = await axios.get("/users/current-user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          dispatch<SetCurrentUser>({ type: "setCurrentUser", payload: data });
          setLoading(false);
        } catch (error) {
          Router.replace("/authenticate");
        }
      };
      userAuthenticate();
    }, []);
    if (loading) return <Spinner context="auth" />;
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withAuth;
