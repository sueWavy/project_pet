import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";

const useProfile = () => {
  const token = useUserStore((state) => state.userKey);
  const queryClient = useQueryClient();

  /** 프로필 수정 기능(프로필 사진,이름) */
  const editUser = async (userData: any) => {
    await axios
      .post(
        "http://43.201.39.118/api/info",
        {
          mode: "edit",
          data: {
            name: userData.name,
            profile: userData.img,
          },
        },
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then((res) => console.log(res));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  /** 펫 삭제 기능 */
  const deletePet = async (petId: any) => {
    await axios
      .post(
        "http://43.201.39.118/api/pet",
        {
          mode: "delete",
          pet: petId,
        },
        {
          headers: {
            Authorization: "bearer " + token,
          },
        }
      )
      .then((res) => console.log(res));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  return { editUser, deletePet };
};

export default useProfile;
