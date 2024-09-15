import { Link } from "react-router-dom";
import verbatex from "../assets/verbatex.png";
import Dropdown from "./Dropdown";
import { auth } from "../firebase";

type NavbarProps = {
  title: string;
  location?: string;
};

const Navbar = ({ title, location }: NavbarProps) => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white shadow-md z-20">
        <div className="pl-4 cursor-pointer">
          <Link to={"/"}>
            <img src={verbatex} alt="Verbatex Logo" className="h-12" />
          </Link>
        </div>

        <div className="flex space-x-4 pr-4">
          <Link
            to={"/record"}
            className={`flex p-2 px-6 border-2 border-transparent rounded-lg transition-all duration-300 ${
              location === "record"
                ? "bg-green-600 text-white"
                : "hover:border-green-800"
            }`}
          >
            Record
          </Link>
          <Link
            to={"/recents"}
            className={`flex p-2 px-6 border-2 border-transparent rounded-lg transition-all duration-300 ${
              location === "recents"
                ? "bg-green-600 text-white"
                : "hover:border-green-800"
            }`}
          >
            Recents
          </Link>
          <Link
            to={"/favourites"}
            className={`flex p-2 px-6 border-2 border-transparent rounded-lg transition-all duration-300 ${
              location === "favourites"
                ? "bg-green-600 text-white"
                : "hover:border-green-800"
            }`}
          >
            Favourites
          </Link>
          <Dropdown email={auth.currentUser?.email}></Dropdown>
        </div>
      </header>

      <div className="pt-20">
        <div className="flex justify-center mt-16 text-3xl bg-white p-4">
          {title}
        </div>
      </div>
    </>
  );
};

export default Navbar;
