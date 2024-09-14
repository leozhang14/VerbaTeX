import { useState, useEffect } from "react";

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognitionInstance = new webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setText(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech Recognition Error: ", event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
    setText,
  };
};

export default useSpeechRecognition;
