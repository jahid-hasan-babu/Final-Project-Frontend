import React, { useState } from "react";
import { checkEmailExists, registration } from "../../userApi/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    image: null, // Store the selected image file
  });

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        formData.name.trim() === "" ||
        formData.email.trim() === "" ||
        formData.mobile.trim() === "" ||
        formData.password.trim() === ""
      ) {
        toast.error("All fields are required!");
        return;
      }

      const bdMobileRegex = /^01[3-9]\d{8}$/;
      if (!bdMobileRegex.test(formData.mobile)) {
        toast.error("Please enter a valid Bangladeshi mobile number.");
        return;
      }

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }

      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        toast.error(
          "This email is already registered. Please use a different email."
        );
        return;
      }
      sessionStorage.setItem("userEmail", formData.email);
      let encodedImage = null;
      if (formData.image) {
        encodedImage = await convertImageToBase64(formData.image);
      } else {
        encodedImage =
          "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
      }
      const registrationData = {
        ...formData,
        image: encodedImage,
      };

      const success = await registration(registrationData);

      if (success) {
        navigate("/otp");
      } else {
        throw new Error("User registration failed");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <h1 className="font-bold text-3xl text-center py-5">Create User</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleInputChange("name", e.target.value);
            }}
            placeholder="Enter your name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleInputChange("email", e.target.value);
            }}
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => {
              handleInputChange("mobile", e.target.value);
            }}
            placeholder="Enter your mobile number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              handleInputChange("password", e.target.value);
            }}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              handleImageChange("image", e.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default CreateUser;
