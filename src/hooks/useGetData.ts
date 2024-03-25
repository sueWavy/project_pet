import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/User";
import axios from "axios";

interface Data {
  status: string;
  message: string;
  result: any;
}

const fetchData = async (token: string) => {
  const res = await axios.post(
    "http://43.201.39.118/api/feed",
    {
      mode: "list",
    },
    {
      headers: {
        Authorization: "bearer " + token,
      },
    }
  );
  return res.data;
};

export const useGetData = () => {
  const token = useUserStore((state) => state.userKey);
  return useQuery<Data, Error, Data, readonly unknown[]>({
    queryKey: ["data"],
    queryFn: () => fetchData(token),
  });
};
