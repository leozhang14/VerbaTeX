import { FaRegHeart } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

type RecentsCardsProps = {
  recent: string;
  index: number;
};

const RecentsCard = ({ recent, index }: RecentsCardsProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(recent);
  };
  return (
    <div
      className={`flex justify-between p-5 px-7 ${
        index % 2 === 0 ? "bg-green-50" : "bg-white"
      }`}
    >
      <div>{recent}</div>
      <div className="flex items-center space-x-4 text-xl">
        <FaRegHeart />
        <IoCopyOutline onClick={handleCopy} />
      </div>
    </div>
  );
};

export default RecentsCard;
