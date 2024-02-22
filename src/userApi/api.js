import axios from "axios";

let BaseURL = `http://localhost:4000/api/v1`;

//createUser
export const registration = async (reqBody) => {
  try {
    let res = await axios.post(BaseURL + "/createUser", reqBody);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//CheckEmail
export const checkEmailExists = async (email) => {
  try {
    const res = await axios.get(BaseURL + "/checkEmail", { params: { email } });
    if (res.status === 200) {
      return res.data.status === "success";
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//verify otp
export const verifyOTP = async (otp) => {
  try {
    let email = sessionStorage.getItem("userEmail");
    const res = await axios.get(`${BaseURL}/verifyUser/${email}/${otp}`);
    return res.data;
  } catch (error) {
    return false;
  }
};

//logout

export const LogOutUser = async () => {
  try {
    const res = await axios.get(`${BaseURL}/LogOutUser`);
    return res.data;
  } catch (error) {
    return false;
  }
};

//login
export const loginUser = async (email, password) => {
  try {
    const res = await axios.get(
      `${BaseURL}/LoginUser?email=${email}&password=${password}`
    );
    return res.data;
  } catch (error) {
    return false;
  }
};
