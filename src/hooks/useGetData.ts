import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

interface Data {
  status: string;
  message: string;
  result: any;
}

const fetchData = async (): Promise<Data> => {
  const form = new FormData();
  form.append("mode", "test");

  const response = await axios.post<Data>(
    "http://43.201.39.118/api/main.php",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
  console.log(response);
};

export const useGetData = () => {
  return useQuery<Data, Error, Data, readonly unknown[]>({
    queryKey: ["data"],
    queryFn: fetchData,
  });
};
