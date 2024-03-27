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

    if (write.title.length < 1) {
      alert("제목을 입력해주세요");
      return;
    } else if (write.address.length < 1) {
      alert("주소를 선택해주세요");
      return;
    } else if (write.time.length < 1) {
      alert("시간을 정해주세요");
      return;
    } else if (write.content.length < 1) {
      alert("내용을 입력해주세요");
      return;
    }

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
