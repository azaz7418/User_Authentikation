import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

type Props = {
  city: string;
};

const getWeatherInfo = async (city: string) => {
  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: { key: "37356d85e8454a36b8a70054250403", q: city },
  });
  return data;
};

const WeatherForm: React.FC<Props> = () => {
  const [city, setCity] = useState("New York");
  const [inputValue, setInputValue] = useState("");

  const { data } = useQuery({
    queryFn: () => getWeatherInfo(city),
    queryKey: ["weather-data", city],
  });
console.log(data);

  const submitHandler = () => {
    setCity(inputValue); // This will automatically trigger refetch due to queryKey dependency
  };

  return (
    <div className="flex justify-center items-center h-screen bg-amber-700 p-4">
      <video src="/src/assets/video/weather-video.mp4" loop autoPlay></video>
      <div className="p-2.5 text-white text-center">
        {data && (
          <div>
            <img src={data.current.condition.icon} alt="weather icon" />
            <h2>{data.current.condition.text}</h2>
          </div>
        )}

        <Form onFinish={submitHandler}>
          <Space.Compact style={{ width: "100%" }}>
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
