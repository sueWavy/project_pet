import { useEffect, useState } from "react";
import CitySelector from "./CitySelector";
import Loader from "./Loader";
import axios from "axios";

interface WeatherData {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  clouds: { all: number };
}

const WeatherBar: React.FC = () => {
  const apiKey: any | undefined = import.meta.env
    .VITE_REACT_APP_WEATHER_API_KEY;

  const [data, setData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("Seoul");

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&lang=kr&appid=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData>(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (apiKey) {
      fetchData();
    }
  }, [selectedCity, apiKey, url]);

  if (data === null) {
    // 데이터가 도착하지 않았을 때
    return <Loader />;
  }

  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed },
    clouds: { all },
  } = data;

  const list_border = "border-r pr-3 dark:border-black sm:border-none";

  // 절대온도 -> 섭씨온도로 변경
  const celsiusTemp = Math.round(((temp - 273.15) * 10) / 10);

  // 날씨 아이콘 코드
  const weatherIconCode = data.weather[0].icon;

  // 아이콘 이미지 URL
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  return (
    <section className="relative overflow-hidden pb-2 bg-green-400  dark:bg-yellow-200 flex-col items-center justify-center list-none font-['SejonghospitalBold'] sm:flex-wrap sm:text-xs sm:p-1">
      {/* bg-animation */}
      <div className="wave -one"></div>
      <div className="wave -two"></div>
      <div className="wave -three"></div>

      {/* contents */}
      <div className="title">
        <div className="flex justify-center items-center sm:flex-col">
          <div className="flex items-center text-xl dark:text-black pt-3 sm:p-0">
            오늘의 산책 날씨
            <CitySelector
              selectedCity={selectedCity}
              handleCityChange={handleCityChange}
            />
          </div>
          <div className="flex items-center mt-3 dark:text-black sm:pb-3">
            <img
              src={weatherIconUrl}
              alt="Weather Icon"
              className="w-12 h-12"
            />
            <p className="text-lg sm:hidden">{weather[0].description}</p>
          </div>
        </div>
        <div className="flex pb-2 space-x-3 text-sm justify-center dark:text-black sm:hidden">
          <li className={list_border}>온도:{celsiusTemp}°C</li>
          <li className={list_border}>
            체감온도:{Math.round(feels_like - 273.15)}°C
          </li>
          <li className={list_border}>습도:{humidity}%</li>
          <li className={list_border}>바람:{speed}m/s</li>
          <li>구름양:{all}%</li>
        </div>
      </div>
    </section>
  );
};

export default WeatherBar;
