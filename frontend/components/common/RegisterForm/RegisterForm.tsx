import { Modal } from "antd";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import s from "./RegisterForm.module.css";
import cn from "classnames";

const RegisterForm = () => {
  const {
    login,
    action: { event },
    updateAction,
  } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [step1, setStep1] = React.useState(false);
  const [emailExisting, setEmailExisting] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [alert, setAlert] = React.useState<any>(null);
  const [phoneAlert, setPhoneAlert] = React.useState<any>(null);
  const [password, setPassword] = React.useState<string>("");
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (event === "LOGIN_OPEN") {
      setVisible(true);
      updateAction({ event: "", payload: {} });
    }
  }, [event]);

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 400);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.target.value)
    isPasswordValid(event.target.value)
  };
  const isPasswordValid = (password: string) => {
    let valid = false
    if (password.length < 7 || password.length > 16) {
      valid = true
    }
    if (valid) {
      setAlert("Mật khẩu phải dài từ 8-16kis tự, bao gồm 1 chữ viết hoa một chữ viết thường ")
    } else {
      setAlert("")
    }
  };
  const onPhoneChange = (event: any) => {};
  const handleCancel = () => {
    setVisible(false);
  };
  const onFinish = () => {};
  const submitRegistration = async () => {
    // let disabled the submit button
  };
  const submitLogin = async (password: string) => {};
  const submitForm = () => {};
  function validateEmail(email: string) {}
  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const exitingEmail = async (email: string) => {};
  const completedStep1 = async () => {};
  const responseGoogleOnFailure = (response: any) => {};
  const handleGoogleSuccess = async (response: any) => {};
  const responseFacebook = async (response: any) => {};
  const componentFBClicked = (response: any) => {};

  return (
    <>
      <button onClick={showModal} className={s.signUpButton}>
        Đăng nhập
      </button>
      <Modal
        title="Đăng nhập & đăng ký "
        className="auth-from-modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={cn(s.step1, { hidden: step1 })}>
          <p className="text-gray-700">
            Đăng nhập hoặc đăng ký với email của bạn.
          </p>
          <div className="relative w-full my-6">
            <label className={s.label}>Địa chỉ email</label>
            <input
              placeholder="Địa chỉ email"
              onChange={handleEmailChange}
              type="email"
              name="email"
              className={s.input}
            />
            <div className="pt-2 text-sm text-red">{emailMessage}</div>
          </div>
          <button className={s.button} onClick={completedStep1} type="submit">
            TIẾP TỤC
          </button>
        </div>
        <div className={cn(s.step2, { hidden: !step1 })}>
          <div className="mb-6">
            <span className="font-semibold">
              {" "}
              {emailExisting ? "Đăng nhập" : "Đăng ký"} với:
            </span>
            {email}
          </div>
          <div className="relative w-full mb-6">
            <label className={s.label}>Mật Khẩu</label>
            <input
              className={s.input}
              value={password}
              onChange={onPasswordChange}
              name="password"
              title="Mật khẩu"
              type="password"
            />
          </div>
          <div>{!emailExisting && <div className={s.alert}>{alert}</div>}</div>
          {!emailExisting && (
            <div className="relative w-full mb-6">
              <label className={s.label}>Số điện thoại</label>
              <input 
                value={phone}
                onChange={onPhoneChange}
                className={s.input}
                name="phone"
                title=" Số điện thoại"
              />
              {phoneAlert && <div className={s.alert}>{phoneAlert}</div>}
            </div>
          )}
          <div className="grid grid-cols-2 mt-10">
            <div className="col-span-1">
            <button
                type="submit"
                onClick={submitForm}
                disabled={isLoading}
                className={s.button}
              >
                {isLoading
                  ? "Gởi đi..."
                  : emailExisting
                  ? "Đăng nhập"
                  : "Đăng ký"}
              </button>
            </div>
            <div className="col-span-1 pt-3 text-right">
              <span
                className="font-bold cursor-pointer"
                onClick={() => setStep1(false)}
              >
                Quay lại{" "}
              </span>
            </div>
          </div>
        </div>
        <div className=""></div>
        <div className="">
          <div className=""></div>
          <div className=""></div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterForm;
