import { useGetData } from "../hooks/useGetData";
import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "../store/User";
import CustomPagination from "../components/CustomPagination";
import WeatherBar from "../components/weather/WeatherBar";
import SearchBar from "../components/SearchBar";
import ScrollTopBtn from "../components/ScrollTopBtn";
import noFeed from "../assets/noFeed.mp4";
import Feed from "../components/Feed";
import usePageTitle from "../hooks/usePageTitle";

export default function Home() {
  const { data, isLoading, isError } = useGetData();
  const key = useUserStore((state) => state.userKey);

  const [isLikes, setIsLikes] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("lastest");
  const [searchTxt, setSearchTxt] = useState<string>("");
  const [searchCopy, setSearchCopy] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  usePageTitle("멍미팅");

  /** 좋아요(즐겨찾기) 기능 */
  const handleLikes = () => {
    if (!key) {
      alert("로그인 후 이용가능한 기능입니다");
      return;
    }
    setIsLikes((prev) => !prev);
  };

  /** 필터 변경 기능 */
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  /** 검색시 엔터로 검색 */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTxt(e.currentTarget.value);
    }
  };

  /** 검색시 마우스로 검색하기 위해(검색어 카피) */
  const handleCopy = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCopy(e.target.value);
  };

  /** 검색시 마우스로 검색 */
  const handleClick = () => {
    setSearchTxt(searchCopy);
  };

  // 필터 및 정렬된 데이터
  const filteredAndSortedData = useMemo(() => {
    if (!data || !data.list) return [];
    let filteredAndSorted = [...data.list];

    // 검색어 적용한 데이터
    filteredAndSorted = filteredAndSorted.filter((item) =>
      item.title.toLowerCase().includes(searchTxt.toLowerCase())
    );

    // 좋아요(즐겨찾기) 적용한 데이터
    // isLikes 상태면 위에 검색어 적용한 데이터에서 like값이 true인지 한번 더 필터링
    if (isLikes) {
      filteredAndSorted = filteredAndSorted.filter((item) => item.like);
    }

    // 정렬 옵션
    // 최신순
    if (sortOption === "lastest") {
      filteredAndSorted.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
      // 오래된 순
    } else if (sortOption === "oldest") {
      filteredAndSorted.sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      );
      // 좋아요 순
    } else if (sortOption === "likes") {
      filteredAndSorted.sort((a, b) => b.likes - a.likes);
      // 댓글 순
    } else if (sortOption === "comments") {
      filteredAndSorted.sort((a, b) => b.comments.length - a.comments.length);
    }

    return filteredAndSorted;
  }, [data, isLikes, searchTxt, sortOption]);

  /** 페이지네이션 핸들러 */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 검색어, 좋아요 핸들러
  useEffect(() => {
    setCurrentPage(1); // 페이지 1로 변경
  }, [searchTxt, isLikes]);

  // 페이지네이션 설정
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  /** 스크롤 탑 */
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 페이지 입장시 상단으로
  useEffect(() => {
    scrollTop();
  }, []);

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
          totalItemsCount={filteredAndSortedData.length}
          onPageChange={handlePageChange}
        />
        <div className="flex-col justify-center items-center text-center bg-white w-full dark:bg-gray-700 p-5">
          {currentItems.length === 0 && (
            <div className="relative">
              <video
                className="object-cover rounded-2xl"
                src={noFeed}
                autoPlay
                loop
                muted
              />
              <span className="absolute top-20 left-1/2 transform -translate-x-1/2  font-['YEONGJUPunggiGinsengTTF'] bg-white text-2xl p-5 rounded-full opacity-80 md:text-base sm:text-xs">
                검색어에 일치하거나 좋아요한 글이 없어요
              </span>
            </div>
          )}
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
