import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const useLogin = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const login = async () => {
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
      setLoginStatus(true);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
      alert("로그인 했습니다");

      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setLoginStatus((prev) => !prev);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    alert("로그아웃 했습니다");
  };

  return { login, logout, loginStatus };
};

export default useLogin;
