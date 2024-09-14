import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RecentsPage from "./pages/RecentsPage/RecentsPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import RecordPage from "./pages/RecordPage/RecordPage";

const AppTest = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/recents" element={<RecentsPage></RecentsPage>}></Route>
      <Route path="/record" element={<RecordPage></RecordPage>}></Route>
      <Route
        path="/favourites"
        element={<FavouritesPage></FavouritesPage>}
      ></Route>
    </Routes>
  );
};

export default AppTest;
