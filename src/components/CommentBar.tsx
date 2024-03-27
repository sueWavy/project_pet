import React, { useState } from "react";
import { useUserStore } from "../store/User";
import useComment from "../hooks/useComment";

export default function CommentBar({ comments, feedId }: any) {
  const userName = useUserStore((state) => state.name);
  const [comment, setComment] = useState<string>("");
  const { addComment, DelComment } = useComment();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      addComment(feedId, comment);
      setComment("");
    }
  };

  return (
    <div className="w-full bg-sky-200 p-2 flex-col justify-center items-center">
      {!comments && <p className="mb-2">아직 댓글이 없는 게시글입니다</p>}
      {comments && (
        <ul>
          {comments.map((it: any) => (
            <li key={it.id} className="flex">
              <span>{it.writer}</span>
              <span>{it.comment}</span>
              <button onClick={() => DelComment(it.id)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-4/5 justify-between rounded-xl bg-white"
        >
          <span className="w-1/6 border-r-2 border-gray-400">{userName}</span>
          <input
            className="w-4/6 placeholder:text-center px-1"
            onChange={handleInput}
            value={comment}
            name="comment"
            type="text"
            placeholder="댓글을 입력하세요"
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
