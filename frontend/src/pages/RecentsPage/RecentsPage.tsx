import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RecentsCard from "./RecentsCard";
import { auth } from '../../firebase'; 
import { fetchEquations } from "../../firestore";

type Recent = {
  text: string;
  liked: boolean;
};

const RecentsPage = () => {
  const [recents, setRecents] = useState<Recent[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const getRecents = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const equations = await fetchEquations(user.uid, false);
          setRecents(equations.map(eq => ({
            text: eq.equation,
            liked: eq.liked || false
          })));
        } catch (error) {
          console.error("Error fetching recents:", error);
        }
      } else {
        console.error("No user logged in");
      }
      setLoading(false);
    };

    getRecents();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <Navbar title="Recently used" location="recents" />
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col">
          {recents.map((recent, index) => (
            <RecentsCard
              key={index}
              text={recent.text}
              liked={recent.liked}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentsPage;
