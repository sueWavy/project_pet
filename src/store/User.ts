import { create } from "zustand";

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

// 스토어 액션 타입 지정
interface UserStoreActions {
  updateUser: (userData: Partial<UserStore>) => void;
  updateFirst: (isFirst: boolean, userKey: string) => void;
  userLogout: () => void;
}

// 스토어 초기 상태 정의
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
      return updatedUserData;
    }),

  /** 유저 데이터 업데이트 기능 */
  updateUser: (userData) =>
    set((state) => ({
      ...state,
      ...userData,
    })),

  /** 로그아웃 기능 */
  userLogout: () => {
    console.log("로그아웃!");
    set(initialUserState); // 초기 상태로 설정하여 모든 값 지우기
    console.log("유저 정보 삭제 확인 : ", initialUserState);
  },
}));
