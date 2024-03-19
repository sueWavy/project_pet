import React, { useState } from "react";

export default function AddInfo() {
  const [pets, setPets] = useState<number>(1);

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

  return (
    <div className="absolute top-1/4 max-h-96 bg-green-400 z-50 w-1/3 py-10 rounded-3xl overflow-y-scroll">
      <div className="text-center">
        <h1 className="text-2xl mb-4 text-white">
          반려견의 정보를 입력해주세요
        </h1>
        <div className="flex justify-center mb-4">
          <p>반려견의 수 : </p>
          <span className="ml-2">{pets}</span>
          <button className="bg-white ml-2 px-2" onClick={onCrease}>
            +
          </button>
          <button className="bg-white ml-2 px-2" onClick={onDecrease}>
            -
          </button>
        </div>

        {Array.from({ length: pets }, (_, index) => (
          <ul
            key={index}
            className="flex-col justify-center text-center items-center space-y-3"
          >
            <li>
              <input type="text" placeholder="반려견의 이름" />
            </li>
            <li>
              <input type="text" placeholder="반려견의 품종" />
            </li>
            <li>
              <input type="number" placeholder="나이" />
            </li>
            <li>
              <select name="pet_gender" id="pet_gender">
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
            </li>
          </ul>
        ))}
        <div className="flex justify-center mt-8 space-x-5">
          <button className="bg-white p-3 rounded-2xl">등록하기</button>
          <button className="bg-white p-3 rounded-2xl">돌아가기</button>
        </div>
      </div>
    </div>
  );
}
