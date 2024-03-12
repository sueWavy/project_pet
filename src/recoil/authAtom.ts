import { atom } from "recoil";

/** 로그인시 받아올 AuthData 타입 설정 */
interface AuthData {
  accessToken: any;
  userId: string;
  userEmail: string;
}

// 로그인 전역 상태관리 아톰 생성
export const AuthAtom = atom<AuthData | null>({
  key: "AuthAtom",
  default: null,
});
