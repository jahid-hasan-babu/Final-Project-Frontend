import React, { useState } from "react";
import { createProduct } from "../../userApi/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pname: "",
    brand: "",
    category: "",
    description: "",
    image: "", // New state for image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Extracting base64 string from data URL
      setFormData({
        ...formData,
        image: base64String, // Setting the base64 string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.pname ||
      !formData.brand ||
      !formData.category ||
      !formData.description ||
      !formData.image
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await createProduct(formData);
      if (res) {
        toast.success("Product Created Successfully");
        navigate("/products");
      } else {
        toast.error("Failed to Create Product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to Create Product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">
        Create Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="pname"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="pname"
              name="pname"
              value={formData.pname}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-600"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default CreateProduct;
