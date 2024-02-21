import React from "react";

const Footer = () => {
  return (
    <div className="bg-neutral">
      <footer className="lg:mx-auto lg:max-w-6xl footer p-10  text-neutral-content">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className=" py-3 text-center">
        <p className="text-white bodySmal">
          &copy; Jahid Hasan - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
