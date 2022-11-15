import { Modal } from "antd";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import s from "./RegisterForm.module.css";
const RegisterForm = () => {
  const {
    login,
    action: { event },
    updateAction,
  } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [step1, setStep1] = React.useState(false);
  const [emailExiting, setEmailExisting] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [alert, setAlert] = React.useState<any>(null);
  const [phoneAlert, setPhoneAlert] = React.useState<any>(null);
  const [passWord, setPassword] = React.useState<string>("");
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
  const onPasswordChange = (event: any) => {};
  const isPasswordValue = (password: string) => {};
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
        className=""
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="">
          <p className="">Đăng nhập hoặc đăng ký với email của bạn.</p>
          <div className="">
            <label className="">Địa chỉ email</label>
            <input placeholder="Địa chỉ email" 
            onChange={handleEmailChange}
            type="email" name="email" />
            <div className=""></div>
          </div>
          <button className="">TIẾP TỤC</button>
        </div>
        <div className="">
          <div className="">
            <span className="">- hoặc -</span>
          </div>
          <div className="">
            <label className=""></label>
            <input />
          </div>
          <div>{!emailExiting && <div className=""></div>}</div>
          {!emailExiting && (
            <div className="">
              <label className=""></label>
              <input />
              {phoneAlert && <div className=""></div>}
            </div>
          )}
          <div className="">
            <div className="">
              <button>{}</button>
            </div>
            <div className="">
              <span className=""></span>
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