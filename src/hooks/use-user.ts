import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/utils/supabase/client";

const initUser = {
  id: "",
  avatar: "",
  full_name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  createdAt: "",
  date_of_birth: "",
};

export function useUser() {
  const userQueryFn = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (data.session?.user) {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
      return user;
    }

    return initUser;
  };

  return useQuery({
    queryKey: ["user"],
    queryFn: userQueryFn,
  });
}
