import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

// 스토어 타입 지정
export interface UserStore {
  userId: any;
  isLogin: boolean;
  loginOf: string;
  isFirst: boolean;
  userKey: string;
  profileImg: string;
  name: string;
  email: string;
  pets: {
    id: number;
    name: string;
    gender: string;
    birth: string;
    breed: string;
  }[];
  feed: number;
  comment: number;
  join: string;
}

// 초기 상태 정의
const initialUserState: UserStore = {
  userId: "",
  isLogin: false,
  loginOf: "",
  isFirst: true,
  userKey: "",
  profileImg: "",
  name: "",
  email: "",
  pets: [],
  feed: 0,
  comment: 0,
  join: "",
};

// 액션 정의
export interface UserStoreActions {
  updateUser: (userData: Partial<UserStore>) => void;
  updateFirst: (isFirst: boolean, userKey: string) => void;
  userLogout: () => void;
}

// persist와 combine를 사용하여 상태와 액션 결합
export const useUserStore = create(
  persist(
    combine(initialUserState, (set) => ({
      updateUser: (userData: Partial<UserStore>) =>
        set((state: UserStore) => ({ ...state, ...userData })),
      updateFirst: (isFirst: boolean, userKey: string) =>
        set((state: UserStore) => ({
          ...state,
          isLogin: true,
          isFirst,
          userKey,
        })),
      userLogout: () => set(initialUserState),
    })),
    { name: "userStorage" }
  )
);
