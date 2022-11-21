import Head from "next/head";
import { NextSeo } from "next-seo";
import Layout from "./../components/common/Layout/Layout";
import Error from "../components/pages/Error/Error";

function ErrorPage({ statusCode }) {
  return (
    <Layout>
      <NextSeo title="Không tìm thấy đường dẫn này!" description="" />
      <Error statusCode={statusCode} title="Không tìm thấy đường dẫn này!" />
    </Layout>
  );
}

export default ErrorPage;
