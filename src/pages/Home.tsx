import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import { useGetData } from "../hooks/useGetData";

export default function Home() {
  // 데이터 전송 테스트
  const {
    data,
    isLoading,
    isError,
    error,
  }: {
    data: any | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  } = useGetData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <SearchBar />
        <div className="flex-grow h-96 bg-white">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}
