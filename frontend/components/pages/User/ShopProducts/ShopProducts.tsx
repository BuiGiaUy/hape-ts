import { Button, Table } from "antd";
import Column from "antd/lib/table/Column";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { RiAddFill, RiDeleteBin6Line } from "react-icons/ri";
import { getName } from "../../../../config/category";
import { useAuth } from "../../../../context/AuthContext";
import { currencyFormat } from "../../../../lib/product";
import s from "./ShopProducts.module.css";
type Props = {};

const PAGE_SIZE = 30;

const ShopProducts = (props: Props) => {
  const { user, accessToken } = useAuth();
  const [productTotal, setProductToTal] = React.useState(0);
  const [current, setCurrent] = React.useState<number>(1);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);

  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  React.useEffect(() => {
    pullProducts();
  }, []);

  const handleTableChange = (pagination:any, filters:any,sorter: any) => {
    setLoading(true)
    pullProducts(pagination.current)
    setLoading(false)
  }

  const pullProducts = async (currentPage = 1) => {
    let {
      data: { products, count },
    } = await axios.get("/products", {
      params: { current: currentPage, pageSize: PAGE_SIZE },
      ...headerApi,
    });
    products = products.map((product: any) => {
      return {
        key: product.id,
        ...product,
      };
    });
    setProductToTal(count);
    setCurrent(currentPage);
    setProducts(products);
  };
  const deleteProducts = async () => {
    setLoading(true);
    for (const productID of selectedRowKeys) {
      await axios.delete("/products/" + productID, headerApi);
    }
    setSelectedRowKeys([]);
    await pullProducts();
    setLoading(false);
  };
  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="">
      <div className={s.formBox}>
        <div className="">
          <h1 className={s.h1}>Danh Sách sản phẩm</h1>
          <div className="mb-3 grid grid-cols-2">
            <div className="col-span-1">
              <Button
                type="primary"
                onClick={deleteProducts}
                disabled={!hasSelected}
                loading={loading}
              >
                <RiDeleteBin6Line />
              </Button>
              <span className="ml-3 text-sm text-gray-500">
                {hasSelected ? `Chọn ${selectedRowKeys.length} sản phẩm ` : ""}
              </span>
            </div>
            <div className="col-span-1 text-right">
              <Link href="/user/shop-product-form">
                <Button type="primary" className="addButton">
                  <RiAddFill className={s.addButtonSvg} /> Thêm
                </Button>
              </Link>
            </div>
          </div>

          <Table
            dataSource={products}
            rowSelection={rowSelection}
            pagination={{ total: productTotal, current, pageSize: PAGE_SIZE }}
            loading={loading}
            onChange={handleTableChange}
          >
            <Column
              title="Hình ảnh"
              key="id"
              render={(text, record: any) => {
                return (
                  <div>
                    {record.images[0] && (
                      <Link href={"/user/shop-product-form?id=" + record.id}>
                        <img className="max-h-8" src={record.images[0]} />
                      </Link>
                    )}
                  </div>
                );
              }}
            />
            <Column
              title="Tên sản phẩm"
              dataIndex="name"
              render={(text, record: any) => {
                return (
                  <Link href={"/user/shop-product-form?id=" + record.id} className={s.productName}>
                    {text}
                  </Link>
                );
              }}
            />
            <Column
              title="SKU"
              dataIndex="sku"
              render={(text, record: any) => {
                return (
                  <Link href={"/user/shop-product-form?id=" + record.id} className="">
                    <span>{text}</span>
                  </Link>
                );
              }}
            />

            <Column
              title="Giá"
              dataIndex="price"
              render={(text, record: any) => {
                return <span className="">{currencyFormat(text)}</span>;
              }}
            />
            <Column title="Số lượng" dataIndex="quantity" />

            <Column
              title="Danh mục"
              dataIndex="category"
              render={(text, record: any) => {
                return <span className="">{getName(text)}</span>;
              }}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
