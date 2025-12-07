import { Button, Form, Input, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeatherLogic } from "./WeatherFunction";

const WeatherForm: React.FC<{ city?: string }> = ({ city: initialCity }) => {
  const [temp, setTemp] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");

  const navigate = useNavigate();
  const { data, time, date, setCity, refetch } = useWeatherLogic(initialCity);

  const tempHandler = (isCelsius: boolean) => {
    setTemp(isCelsius);
  };

  const submitHandler = () => {
    if (inputValue.trim()) {
      setCity(inputValue);
      refetch();
      navigate(`/${inputValue}`);
    }
    setInputValue("");
  };

  return (
    <div>
      <div className="relative flex justify-center items-center h-screen bg-transparent p-4">
        <div className="px-12 py-4 text-center backdrop-blur-xl bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-xl">
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
                <h3>
                  {date} {time}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-white">
                <div className="text-center">
                  <p className="text-sm opacity-80">Humidity</p>
                  <p className="text-lg font-semibold">{data.current.humidity}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Wind</p>
                  <p className="text-lg font-semibold">{data.current.wind_kph} km/h</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Pressure</p>
                  <p className="text-lg font-semibold">{data.current.pressure_mb} mb</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Visibility</p>
                  <p className="text-lg font-semibold">{data.current.vis_km} km</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">UV Index</p>
                  <p className="text-lg font-semibold">{data.current.uv}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-80">Feels Like</p>
                  <p className="text-lg font-semibold">
                    {temp ? data.current.feelslike_c : data.current.feelslike_f}°{temp ? "C" : "F"}
                  </p>
                </div>
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
