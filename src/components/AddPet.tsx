import React, { useRef, useState } from "react";
import useProfile from "../hooks/useProfile";

interface AddInfoProps {
  handleAdd: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
}

//

export interface Pet {
  name: string;
  kind: string;
  age: string;
  gender: string;
}

function AddPet({ handleAdd, refresh }: AddInfoProps) {
  const { addPet } = useProfile();

  const [petInfo, setPetInfo] = useState<Pet>({
    name: "",
    kind: "",
    age: "",
    gender: "male",
  });

  const petNameRef = useRef<HTMLInputElement>(null);
  const petKindRef = useRef<HTMLInputElement>(null);
  const petAgeRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPetInfo((prevPetInfo) => ({
      ...prevPetInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!petInfo.name.trim()) {
      petNameRef.current?.focus();
      return;
    }
    if (!petInfo.kind.trim()) {
      petKindRef.current?.focus();
      return;
    }
    if (!petInfo.age.trim()) {
      petAgeRef.current?.focus();
      return;
    }
    await addPet(petInfo);
    handleAdd((prev) => !prev);
    refresh();
  };

  return (
    <div className="fixed w-2/4 sm:w-3/4 s:w-full max-h-custom top-36 border border-black dark:bg-slate-900 bg-white z-30 pt-20 pb-20 rounded-full shadow-md overflow-y-scroll">
      <form onSubmit={handleSubmit} className="text-center">
        <h1 className="text-2xl mb-4 dark:text-white text-black">
          아래에 <b className="dark:text-yellow-300 text-blue-400">반려견</b>의
          정보를 입력해주세요
        </h1>
        <ul className="flex-col justify-center text-center items-center space-y-3 mt-5 py-5 bg-white dark:bg-gray-900">
          <li className="flex justify-center items-center space-x-5">
            <span className="text-black dark:text-white">🐶 반려견의 성별</span>
            <select
              required
              className={`bg-white rounded-full text-center border-2 ${
                petInfo.gender === "female" ? "text-pink-500" : "text-blue-500"
              }`}
              name="gender"
              onChange={handleChange}
            >
              <option value="male">왕자</option>
              <option value="female">공주</option>
            </select>
          </li>
          <li>
            <input
              ref={petNameRef}
              type="text"
              placeholder="반려견의 이름"
              className={`${
                petInfo.name.trim() !== "" ? "border-green-500" : ""
              } p-1 rounded-full placeholder:text-center text-center border-2 w-52 text-gray-400 focus:border-red-300`}
              name="name"
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              required
              ref={petKindRef}
              type="text"
              placeholder="반려견의 품종"
              className={`${
                petInfo.kind.trim() !== "" ? "border-green-500" : ""
              } p-1 rounded-full placeholder:text-center text-center border-2 w-52 text-gray-400 focus:border-red-300`}
              name="kind"
              onChange={handleChange}
            />
          </li>
          <li>
            <input
              ref={petAgeRef}
              required
              type="date"
              placeholder="생일"
              className={`${
                petInfo.age.trim() !== "" ? "border-green-500" : ""
              } p-1 rounded-full placeholder:text-center text-center border-2 w-52 text-gray-400 focus:border-red-300`}
              name="age"
              onChange={handleChange}
            />
          </li>
        </ul>
        <div className="flex justify-center mt-8 space-x-5">
          <button
            className="dark:bg-orange-400 bg-sky-500 text-white p-3 rounded-2xl hover:brightness-125"
            type="submit"
          >
            등록하기
          </button>
          <button
            className="dark:bg-orange-500 bg-brand text-white p-3 rounded-2xl hover:brightness-125"
            onClick={() => handleAdd((prev) => !prev)}
          >
            돌아가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPet;
