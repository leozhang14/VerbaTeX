import React from "react";
import Navbar from "../../components/Navbar";
import { IoMdPlay } from "react-icons/io";
import { FaStop } from "react-icons/fa";
import useSpeechRecognition from "../../hooks/useSpeechRecognitionHook";

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
      <Navbar title="Record new commands"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="flex items-center space-x-3">
          <div
            className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center text-white"
            onClick={handleOnClick}
          >
            {isListening ? (
              <FaStop className="text-3xl"></FaStop>
            ) : (
              <IoMdPlay className="text-5xl pl-2 " />
            )}
          </div>
          <div className="bg-green-500 h-12 w-72 rounded-md flex items-center pl-2">
            PLACEHOLDER
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            rows={5}
            cols={80}
            placeholder="Direct audio transcription here..."
            className="border-2 border-black focus:outline-none focus:ring-0 mt-5 p-4 rounded-lg"
            value={text}
            onChange={handleOnChange}
          ></textarea>
          <div
            className="ml-auto p-2 px-4 border-2 border-black rounded-lg mt-2 hover:bg-black hover:text-white"
            onClick={handleSubmit}
          >
            Submit
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
