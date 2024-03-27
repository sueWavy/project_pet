import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

const Kakao = () => {
  const { kakaoLogin } = useLogin();

  useEffect(() => {
    kakaoLogin();
  }, []);
  return <div></div>;
};

export default Kakao;
