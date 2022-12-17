import axios from "axios";
import Link from "next/link";
import React from "react";
import { AiOutlineShop } from "react-icons/ai";
import { useAuth } from "../../../../context/AuthContext";
import { renderPaymentLabel, renderStatusLabel } from "../../../../lib/orders";
import { currencyFormat } from "../../../../lib/product";
import s from "./Orders.module.css";

const PAGE_SIZE = 30;

const Orders: React.FC = () => {
  const { user, accessToken } = useAuth();
  const [current, setCurrent] = React.useState<number>(1);
  const [ordersTotal, setOrdersTotal] = React.useState<number>(0);
  const [orders, setOrders] = React.useState([]);
  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  React.useEffect(() => {
    pullOrders();
  }, []);
  const pullOrders = async (currentPage = 1) => {
    let {
      data: { orders, count },
    } = await axios.get("/orders", {
      params: { current: currentPage, pageSize: PAGE_SIZE },
      ...headerApi,
    });
    orders = orders.map((order: any) => {
      return {
        key: order.id,
        ...order,
      }
    })
    setOrdersTotal(count)
    setCurrent(currentPage)
    setOrders(orders)
  };
  return (
    <div className="order-page">
      <div className={s.formBox}>
        <div>
          {orders.map((order: any) => {
            return (
              <div className={s.orderBox}>
                <div className="mb-3 grid grid-cols-12 ">
                  <div className="col-span-6">
                    <div className={s.shopTitle}>
                      {order.shop && (
                        <Link href={"/shop/" + order.shop.shop}>
                          <AiOutlineShop />
                          {order.shop.shopName}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <span className={s.orderNumber}>
                      Mã đơn hàng: {order.orderNumber}
                    </span>
                  </div>
                  <div className="col-span-3">
                    {order.status && <> {renderStatusLabel(order.status)}</>}
                    {order.paymentStatus && (
                      <>{renderPaymentLabel(order.paymentStatus)}</>
                    )}
                  </div>
                </div>
                {order.items &&
                  order.items.map((item: any) => {
                    return (
                      <div className={s.orderItem}>
                        <div className="col-span-2">
                          <Link href={"/user/order-detail?id=" + order.id}>
                            <img src={item.thumb} alt="" className="h-28" />
                          </Link>
                        </div>
                        <div className="col-span-8">
                          <Link href={"/user/order-detail?id=" + order.id}>
                            <div className="">{item.name}</div>
                            <div className="">{item.quantity}</div>
                          </Link>
                        </div>
                        <div className="col-span-2 text-right">
                          {currencyFormat(item.price)}
                        </div>
                      </div>
                    );
                  })}
                <div className={s.orderFooter}>
                  <div className="col-span-6"></div>
                  <div className="col-span-6">
                    <div className={s.grandTotalWrap}>
                      <span className="">Tổng đơn hàng:</span>
                      <span className={s.grandTotal}>
                        {currencyFormat(order.grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
