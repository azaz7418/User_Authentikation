import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import moment from "moment-timezone";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { countryToTimeZone } from "../../ConstantData";
import { setVideo, setTimeZone, setLocation } from "../../redux/features/videoPath";
import { useAppDispatch } from "../../redux/store";

const getWeatherInfo = async (city: string) => {
  const { data } = await axios.get("http://api.weatherapi.com/v1/current.json", {
    params: { key: "37356d85e8454a36b8a70054250403", q: city },
  });
  return data;
};

const WeatherForm: React.FC = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [temp, setTemp] = useState(true);
  const [city, setCity] = useState("Khulna");
  const [inputValue, setInputValue] = useState<string>("");
  const [videoPath, setVideoPath] = useState("/src/assets/video/weather-video.mp4");

  const dispatch = useAppDispatch();

  const { data, refetch } = useQuery({
    queryFn: () => getWeatherInfo(city),
    queryKey: ["weather-data", city],
    enabled: !!city,
  });
console.log(data);

  // Extracted variables before using them
  const name = data?.location?.name;
  const country = data?.location?.country;

  useEffect(() => {
    if (country && countryToTimeZone[country]) {
      const timeZone = countryToTimeZone[country];
      const updateTime = () => {
        setDate(moment().tz(timeZone).format("YYYY-MM-DD"));
        setTime(moment().tz(timeZone).format("HH:mm:ss"));
      };

      dispatch(setTimeZone({ timeZone }));
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    } else {
      setTime(time);
      setDate(date);
    }
  }, [country]);

  useEffect(() => {
    if (data?.current?.condition?.text) {
      let path = "/src/assets/video/partlycloudy.mp4"; // Default path

      const conditionText = data.current.condition.text.toLowerCase();

      if (conditionText.includes("partly cloudy")) {
        path = "/src/assets/video/partlycloudy.mp4";
      } else if (conditionText.includes("rain")) {
        path = "/src/assets/video/rain.mp4";
      } else if (conditionText.includes("sunny")) {
        path = "/src/assets/video/sunny.mp4";
      } else if (conditionText.includes("cloudy")) {
        path = "/src/assets/video/cloudy.mp4";
      } else if (conditionText.includes("overcast")) {
        path = "/src/assets/video/overcast.mp4";
      } else if (conditionText.includes("snow")) {
        path = "/src/assets/video/light-snow.mp4";
      } else if (conditionText.includes("thunder")) {
        path = "/src/assets/video/thunderstorm.mp4";
      }

      dispatch(setVideo({ path }));
      dispatch(setLocation({ name, country }));
      setVideoPath(path);
    }
  }, [data]);

  const tempHandler = (isCelsius: boolean) => {
    setTemp(isCelsius);
  };

  const submitHandler = () => {
    if (inputValue.trim()) {
      setCity(inputValue);
      refetch();
    }
    setInputValue("");
    // console.log(data);
    
  };

  return (
    <div>
      <div className="relative flex justify-center items-center h-screen bg-transparent p-4">
        <div className="px-12 py-4 text-center backdrop-blur-xl backdrop-brightness-75 backdrop-contrast-75 rounded-xl">
          {data && (
            <div>
              <div className="flex justify-between items-center gap-10 mb-6">
                <div className="shadow-2xs">
                  <img src={data.current.condition.icon} alt="weather icon" />
                </div>
                <div className="flex flex-col gap-0">
                  <div className="text-2xl font-semibold mt-1.5 flex">
                    <h1>{temp ? data.current.temp_c : data.current.temp_f}</h1>
                    <span className="flex justify-center gap-2 align-super ml-3">
                      <span
                        onClick={() => tempHandler(true)}
                        className={`text-sm cursor-pointer ${temp ? "text-white font-semibold" : "text-gray-500"}`}
                      >
                        °C
                      </span>
                      <div className="text-sm">|</div>
                      <span
                        onClick={() => tempHandler(false)}
                        className={`text-sm cursor-pointer ${!temp ? "text-white font-semibold" : "text-gray-500"}`}
                      >
                        °F
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="m-5 font-medium text-white">
                <h2>{data.current.condition.text}</h2>
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
    </div>
  );
};

export default WeatherForm;
