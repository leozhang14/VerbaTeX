import React from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  title: string;
};

const Navbar = ({ title }: NavbarProps) => {
  return (
    <div className="container mx-auto p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold">VerbaTeX</div>
        <div className="flex space-x-4">
          <div className="flex space-x-8">
            <div className="flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg">
              <Link to={"/recents"}>Recents</Link>
            </div>
            <div className="flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg ">
              <Link to={"/record"}>Record</Link>
            </div>
            <div className="flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg ">
              <Link to={"/favourites"}>Favourites</Link>
            </div>
          </div>

          <div className="flex p-2 px-6 pt-2 border-2 border-green-800 bg-green-800 rounded-lg text-white">
            <Link to={"/"}>Log Out</Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20 text-3xl"> {title} </div>
    </div>
  );
};

export default Navbar;
