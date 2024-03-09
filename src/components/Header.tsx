import React from "react";
import { MdPets } from "react-icons/md";
import ThemeButton from "./ThemeBtn";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-14 flex items-center justify-around bg-orange-400 text-xl dark:bg-black">
      <h1 className="text-white items-center font-['GoryeongStrawberry'] cursor-pointer">
        <Link to="/" className="flex">
          Mung Meeting &nbsp;
          <MdPets />
        </Link>
      </h1>
      <ul className="flex w-96 justify-evenly items-center text-white cursor-pointer">
        <li className="mt-1">
          <ThemeButton />
        </li>
        <li>글쓰기</li>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>마이페이지</li>
      </ul>
    </header>
  );
}
