import { FaHeart } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { saveEquation } from "../../firestore";
import { auth } from "../../firebase";

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
      position: "bottom-left"
    });
  };

  const handleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in", { autoClose: 1000, hideProgressBar: true, position: "bottom-left" });
      return;
    }
    const userId = user.uid;

    try {
      await saveEquation(userId, text, true);
      toast.success("Added to favourites", { autoClose: 1000, hideProgressBar: true, position: "bottom-left" });
    } catch (error) {
      console.error("Error saving to favourites:", error);
      toast.error("Failed to add to favourites", { autoClose: 1000, hideProgressBar: true, position: "bottom-left" });
    }
  };

  return (
    <div
      className={`flex justify-between p-5 px-7 ${
        index % 2 === 0 ? "bg-green-50" : "bg-white"
      }`}
    >
      <div>{text}</div>
      <div className="flex items-center space-x-4 text-xl">
      <FaHeart 
        onClick={handleLike} 
        className={`transform transition-transform duration-200 hover:scale-125 ${liked ? "text-red-600" : ""}`}
      />
      <IoCopySharp 
        onClick={handleCopy} 
        className="transform transition-transform duration-200 hover:scale-125" 
      />
      </div>
    </div>
  );
};

export default RecentsCard;
