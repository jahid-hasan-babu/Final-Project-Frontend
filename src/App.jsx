import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateUserPage from "./pages/CreateUserPage";
import OTPPage from "./pages/OTPPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ProductListPage from "./pages/ProductListPage";
import CreateProductPage from "./pages/CreateProductPage";
import UpdatePage from "./pages/UpdatePage";
import axios from "axios";

const App = () => {
  const token = localStorage.getItem("token");

  axios.defaults.headers.common["token"] = token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
