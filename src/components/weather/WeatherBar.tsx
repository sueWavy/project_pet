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
    console.log("데이터 나와라", url);
    return <Loader />;
  }

  const {
    weather,
    main: { temp, feels_like, humidity },
    wind: { speed },
    clouds: { all },
  } = data;

  // 절대온도 -> 섭씨온도로 변경
  const celsiusTemp = Math.round(((temp - 273.15) * 10) / 10);

  // 날씨 아이콘 코드
  const weatherIconCode = data.weather[0].icon;

  // 아이콘 이미지 URL
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

  return (
    <section className="flex-col items-center justify-center list-none bg-slate-300 font-['SejonghospitalBold'] sm:flex-wrap sm:text-xs sm:p-1">
      <div className="flex justify-center">
        <div className="flex items-center text-lg">
          오늘의 산책 날씨
          <CitySelector
            selectedCity={selectedCity}
            handleCityChange={handleCityChange}
          />
        </div>
        <div className="flex items-center">
          <img src={weatherIconUrl} alt="Weather Icon" className="w-12 h-12" />
          <p className="text-lg">{weather[0].description}</p>
        </div>
      </div>
      <div className="flex ml-2 space-x-3 text-sm justify-center ">
        <li>온도 : {celsiusTemp}°C</li>
        <li>체감 온도 : {Math.round(feels_like - 273.15)}°C</li>
        <li>습도 : {humidity}%</li>
        <li>바람 : {speed}m/s</li>
        <li>구름 양 : {all}%</li>
      </div>
    </section>
  );
};

export default WeatherBar;
