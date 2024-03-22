import { useUserStore } from "../store/User";

export default function MyPage() {
  // const userData = useUserStore((state) => state);
  const { email, userId, name, profileImg, feed, comment, join, pets } =
    useUserStore();

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

  console.log(email, userId, name);
  console.log(pets);

  return (
    <section className="w-full flex justify-center">
      <div className="flex justify-center w-3/4 bg-white l:w-full">
        <div className="flex-col justify-center items-center py-10 w-full">
          <div className="flex justify-center">
            <div>
              <img
                className="rounded-full w-72 h-72 object-cover ring-4 ring-offset-4 ring-sky-300 dark:ring-yellow-400"
                src={profileImg}
                alt="profile"
              />
              <h1 className="p-3 bg-blue-400 dark:bg-slate-600 rounded-2xl  text-white mt-10 w-72 mb-10 text-center text-xl font-bold">
                {email}의 마이페이지
              </h1>
            </div>
          </div>
          <div className="flex justify-evenly w-full ml:flex-wrap ml:space-y-10">
            <ul className="bg-white dark:bg-gray-700 dark:text-white rounded-xl w-96 shadow-2xl text-lg h-80 text-center space-y-5">
              <h3 className="bg-green-400 h-14 flex justify-center items-center text-white text-xl font-bold">
                함께 하고 있는 반려견은
              </h3>
              {pets.map((it) => (
                <li key={it.id}>
                  {it.name} ( {it.breed} ) &nbsp;
                  {it.gender === "male" ? "왕자" : "공주"} &nbsp; - &nbsp;
                  {birthToAge(it.birth)} 세
                </li>
              ))}
            </ul>
            <ul className="bg-white dark:bg-gray-700 dark:text-white  rounded-xl w-96 shadow-2xl text-lg h-80 text-center space-y-5">
              <h3 className="bg-yellow-400 h-14 flex justify-center items-center text-white text-xl font-bold">
                내 회원정보는
              </h3>
              <li>이름 : 김춘자</li>
              <li>이메일 : {email}</li>
              <li>가입일자 : {join}</li>
            </ul>
            <ul className="bg-white dark:bg-gray-700 dark:text-white  rounded-xl w-96 shadow-2xl text-lg h-80 text-center space-y-5">
              <h3 className="bg-orange-400 h-14 flex justify-center items-center text-white text-xl font-bold">
                내 활동내역은
              </h3>
              <li>작성 게시글 : {feed}</li>
              <li>작성 댓글 : {comment}</li>
              <li>활동량이 낮아요 😢</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
