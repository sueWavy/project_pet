import React, { useState } from "react";
import { useUserStore } from "../store/User";
import { TiDelete } from "react-icons/ti";
import useComment from "../hooks/useComment";

export default function CommentBar({ comments, feedId }: any) {
  const userKey = useUserStore((state) => state.userKey);
  const userName = useUserStore((state) => state.name);
  const [comment, setComment] = useState<string>("");
  const { addComment, DelComment } = useComment();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userKey) {
      alert("로그인 후 이용가능합니다.");
      setComment("");
      return;
    }
    if (comment.trim() !== "") {
      addComment(feedId, comment);
      setComment("");
    }
  };

  return (
    <div className="w-full dark:bg-gray-400 bg-sky-200 py-2 px-4 flex-col justify-center items-center rounded-tl-2xl rounded-tr-2xl">
      {comments.length === 0 && (
        <p className="mb-2">아직 댓글이 없는 게시글입니다</p>
      )}
      {comments.length > 0 && (
        <ul className="max-h-96 overflow-scroll">
          {comments.map((it: any) => (
            <li
              key={it.id}
              className="flex-col mt-3 p-2 pt-6 bg-white rounded-2xl"
            >
              <div className="flex items-center">
                <div className="flex justify-center items-center space-x-2 w-40">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={it.writer_profile}
                  />
                  <span className="text-lg font-bold">{it.writer} </span>
                </div>
                <span className="ml-2 w-full text-start">{it.comment}</span>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <span className="text-sm text-gray-400">
                  {it.created}에 작성됨
                </span>
                {it.revise && (
                  <button onClick={() => DelComment(it.id)}>
                    <TiDelete className="text-2xl pt-1" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center mt-3 mb-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full justify-between rounded-xl bg-white h-20 overflow-hidden"
        >
          <span className="w-1/6 border-r-2 border-gray-400 flex items-center justify-center p-1">
            {userKey ? userName : "사용자"}
          </span>
          <input
            className="w-4/6 placeholder:text-center px-1"
            onChange={handleInput}
            value={comment}
            name="comment"
            type="text"
            placeholder="댓글을 입력하세요 (로그인 필수)"
          />
          <button
            type="submit"
            className="w-1/6 border-l-2 border-gray-400 bg-slate-200"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
