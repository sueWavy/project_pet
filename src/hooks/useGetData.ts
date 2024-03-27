import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/User";

interface Data {
  status: boolean;
  message: string;
  result: {
    list: Array<any>;
  };
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
  return useQuery<Data, Error, Data["result"], readonly unknown[]>({
    queryKey: ["data"],
    queryFn: () => fetchData(token),
  });
};
