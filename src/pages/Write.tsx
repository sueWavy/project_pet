import axios from "axios";
import { useState } from "react";
import { useUserStore } from "../store/User";
import Map from "../components/Map";
import { FaMapMarkerAlt, FaImage } from "react-icons/fa";

interface Feed {
  key: string;
  writer: string;
  title: string;
  img: string;
  address: string;
  date: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export default function Write() {
  const key = useUserStore((state) => state.userKey);
  const userName = useUserStore((state) => state.name);

  const [write, setWrite] = useState<Feed>({
    key: "",
    title: "",
    writer: "",
    img: "",
    address: "",
    date: "",
    time: "",
    content: "",
    likes: 0,
    comments: 0,
  });

  // 현재 시간 구하기
  const currentDate = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  console.log(currentDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // 이미지 파일 base64로 변환하기
    const { name, files } = e.target as HTMLInputElement;

    if (name === "img" && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        setWrite((prevWrite) => ({
          ...prevWrite,
          img: base64Data,
        }));
      };
      reader.readAsDataURL(files[0]);

      // 이미지 파일이 아닌 경우 입력값 업데이트
    } else {
      setWrite((prevWrite) => ({
        ...prevWrite,
        key: key,
        writer: userName,
        date: currentDate,
        [e.target.name]: e.target.value,
      }));
      console.log(write);
    }
  };

  /** 다음 주소찾기 API */
  const onClickAddr = () => {
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data: any) {
          console.log(data);
          setWrite((prevWrite) => ({
            ...prevWrite,
            address: data.address,
          }));
        },
      });
      postcode.open();
    });
  };

  const AddFeed = (petInfo: Feed) => {
    axios
      .post(
        "http://43.201.39.118/api/feed",
        {
          mode: "write",
          list: write,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => console.log("펫 정보 등록", res.data));
  };

  // 다크 모드 확인
  const isDark = localStorage.getItem("theme");

  // 다크 모드 상태에 다라 배경 이미지 변경
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
              name="title"
              onChange={handleChange}
            />
          </li>
          <li className="bg-sky-400 dark:text-black hover:bg-sky-500 text-white dark:bg-yellow-200 py-2 rounded-md cursor-pointer dark:hover:bg-yellow-300">
            <label
              htmlFor="fileInput"
              className="cursor-pointer flex justify-center items-center"
            >
              <FaImage className="mr-1" />
              이미지 업로드
            </label>
            <input
              className="w-full h-full bg-white"
              type="file"
              accept="image/*"
              name="img"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleChange}
            />
          </li>
          <li>
            <button
              className="w-full bg-sky-400 dark:text-black hover:bg-sky-500 text-white dark:bg-yellow-200 py-2 rounded-md cursor-pointer dark:hover:bg-yellow-300"
              onClick={onClickAddr}
            >
              <p className="flex justify-center items-center">
                <FaMapMarkerAlt className="pt-1 mr-1" /> 주소 검색
              </p>
            </button>
          </li>
          <li>
            <div>
              <p className="bg-sky-300 text-white dark:text-black dark:bg-yellow-100 p-1">
                지도
              </p>
              {write.address.length > 5 && <Map addStr={write.address} />}
            </div>
            <input
              type="text"
              className="w-full placeholder:text-center py-4 text-center"
              placeholder="주소 내용"
              value={write.address}
              readOnly={true}
              name="address"
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
              name="time"
              onChange={handleChange}
            />
          </li>
          <li>
            <textarea
              className="w-full min-h-72 placeholder:text-center text-start p-2 outline-none"
              id="content"
              placeholder="본문 내용을 입력해주세요"
              name="content"
              onChange={handleChange}
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
