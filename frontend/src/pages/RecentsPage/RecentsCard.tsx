import { FaHeart } from "react-icons/fa";
import { IoCopySharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { saveEquation } from "../../firestore";
import { auth } from "../../firebase";
import { fetchEquationData } from '../../equationService'


type RecentsCardsProps = {
  text: string;
  liked: boolean;
  index: number;
  latex: string;
  img?: string;
};

const RecentsCard = ({ text, liked, index, latex, img }: RecentsCardsProps) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    toast.success("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
      position: "bottom-left",
    });
  };

  const handleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "bottom-left",
      });
      return;
    }
    const userId = user.uid;
  
    try {
      if (!latex || !img) {
        const result = await fetchEquationData(text, userId, index.toString());
        latex = result.latex_code
        img = result.img_base64
      }
  
      // Now that we have LaTeX and image, save the equation to favorites.
      await saveEquation(userId, text, true, latex, img);
  
      toast.success("Added to favourites", { autoClose: 1000, hideProgressBar: true, position: "bottom-left" });
    } catch (error) {
      console.error("Error saving to favourites:", error);
      toast.error("Failed to add to favourites", {
        autoClose: 1000,
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
  };
  

  return (
    <div
      className={`flex justify-between p-5 px-7 ${
        index % 2 === 0 ? "bg-green-50" : "bg-white"
      }`}
    >
      <div>{latex ? latex : text}</div> 
      <div className="flex items-center space-x-4 text-xl">
        <FaHeart
          onClick={handleLike}
          className={`cursor-pointer transform transition-transform duration-200 hover:scale-125 ${
            liked ? "text-red-600" : ""
          }`}
        />
        <IoCopySharp
          onClick={handleCopy}
          className="cursor-pointer transform transition-transform duration-200 hover:scale-125"
        />
      </div>
    </div>
  );
};

export default RecentsCard;
