import React from "react";
import AppNavbar from "./../components/layout/AppNavbar";
import Footer from "./../components/layout/Footer";
import ListProduct from "../components/product/ListProduct";

const ProductListPage = () => {
  return (
    <>
      <AppNavbar />
      <ListProduct />
      <Footer />
    </>
  );
};

export default ProductListPage;
