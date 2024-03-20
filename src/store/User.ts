import { create } from "zustand";

interface UserStore {
  isLogin: boolean;
  isFirst: boolean;
  userKey: string;
  profileImg: string;
  name: string;
  email: string;
  pets: {
    id: number;
    name: string;
    gender: string;
    age: string;
    kind: string;
  }[];
  write: number;
  comment: number;
  join: string;
}

interface UserStoreActions {
  updateUser: (userData: Partial<UserStore>) => void;
  updateFirst: (isFirst: boolean, userKey: string) => void;
  userLogout: () => void;
}

// 초기 상태 정의
const initialUserState: UserStore = {
  isLogin: false,
  isFirst: true,
  userKey: "",
  profileImg: "",
  name: "",
  email: "",
  pets: [],
  write: 0,
  comment: 0,
  join: "",
};

export const useUserStore = create<UserStore & UserStoreActions>((set) => ({
  ...initialUserState, // 초기 상태로 설정

  /** 로그인 기능 */
  updateFirst: (isFirst: boolean, userKey: string) =>
    set((state) => {
      const updatedUserData = {
        ...state,
        isLogin: true,
        isFirst,
        userKey,
      };
      console.log(updatedUserData);
      return updatedUserData;
    }),

  updateUser: (userData) =>
    set((state) => ({
      ...state,
      ...userData,
    })),

  // 로그아웃 기능
  userLogout: () => {
    set(initialUserState); // 초기 상태로 설정하여 모든 값 지우기
  },
}));
