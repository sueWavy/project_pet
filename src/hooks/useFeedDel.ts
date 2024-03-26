import axios from "axios";
import { useUserStore } from "../store/User";

const useFeedDel = () => {
  const key = useUserStore((state) => state.userKey);

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
  };

  return { deleteFeed };
};

export default useFeedDel;
