import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UpdateProfile } from "../../userApi/api";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [profileFormData, setProfileFormData] = useState({
    image: "",
    password: "",
  });

  const handleFormChange = (name, value) => {
    if (name === "image") {
      // If the input is for image, read the file and convert it to base64
      const reader = new FileReader();
      reader.onload = () => {
        setProfileFormData({
          ...profileFormData,
          [name]: reader.result, // Base64 data URL
        });
      };
      reader.readAsDataURL(value); // Read the file as data URL
    } else {
      // For other inputs, update the state directly
      setProfileFormData({
        ...profileFormData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (profileFormData.password === "" || profileFormData.image === "") {
        toast.error("Password and Image are required"); // Display error toast
        return; // Return early if password or image is empty
      }
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(profileFormData.password)) {
        toast.error(
          "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number."
        );
        return;
      }

      const response = await UpdateProfile(
        userId,
        profileFormData.password,
        profileFormData.image
      );

      if (response) {
        toast.success("Profile updated successfully");
        navigate("/");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="md:w-2/3">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Update Profile
            </h1>
            <input
              value={profileFormData.password}
              onChange={(e) => handleFormChange("password", e.target.value)}
              placeholder="Password"
              type="text"
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            />
            <input
              onChange={(e) => handleFormChange("image", e.target.files[0])}
              placeholder="Upload Image"
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ProfileForm;
