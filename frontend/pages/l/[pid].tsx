import axios from "axios";
import Router from "next/router";
import React, { Component } from "react";
import ProductPage from "../../components/common/ProductPage/ProductPage";
import { getProductUrl } from "../../lib/product";
import Layout from "./../../components/common/Layout/Layout";
const isServer = typeof window !== "object";

interface Props {
  product?: any;
  related?: { products: any[] };
  pid?: any;
  found?: boolean;
  isLoading?: boolean;
}

class Product extends Component {
  static getInitialProps: (context: any) => Promise<Props>;
  render() {
    let { product, pid }: any = this.props;
    if (!isServer && product) {
      const pathUrl = getProductUrl(product);
      if (pathUrl !== "/l/" + pid) {
        Router.replace(pathUrl);
      }
    }
    return (
      <Layout>
        <ProductPage {...this.props} />
      </Layout>
    );
  }
}
Product.getInitialProps = async (context) => {
  try {
    var { pid } = context.query;
    const { product, found, related } = await pullProduct(extractID(pid));
    if (found) {
      const pathUrl = getProductUrl(product);
      if (pathUrl !== "/" + pid) {
        if (context.res) {
          context.res.writeHead(302, { Location: encodeURI(pathUrl) });
          context.res.end();
        } else {
          Router.push(pathUrl);
        }
      }
    }

    return {
      product,
      related,
      pid,
      found,
      isLoading: false,
    };
  } catch (error) {
    console.log("Product: ", error.message);
  }
  return {
    pid,
    product: null,
    found: false,
    isLoading: false,
  };
};

const extractID = (pid: any) => {
  if (!pid) return "";
  const urlSlipt = pid.split(".");
  return urlSlipt[urlSlipt.length - 1];
};

const pullProduct = async (productID: any) => {
  let { data } = await axios.get("/pages/product/" + productID);
  return data;
};
export default Product;
