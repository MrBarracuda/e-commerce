import { useQuery } from "@tanstack/react-query";
import { getUserDTO } from "@/data-access/user";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDTO(),
  });
}
