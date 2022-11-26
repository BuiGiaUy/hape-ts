import axios from "axios";
import React, { Component } from "react";
import Layout from "../../components/common/Layout/Layout";
import About from "../../components/pages/About/About";
import StaticPage from "../../components/pages/StaticPage/StaticPage";

class Page extends Component {
  static getInitialProps: (context: any) => Promise<{ page: {}; slug: any; }>;
  render() {
    let { page, slug }: any = this.props
    return <Layout>
        {slug === 'about-us' ? <About /> : <StaticPage page={page}/>}
    </Layout>;
  }
}

Page.getInitialProps = async (context) => {
  let page = {};
  const { pid } = context.query;
  try {
    let { data } = await axios.get("/pages/" + pid);
    page = data.page
  } catch (err) {
    console.log("Page: ", err);
  }
  return { page, slug: pid };
};

export default Page;
