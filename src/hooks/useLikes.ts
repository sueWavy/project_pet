import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";

const useLikes = () => {
  const key = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

  /** 좋아요 (즐겨찾기 기능) */
  const clickLikes = async (feedId: number) => {
    if (!key) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    await axios
      .post(
        "http://43.201.39.118/api/feed",
        {
          mode: "reaction",
          feed: feedId,
        },
        {
          headers: {
            Authorization: "bearer " + key,
          },
        }
      )
      .then((res) => console.log("좋아요 확인 : ", res, res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  return { clickLikes };
};

export default useLikes;
