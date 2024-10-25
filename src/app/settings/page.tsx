import { getUser } from "@/data-access/user";
import { getAddress } from "@/data-access/address";
import { UserForm } from "@/app/settings/(user)/form";
import { AddressForm } from "@/app/settings/(address)/form";
import { BillingSection } from "@/app/settings/(subscription)";

export default async function ProfilePage() {
  const userData = getUser();
  const addressData = getAddress();

  const [user, address] = await Promise.all([userData, addressData]);

  const userInitialValues = {
    username: user?.username ?? "",
    firstName: user?.fullName?.split(" ")[0] ?? "",
    lastName: user?.fullName?.split(" ")[1] ?? "",
    dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
  };

  const addressInitialValues = {
    name: address?.name ?? "",
    city: address?.city ?? "",
    addressLine1: address?.addressLine1 ?? "",
    addressLine2: address?.addressLine2 ?? "",
    postalCode: address?.postalCode ?? "",
    country: address?.country ?? "",
    phone: address?.phone ?? "",
  };

  return (
    <div className="col-span-3 space-y-7 md:col-start-2">
      <UserForm {...userInitialValues} />
      <AddressForm initialValues={addressInitialValues} />
      <BillingSection />
    </div>
  );
}
