"use server";

import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { updateUser } from "@/data-access/user";
import { handleError } from "@/lib/utils";

import { userFormSchema } from "./validation";
import { revalidatePath } from "next/cache";

export const userFormAction = actionClient
  .schema(userFormSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      await updateUser(parsedInput);
      revalidatePath("/profile/settings");
    } catch (err) {
      handleError(err);
    }
  });
