"use server";

import { actionClient } from "@/lib/safe-action";
import { userFormSchema } from "@/lib/validations/auth";
import { flattenValidationErrors } from "next-safe-action";
import { updateUserDTO } from "@/data-access/user";
import { handleError } from "@/lib/utils";

export const userFormAction = actionClient
  .schema(userFormSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    console.log(parsedInput);
    try {
      await updateUserDTO(parsedInput);
      // revalidatePath("/profile/settings");
    } catch (err) {
      handleError(err);
    }
  });
