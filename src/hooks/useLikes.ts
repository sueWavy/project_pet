import axios from "axios";
import { useUserStore } from "../store/User";

const useLikes = () => {
  const key = useUserStore((state) => state.userKey);

  const clickLikes = (feedId: number) => {
    axios
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
  };

  return { clickLikes };
};

export default useLikes;
