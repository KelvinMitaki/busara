import { AppProps } from "next/app";
import { wrapper } from "../redux";
import "../styles/globals.css";
import Router from "next/router";
import nProgress from "nprogress";
import { Redux } from "../interfaces/Redux";
import { useDispatch, useSelector } from "react-redux";
import { SetToken } from "../components/auth/Login";

(Router as any).onRouteChangeStart = () => {
  nProgress.start();
};
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    if (token) {
      dispatch<SetToken>({ type: "setToken", payload: token });
    }
  }
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
