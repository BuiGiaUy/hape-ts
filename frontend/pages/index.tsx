import HomeContent from "../components/pages/Home/HomeContent";
import axios from "axios";
import React from "react";
import Layout from "../components/common/Layout/Layout";

class Home extends React.Component {
  static getInitialProps: (context: any) => Promise<{ data: {} }>;
  render() {
    let { data }: any = this.props;
    return (
      <Layout>
        <HomeContent data={data} />
      </Layout>
    );
  }
}
Home.getInitialProps = async (context) => {
  let data = {};
  try {
    let {
      data: { blocks },
    } = await axios.get("/pages/home");
    data = blocks;
  } catch (err) {
    //
  }
  return { data };
};
export default Home;
