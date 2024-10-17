"use client";

import { EditPhoneForm } from "@/app/settings/profile/_components/edit-phone-form";
import { EditUsernameForm } from "@/app/settings/profile/_components/edit-username-form";
import { useUser } from "@/hooks/use-user";
import { EditAddressForm } from "@/app/settings/profile/_components/edit-address-form";

export function ProfileSettingsForm() {
  const { data: user } = useUser();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="col-span-3 space-y-7 md:col-start-2">
      <EditUsernameForm username={user.username} />
      <EditPhoneForm phone={user.phone ?? ""} />
      <EditAddressForm />
    </div>
  );
}
