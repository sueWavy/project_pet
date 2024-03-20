import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const useLogin = () => {
  const navigate = useNavigate();

  /** 카카오 로그인 */
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
      console.log(res);
      const token = res.data.token;
      const isFirst = res.data.first;
      localStorage.setItem("token", token);
      localStorage.setItem("first", isFirst);

      navigate("/", { replace: true });
      alert("로그인 했습니다");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("first");
    navigate("/login", { replace: true });
  };

  return { kakaoLogin, logout };
};

export default useLogin;
