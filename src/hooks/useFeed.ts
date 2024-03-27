import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useFeed = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const key = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

  /** 피드 수정 활성화 */
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  /** 피드 삭제 기능 (피드 id) */
  const deleteFeed = async (feedId: number) => {
    const confirmDel = window.confirm("게시글을 삭제하겠습니까?");

    if (confirmDel) {
      await axios.post(
        "http://43.201.39.118/api/feed",
        {
          mode: "delete",
          feed: feedId,
        },
        {
          headers: {
            Authorization: "bearer " + key,
          },
        }
      );
      // .then((res) => console.log(res, res.data));
      queryClient.invalidateQueries({ queryKey: ["data"] });
    }
  };

  /** 피드 수정 기능 (피드 id, 변경할 데이터) */
  const editFeed = async (feedId: any, editData: any) => {
    await axios.post(
      "http://43.201.39.118/api/feed",
      {
        mode: "edit",
        feed: feedId,
        data: editData,
      },
      {
        headers: {
          Authorization: "bearer " + editData.key,
        },
      }
    );
    // .then((res) => console.log(res, res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
    setIsEdit(false);
  };

  return { deleteFeed, editFeed, isEdit, handleEdit };
};

export default useFeed;
