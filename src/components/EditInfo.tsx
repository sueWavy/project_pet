import { ChangeEvent, useRef, useState } from "react";
import noProfile from "../assets/noProfile.jpg";
import { useUserStore } from "../store/User";
import { FaImage } from "react-icons/fa";
import useProfile from "../hooks/useProfile";

interface EditInfoProps {
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditInfo({ setOpenEdit }: EditInfoProps) {
  const baseImg = useUserStore((state) => state.profileImg);
  const baseName = useUserStore((state) => state.name);
  const userInfo = useUserStore();
  const [userData, setUserData] = useState<{ img: string; name: string }>({
    img: baseImg,
    name: baseName,
  });

  const { editUser } = useProfile();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files, value } = e.target as HTMLInputElement;

    if (name === "img" && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        setUserData((prevData) => ({
          ...prevData,
          img: base64Data,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const lengthCheck = (name: any) => {
    if (name.length > 11) {
      return true;
    }
  };

  return (
    <div className="absolute w-2/4 flex justify-center items-center text-center p-3 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl sm:w-2/3">
      <ul className="flex-col justify-center items-center">
        <h1 className="text-2xl p-3 mb-3">프로필 수정하기</h1>
        <li>
          <img
            className="border border-black rounded-full object-cover w-96 h-96"
            src={`${
              userData.img.length < 1
                ? baseImg
                : userInfo.profileImg.length < 1
                ? noProfile
                : userData.img
            }`}
          />
        </li>
        <li className="flex justify-center p-4">
          <label
            htmlFor="fileInput"
            className="w-44 cursor-pointer flex justify-center items-center py-2 border border-black rounded-full"
          >
            <FaImage className="mr-1" />
            프로필 이미지 변경
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
          <input
            type="text"
            className={`border border-black p-3 justify-center text-center ${
              lengthCheck(userData.name) && "border-red-400"
            }`}
            defaultValue={baseName}
            name="name"
            onChange={handleChange}
          />
        </li>
        {lengthCheck(userData.name) && (
          <li className="mt-2 text-red-500">최대 10글자로 작성해주세요</li>
        )}
        <li className="flex justify-center space-x-3 mb-4 pt-4">
          <button
            id="editBtn"
            className="bg-green-400 text-xl text-white px-4 py-2 rounded-2xl sm:text-sm"
            disabled={lengthCheck(userData.name)}
            onClick={() => {
              editUser(userData), setOpenEdit((prev) => !prev);
            }}
          >
            프로필 수정하기
          </button>
          <button
            onClick={() => setOpenEdit((prev) => !prev)}
            className="bg-gray-400 text-xl text-white px-4 py-2 rounded-2xl sm:text-sm"
          >
            돌아가기
          </button>
        </li>
      </ul>
    </div>
  );
}
