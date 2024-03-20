import { create } from "zustand";

interface UserStore {
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
}

export const useUserStore = create<UserStore & UserStoreActions>((set) => ({
  isFirst: true,
  userKey: "",
  profileImg: "",
  name: "",
  email: "",
  pets: [],
  write: 0,
  comment: 0,
  join: "",
  updateUser: (userData) =>
    set((state) => ({
      ...state,
      ...userData,
    })),
}));
