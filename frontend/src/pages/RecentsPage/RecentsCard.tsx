import { FaHeart } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";
import { toast } from "react-toastify";

type RecentsCardsProps = {
  text: string;
  liked: boolean;
  index: number;
};

const RecentsCard = ({ text, liked, index }: RecentsCardsProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  const handleLike = () => {
    toast.success("Liked", {
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  return (
    <div
      className={`flex justify-between p-5 px-7 items-start ${
        index % 2 === 0 ? "bg-green-50" : "bg-white"
      }`}
    >
      <div>{text}</div>
      <div className="flex items-center space-x-4 text-xl">
        <FaHeart onClick={handleLike} className={liked ? "text-red-600" : ""} />
        <IoCopySharp onClick={handleCopy} />
      </div>
    </div>
  );
};

export default RecentsCard;
