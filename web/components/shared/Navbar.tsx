import React from "react";

const Navbar = () => {
  return (
    <header className="py-4 px-[124px]  w-full flex items-center justify-between shadow-md bg-[#F9F9F9]">
      <nav className="w-full flex items-center justify-between">
        <div className="h-full">
          <img src="/logo.png" alt="logo" className="h-[55px] w-[100px]" />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search experiences"
            className="rounded-sm  py-3 px-4 w-[340px]  bg-[#EDEDED] outline-none border-0"
          />
          <button className="bg-[#FFD643] py-3 px-5 rounded-md  font-inter font-medium ">
            Search
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
