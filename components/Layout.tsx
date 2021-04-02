import Head from "next/head";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </main>
  );
};

export default Layout;
