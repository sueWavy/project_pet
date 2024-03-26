import React, { useState } from "react";
import { useUserStore } from "../store/User";
import useComment from "../hooks/useComment";

export default function CommentBar({ comments, feedId }: any) {
  const userName = useUserStore((state) => state.name);
  const [comment, setComment] = useState<string>("");
  const { addComment } = useComment();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    console.log(comment);
  };

  return (
    <div className="w-full bg-sky-200 p-2 flex-col justify-center items-center">
      {!comments && <p className="mb-2">아직 댓글이 없는 게시글입니다</p>}
      {comments && (
        <ul>
          {comments.map((it: any) => (
            <li key={it.id} className="flex">
              <span>...</span>
              <span>...</span>
              <button>삭제</button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center">
        <form className="flex w-4/5 justify-between rounded-xl bg-white">
          <span className="w-1/6 border-r-2 border-gray-400">{userName}</span>
          <input
            className="w-4/6 placeholder:text-center px-1"
            onChange={handleInput}
            name="comment"
            type="text"
            placeholder="댓글을 입력하세요"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addComment(feedId, comment);
            }}
            className="w-1/6 border-l-2 border-gray-400 bg-slate-200"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
