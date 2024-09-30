// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  timestamp,
  uuid,
  pgTable,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id"),
    avatar: text("avatar"),
    fullName: text("first_name"),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    // remove password column
    phone: text("phone_number"),
    dateOfBirth: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.email] }),
    };
  },
);

//TODO: change columns to camelCase
export const subscription = pgTable("subscription", {
  email: text("email")
    .primaryKey()
    .references(() => users.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  subscriptionId: text("subscription_id"),
  customerId: text("customer_id"),
  priceId: text("price_id"),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});
