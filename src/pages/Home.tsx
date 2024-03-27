import { useGetData } from "../hooks/useGetData";
import { useEffect, useMemo, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";
import ScrollTopBtn from "../components/ScrollTopBtn";
import { useUserStore } from "../store/User";

export default function Home() {
  const key = useUserStore((state) => state.userKey);
  const { data, isLoading, isError } = useGetData();
  const [isLikes, setIsLikes] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("lastest");
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [searchCopy, setSearchCopy] = useState<string>("");
  const [feedData, setFeedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  /** 페이지 상단 스크롤 기능 */
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 처음 Home 진입시 상단으로 스크롤 업
  useEffect(() => {
    scrollTop();
  }, []);

  /** 좋아요 (즐겨찾기) 기능 */
  const handleLikes = () => {
    if (!key) {
      alert("즐겨찾기는 로그인 후 사용가능합니다.");
      return;
    }
    setIsLikes((prev) => !prev);
  };

  /** 검색 기능 */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTxt(e.currentTarget.value);
    }
  };

  const handleCopy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCopy(e.target.value);
  };

  const handleClick = () => {
    setSearchTxt(searchCopy);
  };

  /** 필터 옵션 변경 기능 */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  /** 피드 필터 기능 */
  const sortedFeedData = useMemo(() => {
    // 데이터 없으면 리턴
    if (!data || !data.list) return [];
    let sortedList = [...data.list];

    // 최신순 정렬
    if (sortOption === "lastest") {
      sortedList.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      // 오래된순 정렬
    } else if (sortOption === "oldest") {
      sortedList.sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      );
      // 좋아요순 정렬
    } else if (sortOption === "likes") {
      sortedList.sort((a, b) => b.likes - a.likes);
      // 댓글순 정렬
    } else if (sortOption === "comments") {
      sortedList.sort((a, b) => b.comments.length - a.comments.length);
    }
    return sortedList;
  }, [data, sortOption]);

  // 한 페이지에 보여줄 피드 수
  const itemsPerPage = 6;

  useEffect(() => {
    if (data) {
      setFeedData(data.list); // 피드 데이터 저장
      setCurrentPage(1); // 현재 페이지 1번으로 설정
    }
  }, []);

  /** 페이지네이션 이동 기능 */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedFeedData.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <section className="relative w-3/4 justify-center flex-col items-center l:w-full">
        <ScrollTopBtn />
        <WeatherBar />
        <SearchBar
          isLikes={isLikes}
          handleLikes={handleLikes}
          handleSortChange={handleSortChange}
          handleKeyPress={handleKeyPress}
          handleClick={handleClick}
          handleCopy={handleCopy}
        />
        <CustomPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItemsCount={sortedFeedData.length}
          onPageChange={handlePageChange}
        />
        <div className="flex-col justify-center items-center text-center bg-white w-full dark:bg-gray-700 p-5">
          {!isLikes &&
            currentItems
              .filter((item) =>
                item.title.toLowerCase().includes(searchTxt.toLowerCase())
              )
              .map((item) => (
                <div key={item.id} className="flex justify-center">
                  <Feed key={item.id} data={item} />
                </div>
              ))}
          {isLikes &&
            currentItems
              .filter(
                (item) =>
                  item.like &&
                  item.title.toLowerCase().includes(searchTxt.toLowerCase())
              )
              .map((item) => (
                <div key={item.id} className="flex justify-center">
                  <Feed key={item.id} data={item} />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
