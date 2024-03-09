import { atom } from "recoil";

interface AuthData {
  accessToken: string;
  userId: string;
  userEmail: string;
}

export const authState = atom<AuthData | null>({
  key: "authState",
  default: null,
});
