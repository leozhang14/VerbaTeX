import { toast } from "react-toastify";
import { FaChevronRight, FaChevronDown, FaTrash, FaCheck } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCopySharp } from "react-icons/io5";
import { useState } from "react";
import { auth } from "../../firebase";
import { removeFromFavourites } from "../../firestore";
import { editEquation } from "../../firestore";

type FavouritesCardProps = {
  functionType: string;
  favourite: string;
  index: number;
  id: string;
  latex: string;
  img: string;
  onDelete: (id: string) => void;
};

const FavouritesCard = ({
  functionType,
  favourite,
  index,
  id,
  latex,
  img,
  onDelete
}: FavouritesCardProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [formData, setFormData] = useState(functionType);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleSubmit = () => {
    const user = auth.currentUser;
    if (user) {
        try {
            editEquation(user.uid, id, formData);
            setIsEditting(false);
        } catch (error) {
            console.error("Error editing title:", error);
        }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
  };

  const user = auth.currentUser;

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    toast.success("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
      position: "bottom-left",
    });
  };

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const handleDelete = async () => {
    if (user) {
      try {
        await removeFromFavourites(user.uid, id);
        toast.success("Favourite deleted", {
          autoClose: 1000,
          hideProgressBar: true,
          position: "bottom-left",
        });
        onDelete(id);
      } catch (error) {
        console.error("Error deleting favourite:", error);
        toast.error("Failed to delete favourite", {
          autoClose: 1000,
          hideProgressBar: true,
          position: "bottom-left",
        });
      }
    }
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    setPopupVisible(true);
    const { clientX, clientY } = event;
    // console.log(clientX, clientY);
    
    
    const popupWidth = window.innerWidth * 0.1;
    const popupHeight = 250;

    const top = clientY;
    const left = clientX;
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  return (
    <div className="relative flex flex-col">
      <div
        className={`flex justify-between p-5 px-7 ${
          index % 2 === 0 ? "bg-green-100" : "bg-white"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center">
          <div className="w-8">
            {isShowMore ? (
              <FaChevronDown
                className="cursor-pointer text-2xl transform transition-transform duration-300"
                onClick={handleShowMore}
              />
            ) : (
              <FaChevronRight
                className="cursor-pointer text-2xl transform transition-transform duration-300"
                onClick={handleShowMore}
              />
            )}
          </div>
          {!isEditting && <div className="text-xl">{functionType}</div>}
          {isEditting && (
            <div>
              <input
                type="text"
                value={formData}
                onChange={handleChange}
                className="p-1 px-2 outline-none border-2 border-green-900 rounded-lg text-lg"
              />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-xl">
          {isEditting ? (
            <FaCheck
              className="cursor-pointer text-xl hover:text-green-700 hover:text-2xl transform transition-transform duration-200 hover:scale-125"
              onClick={handleSubmit}
            ></FaCheck>
          ) : (
            <MdEdit
              className="cursor-pointer text-2xl transform transition-transform duration-200 hover:scale-125"
              onClick={() => setIsEditting(true)}
            ></MdEdit>
          )}
          <FaTrash
            className="cursor-pointer text-2xl transform transition-transform duration-200 hover:scale-125"
            onClick={handleDelete}
          />
        </div>
      </div>

      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isShowMore ? "max-h-40" : "max-h-0"
        }`}
      >
        <div
          className={`flex justify-between pb-5 px-7 ${
            index % 2 === 0 ? "bg-green-100" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div className="w-8"></div>
            <div>{latex ? latex : favourite }</div>
          </div>
          <IoCopySharp
            className="cursor-pointer text-xl transform transition-transform duration-200 hover:scale-125"
            onClick={handleCopy}
          />
        </div>
      </div>

      {popupVisible && img && (
        <div
          className="absolute"
          style={{
            top: `200px`,
            left: `70px`,
            width: "35vw",
            height: "auto",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000
          }}
        >
          <img
            src={`data:image/png;base64,${img}`}
            alt="Equation Preview"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
      )}
    </div>
  );
};

export default FavouritesCard;
