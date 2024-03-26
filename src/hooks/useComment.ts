import axios from "axios";
import { useUserStore } from "../store/User";

const useComment = () => {
  const key = useUserStore((state) => state.userKey);

  /** 댓글 추가 기능 (피드 id, 댓글 내용) */
  const addComment = async (feedId: number, comment: string) => {
    await axios
      .post(
        "http://43.201.39.118/api/comment",
        {
          mode: "write",
          data: {
            feedId: feedId,
            comment: comment,
          },
        },
        {
          headers: {
            Authorization: "bearer " + key,
          },
        }
      )
      .then((res) => console.log(res, res.data, key));
  };

  /** 댓글 삭제 기능 (댓글 id) */
  const DelComment = async (commentId: number) => {
    axios
      .post(
        "http://43.201.39.118/api/comment",
        {
          mode: "delete",
          comment: commentId,
        },
        {
          headers: {
            Authorizatiom: "bearer " + key,
          },
        }
      )
      .then((res) => console.log(res, res.data));
  };

  return { addComment, DelComment };
};

export default useComment;
