import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RecentsPage from "./pages/RecentsPage/RecentsPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import RecordPage from "./pages/RecordPage/RecordPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/recents" element={<RecentsPage />}></Route>
      <Route path="/record" element={<RecordPage />}></Route>
      <Route
        path="/favourites"
        element={<FavouritesPage />}
      ></Route>
    </Routes>
  );
};

export default App;
