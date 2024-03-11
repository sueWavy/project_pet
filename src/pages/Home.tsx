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
    <div className="w-full h-full flex justify-center items-center ">
      <section className="w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <div className="flex justify-center items-center">
          <form className="w-full p-5 bg-slate-600 flex items-center justify-center">
            <div className="flex items-center h-8 bg-sky-600 rounded-xl dark:bg-gray-800">
              <select
                name="searchFilter"
                id="searchFilter"
                className="bg-inherit text-white py-1 px-4 rounded-l-2xl appearance-none cursor-pointer outline-none text-center"
              >
                <option value={"lastest"}>최신순</option>
                <option value={"oldest"}>오래된순</option>
                <option value={"likes"}>좋아요순</option>
              </select>
              <input
                type="text"
                className="py-1 px-4 placeholder:p-3 bg-white border-none outline-none"
                placeholder="메이트를 찾아볼까요?"
              />
              <button className="bg-inherit text-white py-1 px-4 rounded-r-2xl ">
                검색
              </button>
            </div>
            <button className="ml-3 bg-sky-600 py-1 px-4 text-white rounded-2xl dark:bg-gray-800">
              <span className="hidden sm:inline">♥</span>
              <span className="sm:hidden">관심 메이트만 보기</span>
            </button>
          </form>
        </div>
        <div className="flex-grow h-96 bg-slate-700">HOME</div>
      </section>
    </div>
  );
}
