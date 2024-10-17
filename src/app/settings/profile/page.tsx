import { EditProfileForm } from "@/app/settings/profile/edit-profile-form";
import { Wrapper } from "@/components/wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EditPhoneForm } from "@/app/settings/profile/_components/edit-phone-form";
import { EditUsernameForm } from "@/app/settings/profile/_components/edit-username-form";
import { ProfileSettingsForm } from "@/app/settings/profile/_components";

export default function ProfilePage() {
  return (
    <Wrapper className="max-w-screen-xl py-14 md:px-12">
      {/*<div className="container mx-auto px-14 py-14">*/}
      {/*<h1 className="mb-6 text-xl font-bold">Edit your profile</h1>*/}
      <div className="block md:grid md:grid-cols-4 md:space-x-10">
        {/*left side*/}
        <div className="fixed hidden space-y-6 md:block">
          <h2 className="break-all text-3xl font-bold">
            Account
            <br /> Management
          </h2>
          <ul>
            <li>
              <Link
                href="#username"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "-ml-4 text-sm font-semibold uppercase underline hover:text-muted-foreground",
                )}
              >
                user name
              </Link>
            </li>
            <li>
              <Link
                href="#phone"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "-ml-4 font-semibold uppercase hover:text-muted-foreground",
                )}
              >
                phone
              </Link>
            </li>
            <li>
              <Link
                href="#address"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "-ml-4 font-semibold uppercase hover:text-muted-foreground",
                )}
              >
                address
              </Link>
            </li>
          </ul>
        </div>

        {/*right side*/}
        <ProfileSettingsForm />
      </div>
    </Wrapper>
  );
}
