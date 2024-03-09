import React, { useEffect } from "react";
import axios from "axios";
import WeatherBar from "../components/weather/WeatherBar";

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
    <div>
      <WeatherBar />
      <h2>HOME</h2>
    </div>
  );
}
