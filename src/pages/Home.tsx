import { useGetData } from "../hooks/useGetData";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";
import ScrollTopBtn from "../components/ScrollTopBtn";

export default function Home() {
  const { data, isLoading, isError } = useGetData();

  // 페이지네이션 한 페이지에 보여줄 피드 갯수
  const itemsPerPage = 6;
  // 페이지네이션에 담을 데이터 서버에서 받아와서 받기
  const [feedData, setFeedData] = useState<any[]>([]);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (data) {
      setFeedData(data.list);
      setCurrentPage(1); // 다시 첫 페이지로 초기화
      scrollTop();
    }
  }, [data]);

  const scrollTop = () => {
    window.scrollTo({
      top: 50,
      behavior: "smooth",
    });
  };

  /** 페이지 변경 */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <ScrollTopBtn />
        <WeatherBar />
        <SearchBar />
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={feedData.length}
          pageRangeDisplayed={4}
          onChange={handlePageChange}
          innerClass="pagination flex justify-center space-x-3 items-center p-3 bg-white -mb-5 dark:bg-gray-700"
          itemClass="bg-sky-300 px-2 rounded-full dark:bg-slate-900"
          linkClass="text-white text-lg flex justify-center items-center"
          activeClass="bg-sky-500 px-2 rounded-full dark:bg-yellow-500"
          prevPageText="이전"
          nextPageText="다음"
          firstPageText="처음"
          lastPageText="마지막"
          hideFirstLastPages={true}
        />
        <div className="flex-col justify-center items-center text-center bg-white w-full dark:bg-gray-700 p-5">
          {currentItems.map((item) => (
            <div key={item.id} className="flex justify-center">
              <Feed key={item.id} data={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
