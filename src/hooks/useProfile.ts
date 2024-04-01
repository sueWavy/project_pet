import axios from "axios";
import { useUserStore } from "../store/User";
import { useQueryClient } from "@tanstack/react-query";
import { Pet } from "../components/AddPet";

const useProfile = () => {
  const token = useUserStore((state) => state.userKey);
  const update = useUserStore((state) => state.updateUser);
  const queryClient = useQueryClient();

  /** 프로필 수정 기능(프로필 사진,이름) */
  const editUser = async (userData: any) => {
    await axios.post(
      "https://mungdata.net/api/info",
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
    );
    // .then((res) => console.log(res));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  /** 펫 삭제 기능 */
  const deletePet = async (petId: any) => {
    await axios.post(
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
    );
    // .then((res) => console.log(res));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  /** 펫 등록 기능 */
  const addPet = async (petInfo: Pet) => {
    // console.log(petInfo);
    await axios.post(
      "https://mungdata.net/api/login",
      {
        mode: "additional",
        list: [petInfo],
      },
      {
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    // .then((res) => console.log("펫 정보 등록", res.data));
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };

  const getUserData = async (token: string) => {
    await axios
      .get("https://mungdata.net/api/me", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) =>
        update({
          email: res.data.data.email,
          name: res.data.data.name,
          join: res.data.data.created,
          feed: res.data.data.feeds,
          pets: res.data.data.pets,
          comment: res.data.data.comments,
          profileImg: res.data.data.profile,
          userId: res.data.data.id,
        })
      );
    queryClient.invalidateQueries({ queryKey: ["data"] });
  };
  return { editUser, deletePet, addPet, getUserData };
};

export default useProfile;
