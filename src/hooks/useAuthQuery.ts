import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserData {
  token: string;
  id: string;
  email: string;
}

export const useAuthQuery = (accessToken: string, userData: UserData) => {
  return useQuery("auth", () => fetchToken(accessToken, userData), {
    onError: (error: any) => {
      console.log("Auth 데이터 실패", error);
    },
  });
};

const fetchToken = async (accessToken: string, userData: UserData) => {
  const form = new FormData();
  form.append("mode", "kakao");
  form.append("token", accessToken);

  const response = await axios.post("http://43.201.39.118/api/login", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response);
  return response.data;
};

const fetchData = async (userData: UserData) => {
  const form = new FormData();
  form.append("mode", "check");
  form.append("user", JSON.stringify(userData)); // userData를 문자열로 변환하여 추가

  const response = await axios.post("http://43.201.39.118/api/login", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response);
  return response.data;
};
