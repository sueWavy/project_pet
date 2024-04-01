import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";

const useComment = () => {
  const key = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

  /** 댓글 추가 기능 (피드 id, 댓글 내용) */
  const addComment = async (feedId: number, comment: string) => {
    await axios.post(
      "https://mungdata.net/api/comment",
      {
        mode: "write",
        data: {
          feed: feedId,
          comment: comment,
        },
      },
      {
        headers: {
          Authorization: "bearer " + key,
        },
      }
    );
    // .then((res) => console.log(res, res.data, key));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  /** 댓글 삭제 기능 (댓글 id) */
  const DelComment = async (commentId: number) => {
    await axios.post(
      "https://mungdata.net/api/comment",
      {
        mode: "delete",
        comment: commentId,
      },
      {
        headers: {
          Authorization: "bearer " + key,
        },
      }
    );
    // .then((res) => console.log(res, res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  return { addComment, DelComment };
};

export default useComment;
