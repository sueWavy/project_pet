import React, { useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import useLogin from "../hooks/useLogin";

interface Pet {
  name: string;
  kind: string;
  age: number;
  gender: string;
}

export default function AddInfo() {
  const { logout } = useLogin();

  const [pets, setPets] = useState<number>(1);

  const petName = useRef<HTMLInputElement>(null);
  const petKind = useRef<HTMLInputElement>(null);
  const petAge = useRef<HTMLInputElement>(null);

  const [petInfo, setPetInfo] = useState<Pet[]>([
    { name: "", kind: "", age: 0, gender: "male" },
  ]);

  const onCrease = () => {
    setPets((prev) => prev + 1);
  };

  const onDecrease = () => {
    if (pets === 1) {
      return;
    } else {
      setPets((prev) => prev - 1);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setPetInfo((prevPetInfo) => {
      const updatedPetInfo = [...prevPetInfo];
      updatedPetInfo[index] = {
        ...updatedPetInfo[index],
        [name]: value,
      };
      return updatedPetInfo;
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const hasEmptyName = petInfo.some((pet) => pet.name.trim() === "");
    const hasEmptyKind = petInfo.some((pet) => pet.kind.trim() === "");
    const hasEmptyAge = petInfo.some((pet) => pet.age <= 0);

    if (hasEmptyName) {
      petName.current?.focus();
      alert("이름을 기재해주세요");
      return;
    }
    if (hasEmptyKind) {
      petKind.current?.focus();
      alert("종류를 기재해주세요");
      return;
    }
    if (hasEmptyAge) {
      petAge.current?.focus();
      alert("나이를 기재해주세요");
      return;
    }
    console.log(petInfo, localStorage.token);
  };

  //   Style
  const InputBtn =
    "dark:bg-black ml-2 flex justify-center items-center rounded-full bg-brand text-white";

  const InputStyle =
    "p-1 rounded-full placeholder:text-center text-center border-2";

  return (
    <div className="fixed w-2/4 sm:w-3/4  max-h-custom top-36  dark:bg-slate-900 bg-white z-30 pt-20 pb-20 rounded-full shadow-md overflow-y-scroll">
      <form className="text-center">
        <p className="text-xl text-black dark:text-white">
          처음 접속하신 견주님이시군요
        </p>
        <h1 className="text-2xl mb-4 dark:text-white text-black ">
          아래에 <b className="dark:text-yellow-300 text-blue-400">반려견</b>의
          정보를 입력해주세요
        </h1>
        <div className="flex justify-center mb-4 items-center">
          <p className="dark:text-white">반려견의 수 : </p>
          <span className="ml-2 dark:text-white">{pets}</span>
          <button className={InputBtn} onClick={onCrease}>
            <FaPlusCircle />
          </button>
          <button className={InputBtn} onClick={onDecrease}>
            <FaMinusCircle />
          </button>
        </div>

        {Array.from({ length: pets }, (_, index) => (
          <ul
            key={index}
            className="flex-col justify-center text-center items-center space-y-3 mt-5 py-5 bg-white dark:bg-gray-900"
          >
            <span className="text-black dark:text-white">
              🐶 멍뭉이 {index + 1}
            </span>
            <li>
              <input
                ref={petName}
                type="text"
                placeholder="반려견의 이름"
                className={InputStyle}
                name="name"
                onChange={(e) => handleChange(e, index)}
              />
            </li>
            <li>
              <input
                required
                type="text"
                placeholder="반려견의 품종"
                className={InputStyle}
                name="kind"
                onChange={(e) => handleChange(e, index)}
              />
            </li>
            <li>
              <div className="flex justify-center items-center">
                <input
                  required
                  type="number"
                  placeholder="나이"
                  className={`${InputStyle} w-24 mr-2 h-11`}
                  name="age"
                  onChange={(e) => handleChange(e, index)}
                />
                <select
                  required
                  className={`w-24 h-11 bg-white rounded-full text-center border-2 
                  ${
                    petInfo[index]?.gender === "female"
                      ? "text-pink-500"
                      : "text-blue-500"
                  } `}
                  name="gender"
                  onChange={(e) => handleChange(e, index)}
                >
                  <option value="male">왕자</option>
                  <option value="female">공주</option>
                </select>
              </div>
            </li>
          </ul>
        ))}
        <div className="flex justify-center mt-8 space-x-5">
          <button
            className="dark:bg-orange-400 bg-sky-500 text-white p-3 rounded-2xl"
            onClick={handleSubmit}
          >
            등록하기
          </button>
          <button
            className="dark:bg-orange-500 bg-brand text-white p-3 rounded-2xl"
            onClick={logout}
          >
            돌아가기
          </button>
        </div>
      </form>
    </div>
  );
}
