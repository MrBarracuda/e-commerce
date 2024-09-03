// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  serial,
  timestamp,
  varchar,
  uuid,
  pgTable,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
// export const createTable = pgTableCreator((name) => `e-commerce_${name}`);

export const posts = pgTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const users = pgTable("users", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: uuid("id").primaryKey(),
  avatar: varchar("avatar"),
  fullName: varchar("first_name"),
  // lastName: varchar("last_name"),
  username: varchar("username").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password"),
  // dateOfBirth: date("date_of_birth"),
  phone: varchar("phone_number"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});
