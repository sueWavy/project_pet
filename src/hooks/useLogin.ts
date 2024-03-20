import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/User";

const useLogin = () => {
  const navigate = useNavigate();

  const updateUserStore = useUserStore((state) => state.updateFirst);
  const userLogout = useUserStore((state) => state.userLogout);

  const kakaoLogin = async () => {
    const code = location.search.split("code=")[1];
    const form = new FormData();
    form.append("mode", "kakao");
    form.append("code", code);

    try {
      const res = await axios.post("http://43.201.39.118/api/login", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("서버 응답 확인 ( token, isFirst ) : ", res);
      const token = res.data.token;
      const isFirst = res.data.first;

      // userStore에 첫방문, 토큰 저장
      updateUserStore(isFirst, token);

      navigate("/", { replace: true });
      alert("로그인 했습니다");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    // userStore 초기화 시키기
    userLogout;
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return { kakaoLogin, logout };
};

export default useLogin;
