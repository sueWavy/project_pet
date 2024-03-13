import ThemeButton from "./ThemeBtn";
import { MdPets } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const hoverStyle = "cursor-pointer hover:text-2xl";

export default function Header() {
  const { logout } = useLogin();
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(isToken);

  const handleWrite = () => {
    if (isToken === null) {
      alert("로그인 후 이용가능한 기능입니다");
    } else {
      navigate("/write");
    }
  };

  const handleMyPage = () => {
    if (isToken === null) {
      alert("로그인 후 이용가능한 기능입니다");
    } else {
      navigate(`mypage/:${isToken}`);
    }
  };

  return (
    <header className="w-full h-14 flex items-center justify-around bg-brand text-xl dark:bg-black sm:flex-col sm:h-20">
      <h1
        className={`text-white items-center font-['YEONGJUPunggiGinsengTTF'] sm:pt-2 ${hoverStyle}`}
      >
        <Link to="/" className="flex">
          <div className="flex items-center">
            Mung Meeting &nbsp;
            <MdPets />
          </div>
        </Link>
      </h1>
      <ul className="flex w-96 justify-evenly items-center text-white cursor-pointer">
        <li className={`mt-1 ${hoverStyle}`}>
          <ThemeButton />
        </li>
        <li className={hoverStyle} onClick={handleWrite}>
          글쓰기
        </li>
        {isToken === null ? (
          <li className={hoverStyle}>
            <Link to="/login">로그인</Link>
          </li>
        ) : (
          <li className={hoverStyle} onClick={logout}>
            로그아웃
          </li>
        )}
        <li className={hoverStyle} onClick={handleMyPage}>
          마이페이지
        </li>
      </ul>
    </header>
  );
}
