import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";
import { useEffect } from "react";
import { useUserStore } from "../store/User";
import axios from "axios";
import { useGetData } from "../hooks/useGetData";

export default function Home() {
  const token = useUserStore((state) => state.userKey);
  const { data, isLoading, isError } = useGetData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log("query 확인 : ", data);

  // useEffect(() => {
  //   axios
  //     .post(
  //       "http://43.201.39.118/api/feed",
  //       {
  //         mode: "list",
  //       },
  //       {
  //         headers: {
  //           Authorization: "bearer " + token,
  //         },
  //       }
  //     )
  //     .then((res) => console.log("피드 받아오기", res));
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <SearchBar />
        {/* <div className="flex justify-center bg-white w-full p-5">
          {mockData.map((mockData) => (
            <Feed key={mockData.id} data={mockData} />
          ))}
        </div> */}
      </section>
    </div>
  );
}
