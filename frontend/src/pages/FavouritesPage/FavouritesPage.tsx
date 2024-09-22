import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import FavouritesCard from "./FavouritesCard";
import { fetchEquations } from "../../firestore";
import { auth } from "../../firebase";
import Spinner from "../../components/Spinner";

type Favourite = {
  functionType: string;
  favourite: string;
  id: string;
  liked: boolean;
  latex: string;
  img: string;
};

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { 
    const getFavourites = async () => {
      if (user) {
        try {
          const fetchedFavourites = await fetchEquations(user.uid, true);
          const formattedFavourites = await fetchedFavourites.map((eq) => ({
            id: eq.id,
            functionType: eq.function,
            favourite: eq.function,
            liked: true,
            latex: eq.latex,
            img: eq.img
          }));
          console.log(formattedFavourites);
          setFavourites(formattedFavourites);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      }
      setLoading(false);
    };

    getFavourites();
  }, [user]);

  const handleDelete = (id: string) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.id !== id)
    );
  };

  return (
    <div>
      <Navbar title="Favourites" location="favourites" />
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
              latex={fav.latex}
              img={fav.img}
            />
          ))}
          {favourites.length === 0 && (
            <div className="flex justify-center text-xl italic">
              {loading ? <Spinner></Spinner> : "Uh oh, this is empty!"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
