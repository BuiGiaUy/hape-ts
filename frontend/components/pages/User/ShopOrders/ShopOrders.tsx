import { Table } from "antd";
import Column from "antd/lib/table/Column";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { renderStatusLabel } from "../../../../lib/orders";
import { currencyFormat } from "../../../../lib/product";
import s from "./ShopOrders.module.css";

const PAGE_SIZE = 30;

const ShopOrders = () => {
  const { accessToken } = useAuth();
  const [current, setCurrent] = React.useState<number>(1);
  const [ordersTotal, setOrdersTotal] = React.useState(0);
  const [orders, setOrders] = React.useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  React.useEffect(() => {
    pullOrders();
  });
  const pullOrders = async (currentPage = 1) => {
    let {
      data: { orders, count },
    } = await axios.get("/shop/orders/", {
      params: { current: currentPage, pageSize: PAGE_SIZE },
      ...headerApi,
    });
    orders = orders.map((order: any) => {
      return {
        key: order.id,
        ...order,
      };
    });
    setOrdersTotal(count);
    setCurrent(currentPage);
    setOrders(orders);
  };

  const onSelectChange = (selectorRowKeys: any) => {
    setSelectedRowKeys(selectorRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    setLoading(true);
    pullOrders(pagination.current);
    setLoading(false);
  };
  return (
    <div className="order-page">
      <div className={s.orders}>
        <h1 className={s.pageTitle}>Đơn hàng của shop</h1>
        <div>
          <Table
            dataSource={orders}
            rowSelection={rowSelection}
            pagination={{ total: ordersTotal, current, pageSize: PAGE_SIZE }}
            loading={loading}
            onChange={handleTableChange}
          >
            <Column
              title="Hình ảnh"
              key="id"
              render={(text, order: any) => (
                <div>
                  <Link href={"/user/shop-product-form?id=" + order.id}>
                    <img className="max-h-8" src={order.item[0].thumb} />
                  </Link>
                </div>
              )}
            />
            <Column
              title="Tình trạng"
              dataIndex="createAt"
              render={(text, order: any) => (
                <span>{renderStatusLabel(order.status)}</span>
              )}
            />
            <Column
              title="Tên sản phẩm"
              dataIndex="name"
              render={(text, order: any) => (
                <Link
                  href={"/user/shop-order-detail?=id" + order.id}
                  className={s.productName}
                >
                  {order.items[0].name}
                </Link>
              )}
            />

            <Column
              title="Tổng giá"
              dataIndex="price"
              render={(text, order: any) => (
                <span>{currencyFormat(order.grandTotal)}</span>
              )}
            />
            <Column title="Số lượng" dataIndex="quantityTotal" />

            <Column
              title="Ngày đặt"
              dataIndex="createAt"
              render={(text, order: any) => (
                <span>{moment(order.createdAt).format("H:M D-M-Y")}</span>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ShopOrders;
