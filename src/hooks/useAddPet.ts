import axios from "axios";
import { useUserStore } from "../store/User";
import { Pet } from "../components/AddInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useAddPet = () => {
  const userKey = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();
  const updateUserStore = useUserStore((state) => state.updateUser);
  const navigate = useNavigate();

  const addPet = async (petInfo: Pet[]) => {
    console.log(userKey);

    await axios
      .post(
        "http://43.201.39.118/api/login",
        {
          mode: "additional",
          list: petInfo,
        },
        {
          headers: {
            Authorization: "bearer " + userKey,
          },
        }
      )
      .then((res) => console.log("펫 정보 등록", res.data));
    navigate("/", { replace: true });
    updateUserStore({
      isFirst: false,
    });
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  return { addPet };
};

export default useAddPet;
