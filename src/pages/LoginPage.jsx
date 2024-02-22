import React from "react";
import AppNavbar from "../components/layout/AppNavbar";
import Footer from "../components/layout/Footer";
import Login from "../components/users/Login";

const LoginPage = () => {
  return (
    <>
      <AppNavbar />
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
