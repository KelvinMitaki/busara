import { AppProps } from "next/app";
import { wrapper } from "../redux";
import "../styles/globals.css";
import Router from "next/router";
import nProgress from "nprogress";

(Router as any).onRouteChangeStart = () => {
  nProgress.start();
};
(Router as any).onRouteChangeComplete = () => nProgress.done();
(Router as any).onRouteChangeError = () => nProgress.done();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
