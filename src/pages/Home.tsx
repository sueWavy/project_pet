import React, { useEffect } from "react";
import axios from "axios";
import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  // 데이터 전송 확인
  useEffect(() => {
    const form = new FormData();
    form.append("mode", "test");

    axios
      .post("http://43.201.39.118/api/main.php", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <SearchBar />
        <div className="flex-grow h-96 bg-slate-700">HOME</div>
      </section>
    </div>
  );
}
