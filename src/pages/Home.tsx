import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";
import { useGetData } from "../hooks/useGetData";

export default function Home() {
  const { data, isLoading, isError } = useGetData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  console.log("query 확인 : ", data);

  if (data) {
    console.log("query list 확인 : ", data.list);
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <SearchBar />
        <div className="flex-col justify-center items-center text-center bg-white w-full p-5">
          {data &&
            data.list.map((it) => (
              <div key={it.id} className="flex justify-center">
                <Feed key={it.id} data={it} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
