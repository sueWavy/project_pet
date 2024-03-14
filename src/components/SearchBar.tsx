import React from "react";

export default function SearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full p-5 bg-slate-600 flex items-center justify-center"
        onSubmit={handleSubmit}
      >
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
          <span className="hidden sm:inline hover:text-red-500">♥</span>
          <span className="sm:hidden hover:text-red-">관심 메이트만 보기</span>
        </button>
      </form>
    </div>
  );
}
