import React from "react";
import Layout from "../components/common/Layout/Layout";
import { NextSeo } from "next-seo";
import Error from "../components/pages/Error/Error";

type Props = {
  statusCode: number;
};

const Error404: React.FC<Props> = ({ statusCode }) => {
  return (
    <Layout>
      <NextSeo title="Không tìm thấy đường dẫn này!"></NextSeo>
      <Error statusCode={statusCode} title="Không tìm thấy đường dẫn này!" />
    </Layout>
  );
};

export default Error404;
