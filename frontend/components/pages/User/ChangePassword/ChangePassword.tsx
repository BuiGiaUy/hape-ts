import { message as Message, Input } from "antd";
import React from "react";
import s from "./ChangePassword.module.css";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

const ChangePassword = () => {
  const { accessToken } = useAuth();
  const headerApi = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [alert, setAlert] = React.useState<string>("");
  const [rePassword, setRePassword] = React.useState<string>("");
  const submitForm = async () => {
    try {
      if (newPassword === "") {
        Message.error("Vui lòng nhập lại mật khẩu");
        return;
      }
      if (alert !== "" || alert === null) {
        Message.error("Mật khẩu phải an toàn hơn");
        return;
      }
      if (newPassword !== rePassword) {
        Message.error("Mật khẩu không khớp.");
        return;
      }
      const {
        data: { statusCode },
      } = await axios.post(
        "/auth/change-password",
        {
          password: newPassword,
        },
        headerApi
      );
      if (statusCode === 200) {
        Message.success("Đổi mật khẩu thành công.");
        setNewPassword("");
        setRePassword("");
      }
    } catch (err) {
      console.log(err.response);
      Message.error(err.response.data.message);
      Message.error("Có sự cố, không đổi được mật khẩu.");
    }
  };
  const onNewPasswordChange = (event: any) => {
    setNewPassword(event.target.value);
    isPasswordValid(event.target.value);
  };
  const isPasswordValid = (password: string) => {
    let valid = false;
    if (password.length > 7 || password.length < 16) {
      valid = true;
    }
    if (password == password.toLowerCase()) {
      valid = true;
    }
    if (valid) {
      setAlert(
        "Mật khẩu phải dài từ 8-16 kí tự , bao gồm 1 chữ viết hoa và 1 chữ viêt thường"
      );
    } else {
      setAlert("");
    }
  };
  return (
    <div className="user-profile">
      <div className={s.formBox}>
        <h1 className={s.h1}>Đổi mật khẩu</h1>
        <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
          <div className={s.labelColumn}>Mật khẩu mới</div>
          <div className="md:col-span-8 self-center">
            <input
              className={s.input}
              type="password"
              value={newPassword}
              onChange={onNewPasswordChange}
              placeholder=""
            />
          </div>
          {alert && <div className={s.alert}>{alert}</div>}
        </div>
      </div>
      <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
        <div className={s.labelColumn}>Mật khẩu mới </div>
        <div className="md:col-span-8 self-center">
          <input
            type="password"
            onChange={onNewPasswordChange}
            value={newPassword}
            placeholder="Mật khẩu mới"
            className={s.input}
          />
        </div>
      </div>
      <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
        <div className={s.labelColumn}>Xác nhập lại </div>
        <div className="md:col-span-8 self-center">
          <input
            type="password"
            onChange={(event) => {
              setRePassword(event.target.value);
            }}
            value={rePassword}
            placeholder="Xác nhập lại "
            className={s.input}
          />
        </div>
      </div>
      <div className="mt-8 md:grid md:grid-cols-12 md:gap-6">
        <div className={s.labelColumn}></div>
        <div className="md:col-span-8 pt-2">
          <button onClick={submitForm} className={s.button}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
