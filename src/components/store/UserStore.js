import { create } from "zustand";

const UserStore = create((set) => {
  isLogin: () => {
    return !!localStorage.get("token");
  };
});
