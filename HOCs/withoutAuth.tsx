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

const withoutAuth = (WrappedComponent: React.FC) => {
  const Component = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
      const userAuthenticate = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }
        try {
          setLoading(true);
          const { data } = await axios.get("/users/current-user", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          setLoading(false);
          setUser(data);
          dispatch<SetCurrentUser>({ type: "setCurrentUser", payload: data });
          Router.replace("/");
        } catch (error) {
          return;
        }
      };
      userAuthenticate();
    }, []);
    if (loading || user) return <Spinner context="unauth" />;
    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withoutAuth;
