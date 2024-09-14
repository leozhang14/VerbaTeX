import React from "react";
import Navbar from "../../components/Navbar";
import { IoMdPlay } from "react-icons/io";
import { FaStop } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import useSpeechRecognition from "../../hooks/useSpeechRecognitionHook";
import styles from "../../styles/RecordPage.module.css";

const RecordPage = () => {
  const { text, startListening, stopListening, isListening, setText } =
    useSpeechRecognition();

  const handleOnClick = () => {
    if (isListening) {
      console.log(text);
      stopListening();
    } else {
      startListening();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <div>
      <Navbar title="Record new commands" location="record"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <div
            className={`${styles.mic} ${
              isListening ? styles.listening : ""
            } bg-green-500 rounded-full w-24 h-24 flex items-center justify-center text-white`}
            onClick={handleOnClick}
          >
            <FaMicrophone className="text-3xl"></FaMicrophone>
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
          ></textarea>
          <div
            className={`ml-auto p-2 px-4 border-2 rounded-lg mt-2 ${
              isListening
                ? "border-green-500 bg-green-100 text-green-700 cursor-not-allowed"
                : "border-black hover:bg-black hover:text-white"
            } ${isListening ? "bg-green-200" : ""}`}
            onClick={!isListening ? handleSubmit : undefined}
          >
            {isListening ? "Listening..." : "Submit"}
          </div>
        </div>
        <textarea
          rows={5}
          cols={80}
          placeholder="Results here..."
          className="border-2 border-green-800 focus:outline-none focus:ring-0 mt-8 p-4 rounded-lg"
        ></textarea>
      </div>
    </div>
  );
};

export default RecordPage;
