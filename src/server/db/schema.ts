// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  timestamp,
  uuid,
  pgTable,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const users = pgTable(
  "users",
  {
    id: uuid("id"),
    avatar: text("avatar"),
    fullName: text("first_name"),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    // remove password column
    password: text("password"),
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
      // pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] }),
    };
  },
);

export const subscription = pgTable("subscription", {
  email: text("email")
    .primaryKey()
    .references(() => users.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  subscription_id: text("subscription_id"),
  customer_id: text("customer_id"),
  expires_at: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});
