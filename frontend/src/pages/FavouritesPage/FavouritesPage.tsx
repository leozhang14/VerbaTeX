import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FavouritesCard from "./FavouritesCard";
import { fetchEquations } from "../../firestore"; // Import the function to fetch equations
import { auth } from "../../firebase"; // Import auth to get the current user

type Favourite = {
  functionType: string;
  favourite: string;
};

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const user = auth.currentUser; // Get the current user

  useEffect(() => {
    const getFavourites = async () => {
      if (user) {
        try {
          // Fetch favourite equations
          const fetchedFavourites = await fetchEquations(user.uid, true);
          // Transform the fetched data into the required format
          const formattedFavourites = fetchedFavourites.map((eq) => ({
            functionType: "unknown", // Modify this if you have a way to determine function type
            favourite: eq.equation,
          }));
          setFavourites(formattedFavourites);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      }
    };

    getFavourites();
  }, [user]);

  return (
    <div>
      <Navbar title="Favourite commands" location="favourites"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col">
          {favourites.map((fav, index) => (
            <FavouritesCard
              key={index}
              index={index}
              functionType={fav.functionType}
              favourite={fav.favourite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;

