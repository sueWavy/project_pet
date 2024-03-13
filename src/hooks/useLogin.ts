import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useLogin = () => {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useState("");

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
      setLoginStatus(res.data);
      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { login, loginStatus };
};

export default useLogin;
