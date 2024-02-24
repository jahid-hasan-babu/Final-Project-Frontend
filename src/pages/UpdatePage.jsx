import React from "react";
import AppNavbar from "../components/layout/AppNavbar";
import Footer from "../components/layout/Footer";
import UpdateProduct from "../components/product/UpdateProduct";

const UpdatePage = () => {
  return (
    <div>
      <AppNavbar />
      <UpdateProduct />
      <Footer />
    </div>
  );
};

export default UpdatePage;
