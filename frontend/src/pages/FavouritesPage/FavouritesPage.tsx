import Navbar from "../../components/Navbar";
import FavouritesCard from "./FavouritesCard";

const data = {
  favourites: [
    {
      functionType: "integral",
      favourite: "\\(\\int_{a}^{b} x^2 \\,dx\\)",
    },
    {
      functionType: "addition",
      favourite: "\\(a + b = z\\)",
    },
    {
      functionType: "subtraction",
      favourite: "\\(a - b = y)\\)",
    },
  ],
};

const FavouritesPage = () => {
  return (
    <div>
      <Navbar title="Favourite commands" location="favourites"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col">
          {data.favourites.map((fav, index) => (
            <FavouritesCard
              index={index}
              functionType={fav.functionType}
              favourite={fav.favourite}
            ></FavouritesCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
