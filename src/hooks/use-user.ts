import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/lib/supabase/client";

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
  subscription: {
    email: "",
    created_at: "",
    expires_at: "",
    customer_id: "",
    subscription_id: "",
    price_id: "",
  },
};

export function useUser() {
  const userQueryFn = async () => {
    const supabase = supabaseClient();
    const { data, error } = await supabase.auth.getSession();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
    // console.log(user);

    if (data.session?.user) {
      const { data: user } = await supabase
        .from("user")
        .select("*, subscription(*)")
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
