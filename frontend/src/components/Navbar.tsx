import React from "react";
import { Link } from "react-router-dom";

type NavbarProps = {
  title: string;
  location?: string;
};

const Navbar = ({ title, location }: NavbarProps) => {
  return (
    <div className="container mx-auto p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-5xl font-bold">VerbaTeX</div>
        <div className="flex space-x-4">
          <div className="flex space-x-8">
            <Link
              to={"/recents"}
              className={`flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg ${
                location == "recents" && "bg-green-500 text-white"
              }`}
            >
              Recents
            </Link>

            <Link
              to={"/record"}
              className={`flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg ${
                location == "record" && "bg-green-500 text-white"
              }`}
            >
              Record
            </Link>
            <Link
              to={"/favourites"}
              className={`flex p-2 px-6 pt-2 border-2 border-transparent hover:border-green-800 rounded-lg ${
                location == "favourites" && "bg-green-500 text-white"
              }`}
            >
              Favourites
            </Link>
          </div>

          <Link
            className="flex p-2 px-6 pt-2 border-2 border-green-800 bg-green-800 rounded-lg text-white"
            to={"/"}
          >
            Log Out
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-20 text-3xl"> {title} </div>
    </div>
  );
};

export default Navbar;
