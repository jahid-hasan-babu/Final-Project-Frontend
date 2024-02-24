import axios from "axios";

let BaseURL = `http://localhost:9000/api/v1`;

function unauthorized(code) {
  if (code === 401) {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  }
}

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

//readProfile
export const ReadProfileRequest = async (userId) => {
  try {
    let res = await axios.get(BaseURL + "/ReadProfile", { userId });
    return res.data.data;
  } catch (e) {
    return [];
  }
};

//profile

export const UpdateProfile = async (userId, password, image) => {
  try {
    const res = await axios.patch(`${BaseURL}/UpdateProfile`, {
      userId,
      password,
      image,
    });
    return res.data;
  } catch (e) {
    unauthorized(e.response.status);
  }
};
//productList
export const productListRequest = async () => {
  try {
    let res = await axios.get(BaseURL + "/ReadProduct");
    return res.data.data;
  } catch (e) {
    return [];
  }
};

//create product
export const createProduct = async (postBody) => {
  try {
    let res = await axios.post(BaseURL + "/CreateProduct", postBody);
    if (res.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//delete product
export const deleteProduct = async (id) => {
  try {
    let res = await axios.delete(BaseURL + "/DeleteProduct/" + id);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//update product
export const updateProduct = async (id, postBody) => {
  try {
    let res = await axios.patch(BaseURL + "/UpdateProduct/" + id, postBody);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

//read by id
export const productListById = async (id) => {
  try {
    let res = await axios.get(BaseURL + "/productListById/" + id);
    if (res.status === 200) {
      return res["data"]["data"][0];
    } else {
      return false;
    }
  } catch (error) {
    return [];
  }
};

//search product

export const ListByProductName = async (pname) => {
  try {
    let res = await axios.get(BaseURL + "/ListByProductName/" + pname);
    res.data;
  } catch (e) {
    return [];
  }
};
