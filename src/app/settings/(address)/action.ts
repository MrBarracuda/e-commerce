"use server";

import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { updateAddress } from "@/data-access/address";
import { handleError } from "@/lib/utils";
import { z } from "zod";

import { addressFormSchema } from "./validation";
import { revalidatePath } from "next/cache";

export const addressFormAction = actionClient
  .schema(addressFormSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .outputSchema(z.void())
  .action(async ({ parsedInput }) => {
    try {
      await updateAddress(parsedInput);
      revalidatePath("/profile/settings");
    } catch (err) {
      handleError(err);
    }
  });
