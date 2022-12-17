import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShop } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useAuth } from "../../../../context/AuthContext";
import { renderPaymentLabel, renderStatusLabel } from "../../../../lib/orders";
import { currencyFormat, getProductUrl } from "../../../../lib/product";
import s from "./OrderDetail.module.css";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, accessToken } = useAuth();
  const [order, setOrder] = React.useState<any>({ item: [] });
  const headerApi = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  React.useEffect(() => {
    pullOrder();
  }, []);

  const pullOrder = async () => {
    let {
      data: { order },
    } = await axios.get("/orders/" + id, headerApi);
    setOrder(order);
  };
  return (
    <div className="order-page">
      {order.id && (
        <div className={s.orderBox}>
          <div className="mb-3 grid grid-cols-12 ">
            <div className="col-span-6">
              <span className={s.gotoBackWrap}>
                <Link href="/user/orders" className={s.gotoBack}>
                  <IoMdArrowBack /> Trở lại
                </Link>
              </span>
            </div>
            <div className="col-span-3">
              <span className={s.orderNumber}>
                Mã đơn hàng: {order.orderNumber}
              </span>
            </div>
            <div className="col-span-3 text-right">
              {order.status && <> {renderStatusLabel(order.status)}</>}
              {order.paymentStatus && (
                <> {renderPaymentLabel(order.paymentStatus)}</>
              )}
            </div>
          </div>

          <div className={s.infoBox}>
            <div className="col-span-6">
              <h2>Địa chỉ nhận hàng</h2>
              <div className={s.fieldRow}>
                <span className={s.label}>Họ và tên</span>
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
                <span className={s.label}>Số Điện Thoại</span>
                <span className={s.value}>{order.address.phoneNumber}</span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.label}>Địa chỉ</span>
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
              <h2>Thanh toán & Giao Hàng</h2>
              <div className={s.fieldRow}>
                <span className={s.label}>Thanh toán</span>
                <span className={s.value}>{order.payment}</span>
              </div>
              <div className={s.fieldRow}>
                <span className={s.label}>Giao hàng bởi</span>
                <span className={s.value}>
                  {order.shipping === "BY_SHOP" ? "chủ shop" : order.shipping}
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
            order.items.map((item: any) => {
              const productURL = getProductUrl({
                name: item.name,
                product_id: item.productID,
              });
              return (
                <div className={s.orderItem}>
                  <div className="col-span-2">
                    <Link href={productURL}>
                      <img className="h-28" src={item.thumb} alt="" />
                    </Link>
                  </div>
                  <div className="col-span-8">
                    <Link href={productURL}>
                      <div>{item.name}</div>
                      <div>{item.quantity}</div>
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
                    <div className="md:col-span-1 w-40">Tổng tiền hàng</div>
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
                <span>Tổng đơn hàng:</span>
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

export default OrderDetail;
