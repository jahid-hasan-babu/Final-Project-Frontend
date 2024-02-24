import React from "react";
import AppNavbar from "../components/layout/AppNavbar";
import Footer from "../components/layout/Footer";
import CreateProduct from "../components/product/CreateProduct";

const CreateProductPage = () => {
  return (
    <>
      <AppNavbar />
      <CreateProduct />
      <Footer />
    </>
  );
};

export default CreateProductPage;
