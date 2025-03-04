import { Button, Input, Space } from "antd";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

type Props = {
  city: string;
};
const getWeatherInfo = async (city: string) => {
  // const {data} = await axios.get('http://api.weatherapi.com/v1/current.json?key=37356d85e8454a36b8a70054250403&q=Paris')
  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: { key: "37356d85e8454a36b8a70054250403", q: city },
  });
  return data;
};

const WeatherForm: React.FC<Props> = () => {
  const [city, setCity] = useState("New York");
  const { data } = useQuery({
    queryFn: () => getWeatherInfo(city),
    queryKey: ["weather-data"],
  });
  console.log(data);

  return (
    <div>
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Input your Location" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </div>
  );
};

export default WeatherForm;
