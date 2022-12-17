import axios from "axios";
import React, { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import s from "./Profile.module.css";
import { message as Message, Button } from "antd";
import getSlug, {
  hideEmail,
  hideText,
  phoneFormat,
} from "../../../../lib/get-slug";
type Props = {};

const Profile: React.FC = () => {
  const { accessToken } = useAuth();
  const [name, setName] = React.useState<string>("");
  const [username, setUsername] = React.useState<string>("");
  const [shopName, setShopName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [changeEmail, setChangeEmail] = React.useState(false);
  const [changePhone, setChangePhone] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const submitForm = async () => {
    try {
      const {
        data: { statusCode, user, message, shop },
      } = await axios.put(
        "/users/profile",
        { username, name, shopName, phone, email },
        headerApi
      );
      if (statusCode !== 200) {
        Message.error(message);
      } else {
        if (user) {
          setName(user.name);
          setUsername(user.username);
          setPhone(user.phone);
          setEmail(user.email);
        }
        if (shop) {
          setShopName(user.shopName);
        }
        setChangeEmail(false);
        setChangePhone(false);
        Message.success("Cập nhật thành công.");
      }
    } catch (error) {
      console.log(error.response);
      Message.error(error.response.data.message);
    }
  };
  const usernameHandleChange = (event: any) => {
    setShopName(getSlug(event.target.value));
  };

  const shopNameHandleChange = (event: any) => {
    setShopName(getSlug(event.target.value));
  };
  useEffect(() => {
    async () => {
      setReady(false);
      try {
        let {
          data: { user, shop },
        } = await axios.get("/users/profile", headerApi);
        if (user) {
          setName(user.name);
          setUsername(user.username);
          setPhone(user.phone);
          setEmail(user.email);
        }
        if (shop) {
          setShopName(shop.shopName);
        }
      } catch (err) {
        console.log(err);
      }
    };
  }, []);
  return (
    <div className="user-profile">
      <div className={s.formBox}>
        <h1 className={s.h1}>Hồ Sơ của Tôi</h1>
        <p className="text-gray-600 mb-5">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
        <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
          <div className={s.labelColumn}>Họ Tên</div>
          <div className="md:col-span-8">
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              placeholder="Họ tên của bạn"
              className={s.input}
            />
            <span className="text-gray-500 text-xs">
              (không có kí tự đặt biệt)
            </span>
          </div>
        </div>
        <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
          <div className={s.labelColumn}>Tên đăng nhập</div>
          <div className="md:col-span-8 self-center">
            <input
              value={shopName}
              onChange={shopNameHandleChange}
              placeholder="Tên shop của bạn"
              className={s.input}
            />
            <span className="text-gray-500 text-xs">
              (Không ký tự đặt biệt)
            </span>
          </div>
        </div>
        <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
          <div className={s.labelColumn}>Số điện thoại</div>
          <div className="md:col-span-8">
            {!changePhone && (
              <div className="mt-2">
                <span className="mr-2">
                  {phone !== null && hideText(phone)}
                </span>
                <button
                  className={s.btnLink}
                  onClick={(e) => setChangePhone(true)}
                >
                  {phone === null ? "Thêm" : "Thay đổi"}
                </button>
              </div>
            )}
            {changePhone === true && (
              <input
                value={phone}
                onChange={(e) => setPhone(phoneFormat(e.target.value))}
                placeholder="Số điện thoại mới "
                className={s.input}
              />
            )}
          </div>
        </div>
        <div className="mt-8 md:grid-cols-12 md:grid md:gap-6">
          <div className={s.labelColumn}>Địa chỉ email</div>
          <div className="md:col-span-8">
            {!changeEmail && (
              <div className="mt-2">
                <span className="mr-2">{hideEmail(email)}</span>
                <button
                  className={s.btnLink}
                  onClick={(e) => setChangeEmail(true)}
                >
                  Thây đổi
                </button>
              </div>
            )}

            {changeEmail === true && (
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="địa chỉ email mới"
                className={s.input}
              />
            )}
          </div>
        </div>
        <div className="mr-8 md:grid md:grid-cols-12 md:gap-6">
          <div className={s.labelColumn}></div>
          <div className="md:col-span-6 pt-2">
            <button className={s.button} onClick={submitForm}>
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
