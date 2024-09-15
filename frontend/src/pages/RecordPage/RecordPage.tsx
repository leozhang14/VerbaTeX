import React from "react";
import Navbar from "../../components/Navbar";
import { FaMicrophone } from "react-icons/fa";
import useSpeechRecognition from "../../hooks/useSpeechRecognitionHook";
import styles from "../../styles/RecordPage.module.css";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { saveEquation } from "../../firestore";
import { useState } from "react";

const RecordPage = () => {
  const { text, startListening, stopListening, isListening, setText } =
    useSpeechRecognition();

  const [latex, setLatex] = useState("");

  const handleOnClick = () => {
    if (isListening) {
      console.log(text);
      stopListening();
    } else {
      setText("");
      setLatex("");
      startListening();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await saveEquation(user.uid, text, false);
        toast.success("Text has been submitted", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "bottom-left",
        });
        try {
          // Make the GET request to the backend endpoint, passing the parameter in the query string
          const response = await fetch(
            `http://localhost:3001/gpt-query?text=${encodeURIComponent(text)}`,
            {
              method: "GET",
            }
          );
          // Check if the response is ok
          if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            console.log(data);
            setLatex(data.response);
          } else {
            console.error("Failed to fetch from backend");
          }
        } catch (error) {
          console.error("Error occurred while fetching:", error);
        }
      } else {
        toast.error("User not authenticated", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Error saving equation:", error);
      toast.error("Error submitting text", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "bottom-left",
      });
    }
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
        <div className="flex flex-col mt-2">
          <textarea
            rows={5}
            cols={80}
            placeholder="Direct audio transcription here..."
            className="border-2 border-black focus:outline-none focus:ring-0 mt-5 p-4 rounded-lg"
            value={text}
            onChange={handleOnChange}
          />
          <div
            className={`ml-auto p-2 px-4 border-2 rounded-lg mt-2 ${
              isListening
                ? "border-green-600 bg-green-100 text-green-700 cursor-not-allowed"
                : "border-black hover:bg-black hover:text-white cursor-pointer"
            } ${isListening ? "bg-green-200" : ""}`}
            onClick={!isListening ? handleSubmit : undefined}
          >
            {isListening ? "Listening..." : "Submit"}
          </div>
        </div>
        <textarea
          rows={5}
          cols={80}
          value={latex}
          placeholder="Results here..."
          className="border-2 border-green-800 focus:outline-none focus:ring-0 mt-8 p-4 rounded-lg"
        />
      </div>
    </div>
  );
};

export default RecordPage;
