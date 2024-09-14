import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import RecentsCard from "./RecentsCard";

const data = {
  recents: [
    {
      text: "\\(x^2 + y^2 = z^2\\)",
      liked: true,
    },
    {
      text: "\\(\\sum_{k=1}^\\infty \\frac{1}{2k^2}\\)",
      liked: false,
    },
    {
      text: "\\(x + y = z\\)",
      liked: false,
    },
  ],
};

type Recent = {
  text: string;
  liked: boolean;
};

const RecentsPage = () => {
  const [recents, setRecents] = useState<Recent[]>([]); // change type later, create a models folder and make it the type

  const getRecents = () => {
    setRecents(data.recents);
  };

  useEffect(() => {
    getRecents();
  }, []);

  return (
    <div>
      <Navbar title="Recently used" location="recents"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col">
          {recents.map((recent, index) => (
            <RecentsCard
              key={index}
              text={recent.text}
              liked={recent.liked}
              index={index}
            ></RecentsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentsPage;
