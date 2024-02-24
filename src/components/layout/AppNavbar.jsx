import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiWhatsappLine } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { LogOutUser, ReadProfileRequest } from "../../userApi/api";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const res = await ReadProfileRequest(userId);

        setUserData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(userId);
  }, [userId]);

  const isLogin = () => {
    return !!localStorage.getItem("token");
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const onLogout = async () => {
    await LogOutUser();
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="bg-green-500 text-white py-2">
        <div className=" lg:mx-auto lg:max-w-6xl mx-auto max-w-screen-xl px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <div className="flex items-center">
                <span className="text-sm">
                  <div className="flex items-center">
                    <MdMarkEmailUnread className="mr-3" /> Support@jhb.com
                  </div>
                </span>
                <span className="text-sm mx-2">
                  <div className="flex items-center">
                    <FaPhoneAlt className="mr-3" /> 01774688159
                  </div>
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <span className="text-sm mx-2">
                <RiWhatsappLine />
              </span>
              <span className="text-sm mx-2">
                <IoLogoYoutube />
              </span>
              <span className="text-sm">
                <IoLogoFacebook />
              </span>
            </div>
          </div>
        </div>
      </div>

      {isLogin() && userData ? (
        <>
          <div className="sticky top-0 bg-white z-50">
            <div className="lg:mx-auto lg:max-w-6xl">
              <div className="navbar  bg-base-100 flex flex-wrap items-center justify-between px-4 py-2">
                <Link to="/" className="text-xl font-bold mr-auto">
                  JHB
                </Link>
                <div className="block lg:hidden">
                  <button className="navbar-toggler" onClick={toggleMenu}>
                    <img
                      src={userData.image}
                      alt="Menu Icon"
                      className="h-6 w-6"
                    />
                  </button>
                </div>

                <div
                  className={`lg:flex flex-col lg:flex-row items-center ${
                    showMenu ? "" : "hidden"
                  }`}
                >
                  <div className="py-5 flex flex-col lg:flex-row justify-between items-center mx-auto px-4">
                    <div className="mb-4 lg:mb-0">
                      <Link
                        to="/"
                        className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block lg:mr-4"
                      >
                        Home
                      </Link>

                      <Link
                        to="/products"
                        className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block"
                      >
                        Products
                      </Link>

                      <Link
                        to="/create-product"
                        className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block"
                      >
                        Create Product
                      </Link>
                    </div>
                    <div className="flex items-center lg:ml-auto">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-circle avatar"
                        >
                          <div className="w-10 rounded-full">
                            <img
                              alt="Tailwind CSS Navbar component"
                              src={userData.image}
                            />
                          </div>
                        </div>
                        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                          <li>
                            <Link to="/profile" className="justify-between">
                              Profile
                            </Link>
                          </li>

                          <li>
                            <Link onClick={onLogout}>Logout</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="sticky top-0 bg-white z-50">
          <div className=" navbar bg-base-100 lg:mx-auto lg:max-w-6xl">
            <Link to="/" className="text-xl font-bold mr-auto">
              JHB
            </Link>

            <div className="flex-none">
              <div className="py-5 flex flex-col lg:flex-row justify-between items-center mx-auto px-4">
                <div className="mb-4 lg:mb-0">
                  <Link
                    to="/"
                    className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block lg:mr-4"
                  >
                    Home
                  </Link>

                  <Link
                    to="/login"
                    className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block"
                  >
                    Login
                  </Link>
                  <Link
                    to="/create-user"
                    className="text-black px-3 py-2 rounded-md hover:bg-green-500 block lg:inline-block"
                  >
                    Create User
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
