import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { GiSittingDog } from "react-icons/gi";
import { MdOutlineDateRange, MdEdit } from "react-icons/md";
import { RiMapPinFill, RiDeleteBinFill } from "react-icons/ri";
import { IoIosTimer } from "react-icons/io";

import noProfile from "../assets/noProfile.jpg";

import Map from "./Map";
import useLikes from "../hooks/useLikes";
import useFeedDel from "../hooks/useFeedDel";

export default function Feed({ data }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { clickLikes } = useLikes();
  const { deleteFeed } = useFeedDel();

  const timeParts = data.time.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  /**  24:00 -> 오전 / 오후 시간대로 표기 */
  let formattedTime;
  if (hours === 0) {
    formattedTime = `오전 12시 ${minutes}분`;
  } else if (hours < 12) {
    formattedTime = `오전 ${hours}시 ${minutes}분`;
  } else if (hours === 12) {
    formattedTime = `오후 12시 ${minutes}분`;
  } else {
    formattedTime = `오후 ${hours - 12}시 ${minutes}분`;
  }

  return (
    <ul
      key={data.id}
      className="font-['Orbit-Regular'] w-3/4 s:w-full mb-10 border dark:border-none bg-slate-100 flex-col justify-center items-center text-center rounded-2xl shadow-2xl overflow-hidden"
    >
      <li className="flex items-center justify-between py-2 px-6 bg-sky-200 dark:bg-black">
        <div className="flex items-center space-x-2">
          <img
            src={data.profile ? data.profile : noProfile}
            className="w-14 h-14 s:w-12 s:h-12 object-cover rounded-full border-2 border-white dark:border-yellow-300"
          />
          <p className="text-2xl s:text-xl dark:text-white">{data.writer}</p>
        </div>
        <span className="flex items-center text-slate-500 text-lg s:text-sm">
          {data.created.slice(0, 11)}
          <MdOutlineDateRange className="ml-3" />
        </span>
      </li>
      <li className="border-b border-gray-300 p-3">
        <div className="flex justify-between s:justify-center">
          <h2 className="flex items-center pl-10 font-bold text-xl s:text-base s:pl-0">
            <GiSittingDog className="mr-3" />
            {data.title}
          </h2>
          <div className="flex space-x-3 s:hidden">
            <p className="flex items-center">
              <FaHeart className="mr-2" />
              {data.likes}
            </p>
            <p className="flex items-center">
              <AiOutlineMessage className="mr-2" />
              {data.comments.length}
            </p>
          </div>
        </div>
      </li>
      <li className="flex justify-center mt-2 hidden s:inline-block">
        <div className="flex space-x-3">
          <p className="flex items-center">
            <FaHeart className="mr-2" />
            {data.likes}
          </p>
          <p className="flex items-center">
            <AiOutlineMessage className="mr-2" />
            {data.comments}
          </p>
        </div>
      </li>

      <li className="flex justify-center">
        <img src={data.image} className="w-3/4 rounded-3xl p-3  object-cover" />
      </li>
      <li className="p-3">
        <pre>{data.content}</pre>
      </li>
      <li className="p-2 text-white ">
        <div className="flex justify-center space-x-5">
          <button
            onClick={() => clickLikes(data.id)}
            className={`${data.like ? "text-red-400" : "text-white"} ${
              data.like ? "dark:text-yellow-400" : "text-white"
            }  bg-sky-300 border dark:border-none dark:hover:bg-gray-600 
             dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white`}
          >
            ♥
          </button>
          <button
            className="bg-sky-300 border dark:border-none dark:hover:bg-gray-600  dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white "
            onClick={() => setIsOpen(!isOpen)}
          >
            모임 장소
          </button>
          <button className="bg-sky-300 border dark:border-none dark:hover:bg-gray-600  dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white ">
            댓글보기
          </button>
          {data.revise && (
            <button className=" bg-orange-300 border dark:border-none px-5 py-1 mb-2 rounded-full hover:bg-orange-400 hover:text-white ">
              <MdEdit />
            </button>
          )}
          {data.revise && (
            <button
              onClick={() => deleteFeed(data.id)}
              className=" bg-red-300 border dark:border-none px-5 py-1 mb-2 rounded-full hover:bg-red-400 hover:text-white "
            >
              <RiDeleteBinFill />
            </button>
          )}
        </div>
        {isOpen && <Map addStr={data.address} />}
      </li>

      <li className="flex justify-center space-x-3 p-3 bg-sky-100 dark:bg-yellow-100 s:text-sm">
        <div className="flex sm:flex-col sm:text-center sm:justify-center sm:items-center">
          <p className="flex items-center mr-2">
            <RiMapPinFill className="mr-2" />
            모이는 장소 <span className="ml-2 sm:hidden">-</span>
          </p>
          <p className="sm:border-t border-slate-400 sm:mt-1">{data.address}</p>
        </div>
      </li>
      <li className="flex justify-center p-2 bg-gray-200 dark:bg-yellow-200">
        <div className="flex item-center">
          <p className="flex items-center mr-2">
            <IoIosTimer className="mr-2" />
            약속 시간 -
          </p>
          <p>{formattedTime}</p>
        </div>
      </li>
    </ul>
  );
}
