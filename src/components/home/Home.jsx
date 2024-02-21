import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-stone-100 py-9">
      <div className=" text-center py-24">
        <h1 className="text-5xl font-bold text-black">Home</h1>
        <div className="uppercase flex flex-wrap mx-auto justify-center items-center py-9 text-xl">
          <h3 className="text-green-500">WELCOME // HOME</h3>
        </div>
        <h3 className="text-green-500 font-bold">
          This is our simple Authentication & product management site
        </h3>
      </div>
    </div>
  );
};

export default Home;
