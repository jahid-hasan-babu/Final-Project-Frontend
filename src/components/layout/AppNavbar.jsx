import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiWhatsappLine } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoFacebook } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const AppNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className="bg-green-500 text-white py-2">
        <div className="container lg:mx-auto lg:max-w-6xl mx-auto max-w-screen-xl px-4">
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

      <div className="lg:mx-auto lg:max-w-6xl">
        <div className="navbar bg-base-100 flex flex-wrap items-center justify-between px-4 py-2">
          <Link to="/" className="text-xl font-bold mr-auto">
            JHB
          </Link>

          <div className="block lg:hidden">
            <button className="navbar-toggler" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
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
              </div>
              <div className="flex items-center lg:ml-auto">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full md:w-auto mr-2 mb-2 md:mb-0 lg:mr-4"
                />
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      />
                    </div>
                  </div>
                  <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
