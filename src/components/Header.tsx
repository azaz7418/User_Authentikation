import { useAppSelector } from "../redux/store";
import { useState, useEffect } from "react";
import moment from "moment";

const Header = () => {
  const { timeZone, name, country } = useAppSelector((state) => state.image);

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  

  useEffect(() => {
    const updateTime = () => {
      const currentDate = moment().tz(timeZone)?.format("YYYY-MM-DD");
      const currentTime = moment().tz(timeZone)?.format("hh:mm:ss A");
      setDate(currentDate); // Set the date separately
      setTime(currentTime); // Set the time separately
    };
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeZone]);

  return (
    <div className="flex justify-between items-center text-white w-full backdrop-blur-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-5">
      <div>
        <h1 className="text-sm font-semibold font-[Times New Roman]">{time && time}</h1>
        <h1 className="text-sm font-semibold font-[Times New Roman]">{date && date}</h1>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold font-[Times New Roman]">WeatherInfo</h1>
      </div>
      <div className="text-right">
        <h2 className="text-sm font-semibold font-[Times New Roman]">{name}</h2>
        <h2 className="text-lg font-semibold font-[Times New Roman]">{country}</h2>
      </div>
    </div>
  );
};

export default Header;
