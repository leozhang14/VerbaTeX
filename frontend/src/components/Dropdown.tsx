import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { logout } from "./Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type DropdownProps = {
  email?: string | null;
};

function getUsernameFromEmail(email: string): string {
  const atIndex = email.indexOf("@");

  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }

  return email;
}

const Dropdown = ({ email }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(navigate);
      toast.success("Logged out successfully", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "bottom-left",
      });

      console.log("Logged out successfully");
    } catch (error) {
      toast.error("Logged out successfully", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "bottom-left",
      });
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex items-center relative">
      <CiMenuBurger
        className="text-3xl cursor-pointer hover:scale-110"
        onClick={handleClick}
      ></CiMenuBurger>

      {isOpen && (
        <div className="absolute right-0 top-14 w-48 bg-white border rounded-lg shadow-lg z-10 text-center">
          <div className="flex flex-col">
            <div className="p-2 border-b text-gray-400">
              <span>
                {email ? getUsernameFromEmail(email) : "not logged in"}
              </span>
            </div>

            {/* Logout option */}
            <div
              className="p-3 px-3 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
