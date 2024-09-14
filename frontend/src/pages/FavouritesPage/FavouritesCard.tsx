import { toast } from "react-toastify";
import { FaChevronRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
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
                className={`text-2xl`}
                onClick={handleShowMore}
              ></FaChevronDown>
            ) : (
              <FaChevronRight
                className={`text-2xl`}
                onClick={handleShowMore}
              ></FaChevronRight>
            )}
          </div>
          <div className="text-xl">{functionType}</div>
        </div>
        <div className="flex items-center space-x-4 text-xl">
          <MdEdit className="text-2xl"></MdEdit>
          <FaTrash></FaTrash>
        </div>
      </div>
      {isShowMore && (
        <div
          className={`flex justify-between pb-3 px-7 ${
            index % 2 === 0 ? "bg-green-50" : "bg-white"
          }`}
        >
          <div className="flex items-center">
            <div className="w-8"></div>
            <div>{favourite}</div>
          </div>
          <IoCopyOutline
            className="text-xl"
            onClick={handleCopy}
          ></IoCopyOutline>
        </div>
      )}
    </div>
  );
};

export default FavouritesCard;
