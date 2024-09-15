import React from "react";
import Navbar from "../../components/Navbar";
import { FaMicrophone } from "react-icons/fa";
import useSpeechRecognition from "../../hooks/useSpeechRecognitionHook";
import styles from "../../styles/RecordPage.module.css";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { saveEquation } from "../../firestore";
import { useState } from "react";
import { fetchEquationData } from "../../equationService";
import Spinner from "../../components/Spinner";
import { IoCopySharp } from "react-icons/io5";
import { updateEquationWithLatexAndImage } from "../../firestore";

const RecordPage = () => {
  const { text, startListening, stopListening, isListening, setText } =
    useSpeechRecognition();
  //   const [equationId, setEquationId] = useState<string | null>(null);
  const [latex, setLatex] = useState("");
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = (s: string) => {
    navigator.clipboard.writeText(s);
    toast.success("Copied to clipboard", {
      autoClose: 1000,
      hideProgressBar: true,
      position: "bottom-left",
    });
  };

  // TODO update these fields when got
  //   useEffect(() => {
  //     const handleFetch = async () => {
  //       try {
  //         const user = auth.currentUser;
  //         if (user) {
  //             const result = await fetchEquationData(user.uid, equationId);
  //             setLatex(result.latex_code);
  //             setImg(result.img_binary)
  //         }
  //         } catch (error) {
  //             console.log('Error fetching latex and preview:', error);
  //         }
  //     };

  //     if (userId && equationId) {
  //       handleFetch();
  //     }
  //   }, [userId, equationId]);

  const handleOnClick = () => {
    if (isListening) {
      console.log(text);
      stopListening();
    } else {
      setText("");
      setLatex("");
      setImg("");
      setIsLoading(false);
      startListening();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const newEquationId = await saveEquation(user.uid, text, false);
        toast.success("Text has been submitted", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "bottom-left",
        });

        const result = await fetchEquationData(text, user.uid, newEquationId);
        console.log("Fetched LaTeX and image:", result);

        setLatex(result.latex_code);
        setImg(result.img_base64);

        await updateEquationWithLatexAndImage(
          user.uid,
          newEquationId,
          result.latex_code,
          result.img_base64
        );

        setText("");
      } else {
        toast.error("User not authenticated", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Error submitting equation:", error);
      toast.error("Error submitting text", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar title="Record new commands" location="record" />
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div
            className={`${styles.mic} ${
              isListening ? styles.listening : ""
            } bg-green-600 rounded-full w-24 h-24 flex items-center justify-center text-white`}
            onClick={handleOnClick}
          >
            <FaMicrophone className="text-3xl" />
          </div>
        </div>
        <div className="flex flex-col mt-2 2 w-3/5">
          <div className="flex space-x-6">
            <div className="relative w-full">
              <textarea
                rows={12}
                cols={80}
                placeholder="Direct audio transcription here..."
                className="border-2 border-black focus:outline-none focus:ring-0 mt-5 p-4 rounded-lg w-full"
                value={text}
                onChange={handleOnChange}
              />
              <IoCopySharp
                className="absolute top-7 right-2 text-xl cursor-pointer text-gray-300 hover:text-black"
                onClick={() => handleCopy(text)}
              />
            </div>
            <div className="relative w-full">
              <textarea
                rows={12}
                cols={80}
                placeholder="Results here..."
                className="border-2 border-green-800 focus:outline-none focus:ring-0 mt-5 p-4 rounded-lg w-full"
                value={latex || ""}
                readOnly
              />
              <IoCopySharp
                className="absolute top-7 right-2 text-xl cursor-pointer text-gray-300 hover:text-black"
                onClick={() => handleCopy(latex || "")}
              />
            </div>
          </div>
          <div
            className={`mr-auto p-2 px-4 border-2  rounded-lg mt-4 border-black hover:bg-black hover:text-white cursor-pointer
            `}
            onClick={!isListening ? handleSubmit : undefined}
          >
            {!isLoading && isListening && <Spinner size="sm"></Spinner>}
            {!isLoading && !isListening && "Submit"}
            {isLoading && <Spinner size="sm"></Spinner>}
          </div>
        </div>

        {img && (
          <img
            src={`data:image/png;base64,${img}`}
            alt="Equation Preview"
            className="mt-4"
          />
        )}
      </div>
    </div>
  );
};

export default RecordPage;
