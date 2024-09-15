import { toast } from "react-toastify";
import { FaChevronRight, FaChevronDown, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCopySharp } from "react-icons/io5";
import { useState } from "react";

type FavouritesCardProps = {
  functionType: string;
  favourite: string;
  index: number;
};

const FavouritesCard = ({
  functionType,
  favourite,
  index,
}: FavouritesCardProps) => {
  const [isShowMore, setIsShowMore] = useState(false);

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

  return (
    <div className="flex flex-col">
      <div
        className={`flex justify-between p-5 px-7 ${
          index % 2 === 0 ? "bg-green-50" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <div className="w-8">
            {isShowMore ? (
              <FaChevronDown
                className={`text-2xl transform transition-transform duration-300`}
                onClick={handleShowMore}
              />
            ) : (
              <FaChevronRight
                className={`text-2xl transform transition-transform duration-300 rotate-0`}
                onClick={handleShowMore}
              />
            )}
          </div>
          <div className="text-xl">{functionType}</div>
        </div>
        <div className="flex items-center space-x-4 text-xl">
          <MdEdit className="text-2xl transform transition-transform duration-200 hover:scale-125" />
          <FaTrash className="transform transition-transform duration-200 hover:scale-125" />
        </div>
      </div>

      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isShowMore ? "max-h-40" : "max-h-0"
        }`}
      >
        <div
          className={`flex justify-between pb-3 px-7 ${
            index % 2 === 0 ? "bg-green-50" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div className="w-8"></div>
            <div>{favourite}</div>
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
