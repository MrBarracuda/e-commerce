"use server";

import { actionClient } from "@/lib/safe-action";
import { addressFormSchema } from "@/lib/validations/auth";
import { flattenValidationErrors } from "next-safe-action";
import { setAddressDTO } from "@/data-access/address";
import { handleError } from "@/lib/utils";

export const addressFormAction = actionClient
  .schema(addressFormSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    try {
      await setAddressDTO(parsedInput);
    } catch (err) {
      handleError(err);
    }
  });
