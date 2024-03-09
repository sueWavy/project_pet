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
    <div className="w-full h-full flex-col justify-center items-center ">
      <WeatherBar />
      <div className="flex justify-center items-center">
        <form className="w-full h-20 p-5 bg-slate-600 flex items-center justify-center">
          <select
            name="searchFilter"
            id="searchFilter"
            className="h-7 bg-orange-500 text-white px-2"
          >
            <option value={"lastest"}>최신순</option>
            <option value={"oldest"}>예전순</option>
            <option value={"likes"}>좋아요순</option>
          </select>
          <input
            type="text"
            className="h-7 placeholder:p-3"
            placeholder="메이트를 찾아볼까요?"
          />
          <button className="h-7 bg-orange-500 px-2 text-white">검색</button>
        </form>
      </div>
      <div className="flex-grow h-96 bg-slate-700">HOME</div>
    </div>
  );
}
