import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/common/Layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { NextSeo } from "next-seo";
import UserSidebar from "../../components/common/UserSidebar/UserSidebar";
import Orders from "../../components/pages/User/Orders/Orders";
import OrderDetail from "../../components/pages/User/OrderDetail/OrderDetail";
import AddressBook from "../../components/pages/User/AddressBook/AddressBook";
import ShopProducts from "../../components/pages/User/ShopProducts/ShopProducts";
import ShopOrderDetail from "../../components/pages/User/ShopOrderDetail/ShopOrderDetail";
import ShopOrders from "../../components/pages/User/ShopOrders/ShopOrders";
import ShopSettings from "../../components/pages/User/ShopSettings/ShopSettings";
import Profile from "../../components/pages/User/Profile/Profile";
import ChangePassword from "../../components/pages/User/ChangePassword/ChangePassword";
import ShopProductForm from "../../components/pages/User/ShopProductForm/ShopProductForm";


const Page = () => {
  const router = useRouter();
  const { accessToken, updateAction } = useAuth();
  const { pid } = router.query;
  React.useEffect(() => {
    openLogin();
  }, [pid]);
  const openLogin = () => {
    if (accessToken === undefined || accessToken === "") {
      updateAction({ event: "LOGIN_OPEN", payload: {} });
    }
  };
  return (
    <Layout>
      <NextSeo title="Quản lý tài khoản" description="" />
      {accessToken !== "" && (
        <div className="mt-28">
          <div className="mx-auto max-w-7xl">
            <div className="md:grid md:grid-cols-12 ">
              <div className="mt-5 md:col-span-2">
                <UserSidebar pid={pid} />
              </div>
              <div className="mt-5 md:col-span-10 ml-10">
                {pid === "orders" && <Orders />}
                {pid === "order-detail" && <OrderDetail />}

                {pid === "address-book" && <AddressBook />}

                {pid === "shop-products" && <ShopProducts />}

                {pid === "shop-product-form" && <ShopProductForm />}

                {pid === "shop-order-detail" && <ShopOrderDetail />}
                {pid === "shop-orders" && <ShopOrders />}
                {pid === "shop-settings" && <ShopSettings />}

                {pid === "profile" && <Profile />}
                {pid === "change-password" && <ChangePassword />}
              </div>
            </div>
          </div>
        </div>
      )}
      {accessToken === "" && (
        <main className="mt-16 mb-60 sm:mt-60">
          <div className="mx-auto max-w-7xl text-center">
            <img
              src="/assets/empty-box.png"
              width="90px"
              className="my-10 mx-auto"
            />
            <h1 className="text-xl text-gray-700">
              Vui lòng đăng nhập hoặc đăng ký thành viên để try cập trang này.
            </h1>
            <div>
              <a
                className="button arrow mt-10 font-semibold"
                onClick={openLogin}
              >
                Dăng Nhập
              </a>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Page;
