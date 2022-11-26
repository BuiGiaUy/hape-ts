import React, { Component } from "react";
import { getCategoryUrl } from "../lib/product";
import axios from "axios";
import SearchPage from "../components/pages/SearchPage/SearchPage";
import Layout from './../components/common/Layout/Layout';

interface Props {
  products: any[];
  count: number;
  keyword: string;
  page?: number;
}
class Search extends Component {
  static getInitialProps: (context: any) => Promise<Props>;

  render() {
    let { products, keyword, count, page} : any = this.props;
    return (
        <Layout>
            <SearchPage products={products} keyword={keyword} count={count} page={page}/>
        </Layout>
    );
  }
}
Search.getInitialProps = async (context) => {
  let count = 0;
  let products = [];
  const { keyword, page = 1 }: any = context.query;
  try {
    let { data } = await axios.get("/search", { params: { keyword, page } });
    products = data.products;
    count = data.count;
  } catch (error) {
    console.log("Search:", error);
  }
  return { products, count, keyword, page };
};

export default Search;
