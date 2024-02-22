import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../../userApi/api";

const OTPFrom = () => {
  const [OTPFormData, SetOTPFormData] = useState({ otp: "" });
  let navigate = useNavigate();

  const OTPFormOnChange = (name, value) => {
    SetOTPFormData(() => ({
      ...OTPFormData,
      [name]: value,
    }));
  };

  const onFormSubmit = async () => {
    if (OTPFormData.otp === "") {
      toast.error("Valid PIN Required");
    } else {
      try {
        const res = await verifyOTP(OTPFormData.otp);
        if (res) {
          // Save token to localStorage
          localStorage.setItem("token", res.token);
          navigate("/");
        } else {
          toast.error("Something Went Wrong !");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Something Went Wrong !");
      }
    }
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="md:w-2/3">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h4 className="text-lg font-bold mb-4">
                Enter Verification Code
              </h4>
              <p className="text-sm mb-4">
                A verification code has been sent to the email address you
                provided.
              </p>
              <input
                value={OTPFormData.otp}
                onChange={(e) => {
                  OTPFormOnChange("otp", e.target.value);
                }}
                placeholder="Verification"
                type="text"
                className="w-full border border-gray-300 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              />
              <button
                onClick={onFormSubmit}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
};

export default OTPFrom;
