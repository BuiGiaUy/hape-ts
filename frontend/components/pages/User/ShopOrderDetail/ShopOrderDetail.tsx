import { message, Select } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShop } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../../../context/AuthContext";
import { PAYMENT_STATUS, t } from "../../../../lib/orders";
import { currencyFormat, getProductUrl } from "../../../../lib/product";
import s from "./ShopOrderDetail.module.css";
type Props = {};

const { Option } = Select;

const ShopOrderDetail = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { user, accessToken } = useAuth();
  const [order, setOrder] = React.useState<any>({ items: [] });
  const [orderStatus, setOrderStatus] = React.useState();
  const [paymentStatus, setPaymentStatus] = React.useState();

  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  React.useEffect(() => {
    pullOrder();
  }, []);

  const pullOrder = async () => {
    let {
      data: { order },
    } = await axios.get("/shop/orders" + id, headerApi);
    setOrder(order);
    setOrderStatus(order.status);
    setPaymentStatus(order.payment);
  };

  const updateOrder = async () => {
    try {
      let {
        data: { statusCode },
      } = await axios.put(
        "/shop/orders" + id,
        { status: orderStatus, paymentStatus },
        headerApi
      );
      message.success("Cập nhật đơn hàng thành công.");
    } catch (error) {}
  };

  return (
    <div className="order-page">
      {order.id && (
        <div className={s.order}>
          <div className="grid grid-cols-12">
            <div className="col-span-7">
              <span className={s.gotoBackWrap}>
                <Link href="/user/shop-orders" className={s.gotoBack}>
                  <IoMdArrowBack /> Trở lại
                </Link>
              </span>
            </div>
            <div className="col-span-3 text-right flex">
              <span className={s.orderNumber}>
                Mã đơn hàng: {order.orderNumber}
              </span>
            </div>
            <div className="col-span-2 text-right">
              <button className={s.button} onClick={updateOrder}>
                Cập nhật
              </button>
            </div>
          </div>

          <div className={s.infoBox}>
            <div className="col-span-5">
              <h2 className="">Địa Chỉ Nhận Hàng</h2>
              <div className={s.fieldRow}>
                <span className={s.value}>
                  <b className="mr-5">{order.address.fullName}</b>
                  <span className="label">
                    {order.address.addressType === "home"
                      ? "Nhà riêng"
                      : "Văn phòng"}
                  </span>
                  {order.address.default && (
                    <span className="label label-green">Mặc định</span>
                  )}
                </span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.value}>{order.address.phoneNumber}</span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.value}>
                  <span className="">
                    {order.address.address}
                    <br />
                    {order.address.regionFull}
                  </span>
                </span>
              </div>
            </div>
            <div className={s.paymentBox}>
              <h2 className="">Thanh toán & Giao hàng</h2>
              <div className={s.fieldRowLarge}>
                <span className={s.label}>Thanh toán</span>
                <span className={s.value}>{order.payment}</span>
              </div>
              <div className={s.fieldRowLarge}>
                <span className={s.label}>Giao hàng bởi</span>
                <span className={s.value}>
                  {order.shipping === "BY_SHOP" ? "Chủ shop" : order.shipping}
                </span>
              </div>
              <div className={s.fieldRowLarge}>
                <span className={s.label}>
                  <div className="mt-2">Tình thái thanh toán</div>
                </span>
                <span className={s.value}>
                  <Select
                    value={paymentStatus}
                    style={{ width: 180 }}
                    onChange={(value) => {
                      setPaymentStatus(value);
                    }}
                  >
                    {PAYMENT_STATUS.map((value) => (
                      <Option value={value}>{t(value)}</Option>
                    ))}
                  </Select>
                </span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.label}>
                  <div className="mt-2">Tình trạng</div>
                </span>
                <span className={s.value}>
                  <Select
                    value={paymentStatus}
                    style={{ width: 180 }}
                    onChange={(value) => {
                      setPaymentStatus(value);
                    }}
                  >
                    {PAYMENT_STATUS.map((value) => (
                      <Option value={value}>{t(value)}</Option>
                    ))}
                  </Select>
                </span>
              </div>
            </div>
          </div>
          <div className="mb-3 grid grid-cols-12">
            <div className="col-span-6">
              <div className={s.shopTitle}>
                {order.shop && (
                  <Link href={"/shop/" + order.shop.shopName}>
                    <AiOutlineShop />
                    {order.shop.shopName}
                  </Link>
                )}
              </div>
            </div>
            <div className="col-span-6"></div>
          </div>
          {order.items &&
            order.items.map((item) => {
              const productURL = getProductUrl({
                name: item.name,
                product_id: item.id,
              });
              return (
                <div className={s.orderItem}>
                  <div className="col-span-2">
                    <Link href={productURL}>
                      <img src={item.thumb} alt="" className="h-28" />
                    </Link>
                  </div>
                  <div className="col-span-8">
                    <Link href={productURL}>
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
              <div className={s.summaryBox}>
                <div className="flex justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="md:col-span-1 w-40">Tổng tiền</div>
                    <div className="md:col-span-1 text-right">
                      {currencyFormat(order.grandTotal)}
                    </div>
                    <div className="md:col-span-1 w-40">Phí vận chuyển</div>
                    <div className="md:col-span-1 text-right">
                      {currencyFormat(order.shippingFee)}
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.grandTotalWrap}>
                <span className="">Tổng đơn hàng:</span>
                <span className={s.grandTotal}>
                  {currencyFormat(order.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOrderDetail;
