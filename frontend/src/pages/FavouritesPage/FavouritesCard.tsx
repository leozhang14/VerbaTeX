import { toast } from "react-toastify";
import { FaChevronRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoCopySharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
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
  const [isEditting, setIsEditting] = useState(false);
  const [formData, setFormData] = useState(functionType);

  const handleSubmit = () => {
    console.log(formData);
    setIsEditting(false);
  };

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(event.target.value);
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
              <div className="cursor-pointer hover:scale-125">
                <FaChevronDown
                  className={`text-2xl`}
                  onClick={handleShowMore}
                ></FaChevronDown>
              </div>
            ) : (
              <div className="cursor-pointer hover:scale-125">
                <FaChevronRight
                  className={`text-2xl`}
                  onClick={handleShowMore}
                ></FaChevronRight>
              </div>
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
              ></input>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 text-xl">
          {isEditting ? (
            <div className="cursor-pointer hover:scale-125">
              <FaCheck
                className="text-xl hover:text-green-700 hover:text-2xl"
                onClick={handleSubmit}
              ></FaCheck>
            </div>
          ) : (
            <div className="cursor-pointer hover:scale-125">
              <MdEdit
                className="text-2xl"
                onClick={() => setIsEditting(true)}
              ></MdEdit>
            </div>
          )}
          <div className="cursor-pointer hover:scale-125">
            <FaTrash></FaTrash>
          </div>
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
          <div className="cursor-pointer hover:scale-125">
            <IoCopySharp
              className="text-xl min-w-6"
              onClick={handleCopy}
            ></IoCopySharp>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouritesCard;
