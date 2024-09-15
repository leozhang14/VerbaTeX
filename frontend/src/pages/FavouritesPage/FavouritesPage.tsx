import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FavouritesCard from "./FavouritesCard";
import { fetchEquations } from "../../firestore";
import { auth } from "../../firebase";

type Favourite = {
  functionType: string;
  favourite: string;
  id: string;
  liked: boolean;
  latex_code?: string;
  img_binary?: string;
};

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const user = auth.currentUser;

  useEffect(() => { // TODO add thing to wait on getting latex and img and then passing to favourite card
    const getFavourites = async () => {
      if (user) {
        try {
          const fetchedFavourites = await fetchEquations(user.uid, true);
          const formattedFavourites = fetchedFavourites.map((eq) => ({
            id: eq.id,
            functionType: "enter title here...",
            favourite: eq.function,
            liked: true
          }));
          console.log(formattedFavourites);
          setFavourites(formattedFavourites);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      }
    };

    getFavourites();
  }, [user]);

  const handleDelete = (id: string) => {
    setFavourites(prevFavourites => prevFavourites.filter(fav => fav.id !== id));
  };

  return (
    <div>
      <Navbar title="Favourite commands" location="favourites" />
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col items">
          {favourites.map((fav, index) => (
            <FavouritesCard
              key={fav.id}
              index={index}
              functionType={fav.functionType}
              favourite={fav.favourite}
              id={fav.id}
              onDelete={handleDelete}
            />
          ))}
          {favourites.length === 0 && (
            <div className="flex justify-center text-xl italic">
              Uh oh, this is empty!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
