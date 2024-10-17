import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/lib/supabase/client";
import type { User } from "@/types";
import { getOneUser } from "@/lib/user";

const initUser: User = {
  id: "",
  avatar: "",
  fullName: "",
  username: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  createdAt: "",
  updatedAt: "",
};

export function useUser() {
  const userQueryFn = async () => {
    const supabase = supabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user from Supabase:", error);
    }

    if (user) {
      try {
        return await getOneUser(user.id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    return initUser;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: userQueryFn,
  });
}
