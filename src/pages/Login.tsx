import dogVideo from "../assets/dog.mp4";
import useLogin from "../hooks/useLogin";
import { RiKakaoTalkFill } from "react-icons/ri";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  // 카카오 로그인 hook에서 가져오기
  const { loginWithKakao, googleLogin } = useLogin();

  /** 카카오 로그인 기능 */
  const handleLogin = () => {
    loginWithKakao();
  };

  // 중복 스타일
  const boxStyle =
    "w-96 flex flex-col items-center justify-center rounded-2xl p-4 bg-white space-y-3 relative z-10 dark:bg-slate-600 dark:opacity-90 dark:text-white";

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center space-y-5">
      <video
        src={dogVideo}
        autoPlay
        muted
        loop
        className="object-cover object-center w-full h-full absolute inset-0 z-0"
      />

      <section className={boxStyle}>
        <div className="flex items-center space-x-1 text-2xl">
          <h1>로그인</h1>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2 justify-center cursor-pointer">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                googleLogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("구글 로그인 실패");
                console.error;
              }}
            />
          </div>

          <p className="text-center text-slate-400 dark:text-slate-300">
            ⎯⎯⎯⎯ 또는 ⎯⎯⎯⎯
          </p>
          <div>
            <div
              className="text-black flex mb-2 items-center space-x-2 justify-center cursor-pointer rounded-md bg-white border p-1.5 hover:border-sky-200 hover:bg-sky-50"
              onClick={handleLogin}
            >
              <RiKakaoTalkFill />
              <span>카카오로 로그인하기</span>
            </div>
          </div>
        </div>
      </section>
      <section className={boxStyle}>
        <div>
          <span>
            멍미팅을 원활히 이용하려면 <b className=" text-brand">로그인</b> 을
            해야합니다.
          </span>
        </div>
      </section>
    </div>
  );
}
