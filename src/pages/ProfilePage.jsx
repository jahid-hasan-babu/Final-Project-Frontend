import React from "react";
import AppNavbar from "./../components/layout/AppNavbar";
import Footer from "./../components/layout/Footer";
import ProfileForm from "../components/users/ProfileForm";

const ProfilePage = () => {
  return (
    <>
      <AppNavbar />
      <ProfileForm />
      <Footer />
    </>
  );
};

export default ProfilePage;
