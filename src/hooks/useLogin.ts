import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLogin = () => {
  const location = useLocation();

  useEffect(() => {
    const code = location.search.split("code=")[1];
    const form = new FormData();
    form.append("mode", "kakao");
    form.append("code", code);

    axios
      .post("http://43.201.39.118/api/login", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data));
  }, []);
};

export default useLogin;
