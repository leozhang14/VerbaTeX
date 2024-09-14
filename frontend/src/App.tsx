import styles from "./styles/App.module.css";
import useSpeechRecognition from "./hooks/useSpeechRecognitionHook";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  return (
    <>
    <LoginButton/>
    <LogoutButton/>
      <div className={styles.container}>
        <h1 className="mt-5 text-green-500 text-2xl">VerbaTeX</h1>

        {!hasRecognitionSupport && (
          <p className="text-red-500">
            Speech recognition is not supported in your browser.
          </p>
        )}

        {hasRecognitionSupport && (
          <>
            {isListening ? (
              <p className="mt-5 text-blue-500">Listening...</p>
            ) : (
              <p className="mt-5 text-gray-500">
                Click "Start" to begin listening
              </p>
            )}

            <p className="mt-5 text-black">
              Recognized Text: {text || "No speech detected"}
            </p>
            <div className="flex gap-x-2">
              <div
                className="mt-5 p-3 px-6 pt-2 text-black border-4 border-black rounded-full text-center cursor-pointer hover:text-white hover:bg-black"
                onClick={startListening}
              >
                Start
              </div>
              <div
                className="mt-5 p-3 px-6 pt-2 text-black border-4 border-black rounded-full text-center cursor-pointer hover:text-white hover:bg-black"
                onClick={stopListening}
              >
                Stop
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
