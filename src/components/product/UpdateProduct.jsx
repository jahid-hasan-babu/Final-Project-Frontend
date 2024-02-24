import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productListById, updateProduct } from "../../userApi/api";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pname: "",
    brand: "",
    category: "",
    description: "",
    image: "",
  });

  const { id } = useParams();

  useEffect(() => {
    // Fetch product data by ID when component mounts
    const fillForm = async (id) => {
      try {
        const res = await productListById(id);
        setFormData({
          pname: res.pname,
          brand: res.brand,
          category: res.category,
          description: res.description,
          image: res.image,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error, such as displaying a toast message
        toast.error("Failed to fetch product");
      }
    };
    if (id !== undefined) {
      fillForm(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // If the change is for the image input
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setFormData({
          ...formData,
          [name]: base64String, // Update image data with base64 string
        });
      };
      reader.readAsDataURL(file);
    } else {
      // For other input fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update product
      const res = await updateProduct(id, formData);
      if (res) {
        toast.success("Product updated successfully");
        // Redirect to products page after successful update
        navigate("/products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error, such as displaying a toast message
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-600">
        Update Product
      </h2>
      <form onSubmit={handleSubmit}>
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
            accept="image/*" // Limit to image files
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full"
          >
            Update Product
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default UpdateProduct;
