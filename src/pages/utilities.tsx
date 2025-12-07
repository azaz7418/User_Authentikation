import axios from "axios";

export const getWeatherInfo = async (city: string) => {
  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: { key: "37356d85e8454a36b8a70054250403", q: city },
  });
  console.log(data);
  return data;
  
};
