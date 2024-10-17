"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { protectedPaths } from "@/config/protected-paths";
import { redirect } from "next/navigation";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { db } from "@/db";
import { addressTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type User } from "@/types";
import { $EditAddress, updateUserSchema } from "@/lib/validations/auth";
import { getCurrentUser } from "@/lib/user";

const logOutSchema = z.string().min(1);

export const logOut = actionClient
  .schema(logOutSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: path }) => {
    const supabase = supabaseServer();
    const { error } = await supabase.auth.signOut();

    if (protectedPaths.includes(path)) {
      redirect(`/auth?next=${path}`);
    }

    revalidatePath(path);

    return { message: `logged out`, error };
  });

export const updateUser = actionClient
  .schema(updateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const currentUser = await getCurrentUser();
    const updateData = {} as Pick<User, "phone" | "username">;

    if (!currentUser) {
      returnValidationErrors(updateUserSchema, {
        _errors: ["You must be logged in to update your account"],
      });
    }

    if (parsedInput.phone) updateData.phone = parsedInput.phone;
    if (parsedInput.username) updateData.username = parsedInput.username;
    // if (user.dateOfBirth) updateData.dateOfBirth = user.dateOfBirth;

    try {
      await db
        .update(userTable)
        .set(updateData)
        .where(eq(userTable.id, currentUser.id));
    } catch (err) {
      return {
        success: false,
        content: {
          _errors: [err],
        },
      };
    }
    revalidatePath("/settings/profile");

    return {
      success: true,
      content: parsedInput,
    };
  });

export const updateAddress = actionClient
  .schema($EditAddress, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      returnValidationErrors($EditAddress, {
        _errors: ["You must be logged in to update your address"],
      });
    }

    try {
      await db
        .update(addressTable)
        .set({
          name: parsedInput.name,
          street: parsedInput.street,
          country: parsedInput.country,
          city: parsedInput.city,
          postalCode: parsedInput.postalCode,
        })
        .where(eq(addressTable.userId, currentUser.id));

      revalidatePath("/settings/address");

      return {
        success: true,
        content: parsedInput,
      };
    } catch (err) {
      return {
        success: false,
        content: {
          _errors: [err],
        },
      };
    }
  });
