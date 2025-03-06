import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const getWeatherInfo = async (city: string) => {
  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: { key: "37356d85e8454a36b8a70054250403", q: city },
  });
  return data;
};

const WeatherForm: React.FC = () => {
  const [city, setCity] = useState("Gopalganj");
  const [inputValue, setInputValue] = useState();
  const [videoPath, setVideoPath] = useState("/src/assets/video/weather-video.mp4");

  const { data, refetch } = useQuery({
    queryFn: () => getWeatherInfo(city),
    queryKey: ["weather-data", city],
    enabled: !!city, // Only fetch if city is defined
  });
  console.log(data);

  // Update video background when new weather data is available
  useEffect(() => {
    if (data?.current?.condition?.text) {
      let path = "/src/assets/video/partlycloudy.mp4"; // Default path

      if (data.current.condition.text.includes("Partly cloudy")) {
        path = "/src/assets/video/partlycloudy.mp4";
      } else if (data.current.condition.text.includes("Rain")) {
        path = "/src/assets/video/rain.mp4";
      } else if (data.current.condition.text.includes("Sunny")) {
        path = "/src/assets/video/sunny.mp4";
      } else if (data.current.condition.text.includes("Cloudy")) {
        path = "/src/assets/video/cloudy.mp4";
      } else if (data.current.condition.text.includes("Overcast")) {
        path = "/src/assets/video/overcast.mp4";
      } else if (data.current.condition.text.includes("Heavy snow")) {
        path = "/src/assets/video/snowy.mp4";
      } else if (data.current.condition.text.includes("Light snow showers")) {
        path = "/src/assets/video/light-snow-shower.mp4";
      } else if (data.current.condition.text.includes("snow")) {
        path = "/src/assets/video/light-snow.mp4";
      } else if (data.current.condition.text.includes("Freezing fog")) {
        path = "/src/assets/video/freezing-fog.mp4";
      } else if (data.current.condition.text.includes("Mist")) {
        path = "/src/assets/video/mist2.mp4";
      } else if (data.current.condition.text.includes("Fog")) {
        path = "/src/assets/video/Fogg.mp4";
      } else if (data.current.condition.text.includes("Patchy rain")) {
        path = "/src/assets/video/patchy-rain.mp4";
      } else if (data.current.condition.text.includes("Light rain")) {
        path = "/src/assets/video/light-rain.mp4";
      } else if (data.current.condition.text.includes("freezing rain")) {
        path = "/src/assets/video/freezing-rain.mp4";
      } else if (data.current.condition.text.includes("Heavy rain")) {
        path = "/src/assets/video/heavy-rain.mp4";
      } else if (data.current.condition.text.includes("Moderate rain")) {
        path = "/src/assets/video/moderate-rain.mp4";
      } else if (data.current.condition.text.includes("Blizzard")) {
        path = "/src/assets/video/Blizzard.mp4";
      } else if (
        data.current.condition.text.includes("Thunder") ||
        data.current.condition.text.includes("Patchy light rain in area with thunder") ||
        data.current.condition.text.includes("heavy rain")
      ) {
        path = "/src/assets/video/moderate-rain-thunder.mp4";
      } else if (data.current.condition.text.includes("thunder")) {
        path = "/src/assets/video/thunderstorm.mp4";
      } else if (data?.current?.condition?.text?.includes("Rain")) {
        path = "/src/assets/video/rainy.mp4";
      }

      setVideoPath(path);
    }
  }, [data]); // Runs when `data` updates

  // Handle form submission
  const submitHandler = () => {
    setCity(inputValue); // Update city state
    refetch(); // Manually trigger refetch of data
    setInputValue("");
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-transparent p-4">
      {/* Background video */}
      <video key={videoPath} className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src={videoPath} type="video/mp4" />
      </video>

      <div className="px-12 py-4 text-center backdrop-blur-xl rounded-xl">
        {/* <h1 className="text-black">hello</h1> */}
        {data && (
          <div>
            <div className="flex justify-between items-center gap-10 mb-6 ">
              <div className="flex flex-col gap-0">
                <div className=" text-2xl font-semibold mt-1.5">
                  {data.current.temp_c} <span className="text-white text-4xl">°C</span>
                </div>
              </div>
              <div> <img src={data.current.condition.icon} alt="weather icon" /></div>
              <div>
                <h1>{data?.location.name}</h1>
                <h1>{data?.location.country}</h1>
              </div>
            </div>
            <div className="m-5">
              <h2>{data.current.condition.text} </h2>
            </div>
          </div>
        )}

        <Form onFinish={submitHandler}>
          <Space.Compact style={{ width: "80%" }}>
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder="Enter your location"
            />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space.Compact>
        </Form>
      </div>
    </div>
  );
};

export default WeatherForm;
