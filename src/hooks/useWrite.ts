import axios from "axios";
import { Feeds } from "../pages/Write";
import { useUserStore } from "../store/User";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useWrite = () => {
  const key = useUserStore((state) => state.userKey);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addFeed = async (write: Feeds) => {
    // console.log(write);

    await axios.post(
      "http://43.201.39.118/api/feed",
      {
        mode: "write",
        data: write,
      },
      {
        headers: {
          Authorization: "bearer " + key,
        },
      }
    );
    // .then((res) => console.log("게시글 작성", res, res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
    alert("게시글을 작성했습니다");
    navigate("/");
  };

  return { addFeed };
};

export default useWrite;
