export default function Write() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isDark = localStorage.getItem("theme");

  console.log(isDark);

  const getBackImg = () => {
    if (isDark === "dark") {
      return "https://cdn.pixabay.com/photo/2020/11/22/16/58/road-5767221_1280.jpg";
    } else {
      return "https://cdn.pixabay.com/photo/2020/06/18/15/58/avenue-5314089_1280.jpg";
    }
  };

  return (
    <section className="w-full flex justify-center">
      <form
        className="w-3/4 h-full py-12 font-['Orbit-Regular'] l:w-full bg-sky-200 dark:bg-gray-500 flex justify-center flex-col items-center"
        style={{
          backgroundImage: `url(${getBackImg()})`,
          backgroundSize: "cover",
        }}
        onSubmit={handleSubmit}
      >
        <h1 className="mb-10 s:text-2xl font-['YEONGJUPunggiGinsengTTF'] text-sky-500 dark:text-slate-200 dark:bg-gray-900 text-3xl shadow-lg bg-white p-5 rounded-3xl">
          🐶 산책 메이트를 구해볼까요
        </h1>
        <ul className="p-4 space-y-3 text-center w-3/5 md:w-3/4 sm:w-full sm:p-1 bg-opacity-70 dark:bg-opacity-70 bg-blue-300 dark:bg-slate-800 rounded-2xl shadow-2xl">
          <li>
            <input
              className="w-full placeholder:text-center h-16 text-center rounded-tl-lg rounded-tr-lg"
              type="text"
              placeholder="제목을 입력하세요"
            />
          </li>
          <li className="bg-white py-2 rounded-md">
            <input type="image" value="&nbsp;이미지 첨부" />
          </li>
          <li>
            <button className="bg-white w-full py-2 rounded-md">
              주소 찾기
            </button>
          </li>
          <li>
            <input
              type="text"
              className="w-full placeholder:text-center py-4"
              placeholder="주소 내용"
              readOnly={true}
            />
          </li>
          <li>
            <input
              type="text"
              className="w-full placeholder:text-center py-2 text-center"
              placeholder="상세 주소를 입력해주세요"
            />
          </li>
          <li className="relative time-picker">
            <p className="w-full bg-white rounded-tl-md rounded-tr-md pt-2 -mb-1 pb-1">
              우리가 산책할 시간은
            </p>
            <input
              id="time"
              className="w-full text-center py-2 rounded-md"
              type="time"
            />
          </li>
          <li>
            <textarea
              className="w-full min-h-72 placeholder:text-center text-start p-2 outline-none"
              name="content"
              id="content"
              placeholder="본문 내용을 입력해주세요"
            />
          </li>
          <li>
            <button className="font-['YEONGJUPunggiGinsengTTF'] bg-blue-400 dark:bg-slate-500 text-white text-xl w-full h-16 rounded-bl-xl rounded-br-xl hover:bg-blue-500 dark:hover:bg-slate-700">
              작성하기
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
}
