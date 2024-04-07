import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
  isLikes: boolean;

  // 함수, 함수 이벤트 타입 지정
  handleLikes: () => void;
  handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCopy: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isLikes,
  handleLikes,
  handleSortChange,
  handleKeyPress,
  handleClick,
  handleCopy,
}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full p-5 bg-slate-600 flex items-center justify-center">
        <div className="flex items-center h-8 bg-sky-600 rounded-xl dark:bg-gray-800">
          <select
            onChange={handleSortChange}
            name="searchFilter"
            id="searchFilter"
            className="bg-inherit text-white py-1 px-4 rounded-l-2xl appearance-none cursor-pointer outline-none text-center border-none mobile:px-1 "
          >
            <option value={"lastest"}>최신순</option>
            <option value={"oldest"}>오래된순</option>
            <option value={"likes"}>좋아요순</option>
            <option value={"comments"}>댓글순</option>
          </select>
          <input
            type="text"
            name="searchTxt"
            onChange={handleCopy}
            onKeyDown={handleKeyPress}
            className="py-1 px-4 placeholder:p-3 bg-white border-none outline-none mobile:placeholder:text-base"
            placeholder="메이트를 찾아볼까요?"
          />
          <button
            onClick={handleClick}
            className="bg-inherit text-white py-1 px-4 rounded-r-2xl mobile:hidden"
          >
            검색
          </button>
          <button
            onClick={handleClick}
            className="bg-inherit text-white py-1 px-4 rounded-r-2xl hidden mobile:inline"
          >
            <CiSearch />
          </button>
        </div>
        <button
          onClick={handleLikes}
          className="ml-3 bg-sky-600 py-1 px-4 text-white rounded-2xl dark:bg-gray-800 mobile:px-2"
        >
          <span
            className={
              isLikes
                ? "text-red-500 dark:text-yellow-400 hover:text-red-500 dark:hover:text-yellow-400"
                : "text-white"
            }
          >
            ♥
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
