import React from "react";
import { useAuth } from "../../../context/AuthContext";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoggedBox from "./LoggedBox";

const AuthMenu = () => {
  const { accessToken, user, logout } = useAuth();
  return (
    <>
      {accessToken !== "" ? (
        <LoggedBox />
      ) : (
        <>
          <RegisterForm />
        </>
      )}
    </>
  );
};

export default AuthMenu;
