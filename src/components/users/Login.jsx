import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../userApi/api";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormChange = (name, value) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (loginFormData.email === "" || loginFormData.password === "") {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await loginUser(loginFormData.email, loginFormData.password);
      if (res && res.token) {
        localStorage.setItem("token", res.token);
        navigate("/");
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="md:w-2/3">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
            <input
              value={loginFormData.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              placeholder="Enter Your Email"
              type="text"
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            />
            <input
              value={loginFormData.password}
              onChange={(e) => handleFormChange("password", e.target.value)}
              placeholder="Enter Your Password"
              type="text"
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
