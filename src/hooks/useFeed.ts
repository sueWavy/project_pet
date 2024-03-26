import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";

const useFeed = () => {
  const key = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

  /** 피드 삭제 기능 (피드 id) */
  const deleteFeed = async (feedId: number) => {
    await axios
      .post(
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
      )
      .then((res) => console.log(res, res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  /** 피드 수정 기능 (피드 id, 변경할 데이터) */
  const editFeed = (feedId: any, editData: any) => {
    axios
      .post(
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
      )
      .then((res) => console.log(res, res.data));
    console.log("확인 : ", feedId, editData, editData.key);
  };

  return { deleteFeed, editFeed };
};

export default useFeed;
