import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/data-access/user";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    refetchOnWindowFocus: false,
  });
}
