import { toast } from "react-toastify";
import { FaChevronRight, FaChevronDown, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCopySharp } from "react-icons/io5";
import { useState } from "react";
import { auth } from "../../firebase";
import { removeFromFavourites } from "../../firestore";
import { FaCheck } from "react-icons/fa";
import { editEquation } from "../../firestore";

type FavouritesCardProps = {
  functionType: string;
  favourite: string;
  index: number;
  id: string;
//   latex_code: string;
//   img_binary: string;
  onDelete: (id: string) => void;
};

const FavouritesCard = ({
  functionType,
  favourite,
  index,
  id,
//   latex_code,
//   img_binary,
  onDelete
}: FavouritesCardProps) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [formData, setFormData] = useState(functionType);

  const handleSubmit = () => {
    const user = auth.currentUser;
    if (user) {
        try {
            editEquation(user.uid, id, formData)
            console.log(formData);
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
    navigator.clipboard.writeText(favourite);
    toast.success("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
      position: "bottom-left"
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
          position: "bottom-left"
        });
        onDelete(id);
      } catch (error) {
        console.error("Error deleting favourite:", error);
        toast.error("Failed to delete favourite", {
          autoClose: 1000,
          hideProgressBar: true,
          position: "bottom-left"
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-between p-5 px-7 ${
          index % 2 === 0 ? "bg-green-100" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <div className="w-8">
            {isShowMore ? (
              <FaChevronDown
                className="text-2xl transform transition-transform duration-300"
                onClick={handleShowMore}
              />
            ) : (
              <FaChevronRight
                className="text-2xl transform transition-transform duration-300"
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
                className="text-xl hover:text-green-700 hover:text-2xl transform transition-transform duration-200 hover:scale-125"
                onClick={handleSubmit}
                ></FaCheck>
            ) : (
                <MdEdit
                className="text-2xl transform transition-transform duration-200 hover:scale-125"
                onClick={() => setIsEditting(true)}
                ></MdEdit>
            )}
          <FaTrash
            className="text-2xl transform transition-transform duration-200 hover:scale-125"
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
            <div>{favourite}</div> TODO replace with latex and image on hover
          </div>
          <IoCopySharp
            className="text-xl transform transition-transform duration-200 hover:scale-125"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
};

export default FavouritesCard;
