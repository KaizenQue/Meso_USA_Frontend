import React from "react";
import Interactivity from "./Interactivity";
import Navbar from "../../../Components/NavBar/Navbar";

const Main = () => {
  return (
    <div className="flex h-screen">
      <div className="bg-white-800 text-white w-1/7">
        <Navbar />
      </div>
      <div className="flex-1 p-6 overflow-auto flex flex-col">
        <div>
          <Interactivity />
        </div>
      </div>
    </div>
  );
};

export default Main;
