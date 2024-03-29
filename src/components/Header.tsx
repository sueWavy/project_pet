import { useUserStore } from "../store/User";
import { Link, useNavigate } from "react-router-dom";
import { MdPets } from "react-icons/md";
import ThemeButton from "./ThemeBtn";
import useLogin from "../hooks/useLogin";

// 중복 스타일
const hoverStyle = "cursor-pointer hover:text-2xl";

export default function Header() {
  const { logout } = useLogin();

  const isLogin = useUserStore((state) => state.isLogin);
  const userData = useUserStore((state) => state);
  const userProfile = useUserStore((state) => state.profileImg);

  const navigate = useNavigate();

  /** 글쓰기로 이동 기능 */
  const handleWrite = () => {
    if (!isLogin) {
      alert("로그인 후 이용가능한 기능입니다");
      navigate("/login");
    } else {
      navigate("/write");
    }
  };

  /** 마이페이지로 이동 기능 */
  const handleMyPage = () => {
    if (!isLogin) {
      alert("로그인 후 이용가능한 기능입니다");
      navigate("/login");
    } else {
      navigate(`mypage/:${userData.userId}`);
    }
  };

  return (
    <header className="relative w-full h-14 flex items-center justify-around bg-brand text-xl dark:bg-black sm:flex-col sm:h-20">
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
        {!isLogin ? (
          <li className={hoverStyle}>
            <Link to="/login">로그인</Link>
          </li>
        ) : (
          <li className={`${hoverStyle} flex items-center`} onClick={logout}>
            <img src={userProfile} className="w-6 h-6 rounded-full mr-2" />
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
