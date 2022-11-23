import axios from "axios";
import React, { Component } from "react";
import CategoryPage from "../../components/pages/CategoryPage/CategoryPage";
import Layout from "./../../components/common/Layout/Layout";
const PAGE_SIZE = 30;

interface Props {
  products?: any[];
  pid?: any;
  category?: {};
  count?: number;
  page?: any;
}

export default class Category extends Component {
  static getInitialProps: (context: any) => Promise<Props>;
  render() {
    let { products, pid, category, count }: any = this.props;
    return (
      <Layout>
        <CategoryPage
          pid={pid}
          products={products}
          category={category}
          count={count}
        />
      </Layout>
    );
  }
}
const extractID = (pid) => {
  if (!pid) return "";
  const urlSlipt = pid.split(".");
  return urlSlipt[urlSlipt.length - 1];
};
Category.getInitialProps = async (context) => {
  let count = 0;
  let products = [];
  let category = {};
  const { pid, page = 1 } = context.query;
  const categoryID = extractID(pid);
  try {
    let { data } = await axios.get("/pages/category/" + categoryID, {
      params: { pageSize: PAGE_SIZE, current: page ? page : 1 },
    });
    products = data.products;

    category = data.category;
    count = data.count;
  } catch (err) {
    console.log("Category: ", err.message);
  }
  return { products, pid, category, count, page };
};
