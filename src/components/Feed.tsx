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
import useFeed from "../hooks/useFeed";
import { Feeds } from "../pages/Write";
import { useUserStore } from "../store/User";
import CommentBar from "./CommentBar";

export default function Feed({ data }: any) {
  const {
    profile,
    title,
    writer,
    created,
    likes,
    comments,
    image,
    content,
    id,
    address,
    time,
  } = data;
  const key = useUserStore((state) => state.userKey);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [editData, setEditData] = useState<Feeds>({
    key: key,
    title: data.title,
    writer: data.writer,
    img: data.image,
    address: data.address,
    time: data.time,
    content: data.content,
  });

  const { clickLikes } = useLikes();
  const { deleteFeed, editFeed, isEdit, handleEdit } = useFeed();

  const handleComment = () => {
    setIsComment((prev) => !prev);
  };

  const handleOpen = () => {
    if (!key) {
      alert("로그인 후 이용 가능합니다");
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditData((prevWrite) => ({
      ...prevWrite,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickAddr = () => {
    window.daum.postcode.load(() => {
      const postcode = new window.daum.Postcode({
        oncomplete: function (data: any) {
          console.log(data);
          setEditData((prevWrite) => ({
            ...prevWrite,
            address: data.address,
          }));
        },
      });
      postcode.open();
    });
  };

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
      className={`${
        isEdit && "border-4 border-blue-400 dark:border-yellow-500"
      } font-['Orbit-Regular'] w-3/5 sm:w-full mb-10 bg-slate-100 flex-col justify-center items-center text-center rounded-2xl shadow-2xl overflow-hidden`}
    >
      <li className="flex items-center justify-between py-2 px-6 bg-sky-200 dark:bg-black">
        <div className="flex items-center space-x-2">
          <img
            src={profile ? profile : noProfile}
            className="w-14 h-14 s:w-12 s:h-12 object-cover rounded-full border-2 border-white dark:border-yellow-300"
          />
          <p className="text-2xl s:text-xl dark:text-white">{writer}</p>
        </div>
        <span className="flex items-center text-slate-500 text-lg s:text-sm">
          {created}
          <MdOutlineDateRange className="ml-3" />
        </span>
      </li>
      <li className="border-b border-gray-300 p-3 relative">
        <div className="flex justify-between s:justify-center">
          {isEdit && (
            <input
              onChange={handleChange}
              type="text"
              name="title"
              className="absolute w-full h-full top-0 left-0 pl-10 placeholder:pl-10 border-2 border-blue-300"
              placeholder="변경할 제목을 입력하세요"
              defaultValue={title}
            />
          )}
          <h2 className="flex items-center pl-10 font-bold text-xl s:text-base s:pl-0">
            <GiSittingDog className="mr-3" />
            {title}
          </h2>
          <div className="flex space-x-3 s:hidden">
            <p className="flex items-center">
              <FaHeart className="mr-2 text-red-500 dark:text-yellow-400" />
              {likes}
            </p>
            <p className="flex items-center">
              <AiOutlineMessage className="mr-2" />
              {comments.length}
            </p>
          </div>
        </div>
      </li>
      <li className="hidden justify-center mt-2  s:inline-block">
        <div className="flex space-x-3">
          <p className="flex items-center">
            <FaHeart className="mr-2" />
            {likes}
          </p>
          <p className="flex items-center">
            <AiOutlineMessage className="mr-2" />
            {comments.length}
          </p>
        </div>
      </li>

      <li className="flex justify-center">
        <img src={image} className="w-3/4 rounded-3xl p-3  object-cover" />
      </li>
      <li className="p-3 relative min-h-24">
        <p className="text-balance">{content}</p>
        {isEdit && (
          <textarea
            onChange={handleChange}
            name="content"
            className="w-full h-full absolute top-0 left-0 p-3 placeholder:p-3 border-2 border-blue-300"
            placeholder="수정할 내용을 적어주세요"
            defaultValue={content}
          />
        )}
      </li>
      <li className="p-2 text-white ">
        <div className="flex justify-center space-x-5 mobile:text-xs">
          {isEdit ? (
            <button
              onClick={() => onClickAddr()}
              className="sm:text-xs sm:px-2 bg-sky-300 border-2 border-sky-500 dark:hover:bg-gray-600 
             dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white"
            >
              주소 검색
            </button>
          ) : (
            <button
              onClick={() => clickLikes(id)}
              className={`${data.like ? "text-red-400" : "text-white"} ${
                data.like ? "dark:text-yellow-400" : "text-white"
              }  bg-sky-300 border dark:border-none dark:hover:bg-gray-600 
             dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400`}
            >
              <FaHeart />
            </button>
          )}

          <button
            className="sm:text-xs sm:px-2 bg-sky-300 border dark:border-none dark:hover:bg-gray-600  dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white "
            onClick={handleOpen}
          >
            모임 장소
          </button>
          {isEdit ? (
            <button
              onClick={() => editFeed(id, editData)}
              className="sm:text-xs bg-green-400 border dark:border-none px-5 py-1 mb-2 rounded-full hover:bg-green-500 hover:text-white "
            >
              수정하기
            </button>
          ) : (
            <button
              onClick={handleComment}
              className="sm:text-xs bg-sky-300 border dark:border-none dark:hover:bg-gray-600  dark:bg-gray-400 px-5 py-1 mb-2 rounded-full hover:bg-sky-400 hover:text-white "
            >
              댓글보기
            </button>
          )}
          {data.revise && (
            <button
              onClick={() => handleEdit()}
              className="flex items-center bg-orange-300 border dark:border-none px-5 py-1 mb-2 rounded-full hover:bg-orange-400 hover:text-white "
            >
              {isEdit ? <span className="sm:text-xs">취소</span> : <MdEdit />}
            </button>
          )}
          {data.revise && (
            <button
              onClick={() => deleteFeed(id)}
              className=" bg-red-300 border dark:border-none px-5 py-1 mb-2 rounded-full hover:bg-red-400 hover:text-white "
            >
              <RiDeleteBinFill />
            </button>
          )}
        </div>
        {isOpen && !isEdit && <Map addStr={address} />}
        {isOpen && isEdit && editData.address.length > 5 && (
          <Map addStr={editData.address} />
        )}
      </li>

      {/* 댓글창 */}
      {isComment && (
        <li>
          <CommentBar comments={comments} feedId={id} />
        </li>
      )}
      <li className="flex justify-center space-x-3 p-3 bg-sky-100 dark:bg-yellow-100 s:text-sm">
        <div className="flex sm:flex-col sm:text-center sm:justify-center sm:items-center">
          <p className="flex items-center mr-2">
            <RiMapPinFill className="mr-2" />
            모이는 장소 <span className="ml-2 sm:hidden">-</span>
          </p>
          {isEdit ? (
            <p className="sm:border-t border-slate-400 sm:mt-1">
              {editData.address.length > 5 ? editData.address : address}
            </p>
          ) : (
            <p className="sm:border-t border-slate-400 sm:mt-1">{address}</p>
          )}
        </div>
      </li>
      <li className="flex justify-center p-2 bg-gray-200 dark:bg-yellow-200 relative time-picker">
        <div className="w-full flex justify-center item-center h-full p-0 ">
          {isEdit ? (
            <div className="w-full bg-white border-2 border-blue-300">
              <p className="py-3">변경할 시간은</p>
              <input
                onChange={handleChange}
                id="time"
                className="w-full text-center"
                type="time"
                name="time"
                defaultValue={time}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p className="flex items-center mr-2">
                <IoIosTimer className="mr-2" />
                약속 시간 -
              </p>
              <p>{formattedTime}</p>
            </div>
          )}
        </div>
      </li>
    </ul>
  );
}
