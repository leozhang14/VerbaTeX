import { useState } from "react";
import styles from "./styles/App.module.css";

function App() {
  const [isSpaceDown, setIsSpaceDown] = useState(false);
  const audioContext = new AudioContext();

  const handleSpaceDown = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      setIsSpaceDown(true);
    }
  };

  const handleSpaceUp = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      event.preventDefault();
      setIsSpaceDown(false);
    }
  };

  window.addEventListener("keydown", handleSpaceDown);
  window.addEventListener("keyup", handleSpaceUp);

  return (
    <>
      <div className={styles.container}>
        <h1 className="mt-5 text-green-500 text-2xl">VerbaTeX</h1>
        <div className="mt-5 p-3 px-6 pt-2  text-black border-4 border-black rounded-full text-center">
          {isSpaceDown ? "Recording..." : "Press SPACE to record audio"}
        </div>
        <audio controls className="mt-5"></audio>
      </div>
    </>
  );
}

export default App;
