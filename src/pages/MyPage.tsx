import { useGetData } from "../hooks/useGetData";
import { useUserStore } from "../store/User";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

import noProfile from "../assets/noProfile.jpg";
import EditInfo from "../components/EditInfo";
import useProfile from "../hooks/useProfile";
import AddPet from "../components/AddPet";

export default function MyPage() {
  const userData = useUserStore((state) => state);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const { data } = useGetData();

  const handleEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  const handleAdd = () => {
    setOpenAdd((prev) => !prev);
  };

  const { deletePet, getUserData } = useProfile();

  // 유저 정보 업데이트하기
  useEffect(() => {
    getUserData(userData.userKey);
  }, [data, userData.userKey]);

  const { email, name, profileImg, feed, comment, join, pets, loginOf } =
    useUserStore();

  /** 생년월일 나이로 바꾸기 */
  const birthToAge = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 활동량(작성글+작성댓글)
  const activity = feed + comment;

  // 활동량에 따라 등급 나누기
  const acticityLevel = () => {
    if (activity < 9) {
      return "활동량이 낮아요 🥲";
    } else if (activity > 10 || activity == 19) {
      return "활동하기 시작했어요 🙂";
    } else if (activity > 19 || activity == 20) {
      return "활동 중이에요 😊";
    } else if (activity > 29 || activity == 30) {
      return "활발하게 이용해요 🥰";
    } else if (activity > 39) {
      return "멍미팅 커뮤니터 😎";
    }
    return;
  };

  // 중복 스타일
  const infoBox =
    "h-14 flex justify-center items-center text-white text-xl font-bold";
  const infoUl =
    "bg-white dark:bg-gray-700 dark:text-white  rounded-xl w-96 shadow-2xl text-lg h-80 text-center space-y-5";
  const infoBtn =
    "bg-green-200 px-5 py-1 rounded-full text-slate-600 hover:text-white";

  return (
    <section className="w-full flex justify-center relative">
      {openEdit && <EditInfo setOpenEdit={setOpenEdit} />}
      {openAdd && <AddPet handleAdd={handleAdd} />}
      <div className="flex justify-center w-3/4 dark:bg-slate-900 bg-white l:w-full">
        <div className="flex-col justify-center items-center py-10 w-full">
          <div className="flex justify-center">
            <div>
              <img
                className="rounded-full w-72 h-72 object-cover ring-4 ring-offset-4 ring-sky-300 dark:ring-yellow-400"
                src={profileImg.length < 3 ? noProfile : profileImg}
                alt="profile"
              />
              <div className="flex-col justify-center items-center text-center">
                <h1 className="flex items-center justify-center p-3 bg-blue-400 dark:bg-slate-600 rounded-2xl  text-white mt-10 w-72 mb-10 text-center text-xl font-bold">
                  <span className="mr-2">
                    {loginOf == "kakao" ? (
                      <RiKakaoTalkFill className="text-yellow-400 text-2xl" />
                    ) : (
                      <FcGoogle className="text-xl" />
                    )}
                  </span>
                  {name}의 마이페이지
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-7 ml:grid-cols-2 sm:flex sm:flex-col">
              <ul className={`${infoUl} overflow-scroll`}>
                <h3 className={`${infoBox} bg-green-400`}>
                  함께 하고 있는 반려견
                </h3>
                <button
                  onClick={handleAdd}
                  className={`${infoBtn} bg-green-200 hover:bg-green-500`}
                >
                  반려견 추가하기
                </button>
                {pets.map((it) => (
                  <li key={it.id} className="flex justify-evenly px-3 py-1">
                    <div className="flex-col text-base">
                      <div>
                        🐶 {it.name} ( {it.breed} ) &nbsp;
                        {it.gender === "male" ? "왕자" : "공주"} - &nbsp;
                        {birthToAge(it.birth)}살
                      </div>
                      <button
                        onClick={() => deletePet(it.id)}
                        className="px-2 w-12 mt-1 bg-white rounded-full text-black text-sm border border-black dark:border-none"
                      >
                        삭제
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className={`${infoUl}`}>
                <h3 className={`${infoBox} bg-yellow-400`}>내 회원정보</h3>
                <button
                  onClick={() => handleEdit()}
                  className={`${infoBtn} bg-yellow-200 hover:bg-yellow-400`}
                >
                  프로필 수정하기
                </button>
                <li>이름 : {name}</li>
                <li>이메일 : {email}</li>
                <li>가입일자 : {join.slice(0, 10)}</li>
              </ul>
              <ul className={`${infoUl}`}>
                <h3 className={`${infoBox} bg-orange-400`}>내 활동내역</h3>
                <li>작성했던 게시글 수 : {feed}</li>
                <li>작성했던 댓글 수 : {comment}</li>
                <li>
                  <span className="bg-orange-100 dark:bg-orange-300 p-3 rounded-2xl">
                    {acticityLevel()}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
