import React, { useEffect, useState } from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  ListByProductName,
  deleteProduct,
  productListRequest,
} from "../../userApi/api";

const ListProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pname, setPname] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await productListRequest();
      console.log("Response from productListRequest:", res); // Add this line
      if (res !== undefined) {
        setData(res);
      } else {
        console.error("Response from productListRequest is undefined");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await ListByProductName(pname);
      console.log("Response from ListByProductName:", res); // Add this line
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error("Error searching products:", error);
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      if (res) {
        toast.success("Delete completed");
        setData(data.filter((item) => item._id !== id));
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-warning"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-11/12 mx-auto pb-9">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search by product name..."
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            className="w-full px-3 py-2 rounded-md border-gray-300 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
          />
          <button
            onClick={handleSearch}
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500"
          >
            Search
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            {/* Table Headers */}
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Details</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="text-center">
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <tr key={index} className="mt-2 bg-slate-500 text-white">
                    <td>
                      <img
                        src={item.image}
                        className="h-7 w-7 ml-9 rounded-3xl"
                        stroke="currentColor"
                        alt="Product Image"
                      />
                    </td>
                    <td className="px-4 py-2 text-sm">{item.pname}</td>
                    <td className="px-4 py-2 text-sm">{item.brand}</td>
                    <td className="px-4 py-2 text-sm">{item.category}</td>
                    <td className="px-4 py-2 text-sm">{item.description}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={"/update/" + item._id}
                      >
                        Edit <LuClipboardEdit />
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => onDelete(item._id)}
                        className="btn btn-error"
                      >
                        Delete <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default ListProduct;
