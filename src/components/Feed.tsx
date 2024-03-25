import React, { useState } from "react";
import Map from "./Map";

export default function Feed({ data }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { comments } = data;
  console.log(comments);

  return (
    <ul
      key={data.id}
      className="w-11/12 border bg-slate-100 flex-col justify-center items-center text-center rounded-2xl shadow-2xl overflow-hidden"
    >
      <li className="flex items-center justify-between py-3 px-10 bg-sky-200">
        <div className="flex items-center space-x-2">
          <img
            src={data.profileImg}
            className="w-12 h-12 object-cover rounded-full"
          />
          <p>{data.writer}</p>
        </div>

        <span>작성일 : {data.date.slice(0, 24)}</span>
      </li>
      <li className="border p-3">
        <h2>{data.title}</h2>
        <div className="flex justify-between">
          <p>좋아요 : {data.likes}</p>
          <p>댓글수 : {data.comments.length}</p>
        </div>
      </li>
      <li className="flex justify-center">
        <img src={data.feedImg} className="w-96  object-cover" />
      </li>
      <li className="bg-red-400 text-white">
        <button
          className="border px-5 py-1 mt-1 mb-1 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          지도 확인하기
        </button>
        {isOpen && <Map addStr={data.address} />}
      </li>
      <li className="flex justify-center space-x-3">
        <p>위치 : </p>
        <p>{data.address}</p>
      </li>
      <li className="flex justify-center space-x-3 border-t border-b border-black">
        <p>모이는 시간 : </p>
        <p>{data.time}</p>
      </li>
      <li className="p-3 text-start min-h-32">
        <p>{data.content}</p>
      </li>
      <li>
        <h2 className="bg-sky-200">댓글창</h2>
        {comments.map((it: any) => (
          <div key={it.id}>
            <span>
              {it.writer} : {it.comment}
            </span>
          </div>
        ))}
      </li>
    </ul>
  );
}
