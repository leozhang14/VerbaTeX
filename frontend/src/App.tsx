import styles from "./styles/App.module.css";

function App() {
  return (
    <>
      <div className={styles.container}>
        <h1 className="mt-5 text-green-500 text-2xl">VerbaTeX</h1>
        <div className="mt-5 p-3 px-6 pt-2  text-black border-4 border-black rounded-full text-center">
          Press space to record audio
        </div>
      </div>
    </>
  );
}

export default App;
