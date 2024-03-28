import axios from "axios";
import { Pet } from "../components/AddPet";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";

const useAddPet = () => {
  const userKey = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

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

    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  return { addPet };
};

export default useAddPet;
