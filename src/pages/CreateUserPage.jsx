import React from "react";
import AppNavbar from "../components/layout/AppNavbar";
import Footer from "../components/layout/Footer";
import CreateUser from "../components/users/CreateUser";

const CreateUserPage = () => {
  return (
    <>
      <AppNavbar />
      <CreateUser />
      <Footer />
    </>
  );
};

export default CreateUserPage;
