import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import { useGetData } from "../hooks/useGetData";
import Map from "../components/Map";
import Feed from "../components/Feed";

export default function Home() {
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Seoul",
    weekday: "long", // Specify the format for weekday
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const koreanDate: string = currentDate.toLocaleString("ko-KR", options);

  const mockData = [
    {
      id: 1,
      writer: "user1",
      date: koreanDate,
      title: "글 제목 1",
      profileImg:
        "https://png.pngtree.com/thumb_back/fh260/background/20230609/pngtree-three-puppies-with-their-mouths-open-are-posing-for-a-photo-image_2902292.jpg",
      feedImg:
        "https://image.dongascience.com/Photo/2016/12/14806739535799.jpg",
      address: "서울 관악구 관악로 1",
      openMap: false,
      time: "13:22",
      content:
        "나랑 산책할 사람 관악구 아드레이아에 마나서 제 진돗개 댕순이와 함께 미친듯이 달릴 사람을 찾습니다, 애가 대형견인데 체력은 그리 좋지 않아서 빡세지는 않아요!",
      likes: 1,
      contents: [
        {
          id: 1,
          writer: "user2",
          content: "저요 저요",
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <WeatherBar />
        <SearchBar />
        <div className="flex justify-center bg-white w-full p-5">
          {mockData.map((mockData) => (
            <Feed key={mockData.id} data={mockData} />
          ))}
        </div>
      </section>
    </div>
  );
}
