import WeatherForm from "./weather/WeatherForm";
import { useParams } from "react-router-dom";

// const info=[
//   {
//     name:"azaz",
//     id:23,
//     isStudent:true
//   }
// ]
const Home = () => {
  const { city } = useParams();
  return (
    <div className="h-full w-full">
      <WeatherForm city={city} />
    </div>
  );
};

export default Home;
