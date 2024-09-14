import Navbar from "../../components/Navbar";
import RecentsCard from "./RecentsCard";

const data = {
  recents: [
    "\\(x^2 + y^2 = z^2\\)",
    "\\sum_{k=1}^\\infty \\frac{1}{2k}^2}",
    "\\(x + y = z\\)",
  ],
};

const RecentsPage = () => {
  return (
    <div>
      <Navbar title="Recently used"></Navbar>
      <div className="container mx-auto p-5 flex flex-col items-center">
        <div className="w-1/2 flex flex-col">
          {data.recents.map((recent, index) => (
            <RecentsCard
              key={index}
              recent={recent}
              index={index}
            ></RecentsCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentsPage;
