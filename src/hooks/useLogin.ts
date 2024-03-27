import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/User";

const useLogin = () => {
  const navigate = useNavigate();
  const updateUserStore = useUserStore((state) => state.updateUser);
  const userLogout = useUserStore((state) => state.userLogout);

  const kakaoLogin = async () => {
    try {
      const code = location.search.split("code=")[1];
      const form = new FormData();
      form.append("mode", "kakao");
      form.append("code", code);

      const res = await axios.post("http://43.201.39.118/api/login", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const token = res.data.token;
      const isFirst = res.data.first;

      updateUserStore({
        isLogin: true,
        isFirst: isFirst,
        userKey: token,
      });

      updateUser(token);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error : ", error);
    }
  };

  const updateUser = async (token: any) => {
    await axios
      .get("http://43.201.39.118/api/me", {
        headers: {
          Authorization: "bearer " + token,
        },
      })
      .then((res) => {
        // console.log("카카오 정보 : ", res.data);
        updateUserStore({
          email: res.data.data.email,
          name: res.data.data.name,
          join: res.data.data.created,
          feed: res.data.data.feeds,
          pets: res.data.data.pets,
          comment: res.data.data.comments,
          profileImg: res.data.data.profile,
          userId: res.data.data.id,
        });
        // console.log("업데이트 정보 ! ", userInfo);
      })
      .catch((error: any) => {
        console.error("유저 정보 실패 : ", error);
      });
  };

  const logout = () => {
    userLogout();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const loginWithKakao = async () => {
    const { Kakao } = window;

    await Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/kakao",
      state: "username",
    });
  };

  return { kakaoLogin, logout, loginWithKakao, updateUser };
};

export default useLogin;
