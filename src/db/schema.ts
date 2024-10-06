// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  timestamp,
  uuid,
  pgTable,
  text,
  primaryKey,
  real,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const createdAt = timestamp("created_at", {
  withTimezone: true,
  mode: "string",
})
  .defaultNow()
  .notNull();

const updatedAt = timestamp("updated_at", {
  withTimezone: true,
  mode: "string",
})
  .defaultNow()
  .notNull()
  .$onUpdate(() => new Date().toDateString());

export const userTable = pgTable(
  "user",
  {
    id: uuid("id").unique().defaultRandom(),
    avatar: text("avatar"),
    fullName: text("full_name"),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone_number"),
    dateOfBirth: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    createdAt,
    //TODO add updatedAt
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.email] }),
    };
  },
);

export const subscriptionTable = pgTable("subscription", {
  email: text("email")
    .primaryKey()
    .references(() => userTable.email, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  subscriptionId: text("subscription_id"),
  customerId: text("customer_id"),
  priceId: text("price_id"),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" }),
  createdAt,
  //TODO: maybe add isActive column and add updatedAt
});

export const productSizeEnum = pgEnum("size", [
  "5",
  "10",
  "15",
  "30",
  "50",
  "75",
  "100",
  "125",
  "150",
  "200",
]);
//TODO: add favorites, ratings, reviews, comments, etc.
export const productTable = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  description: text("description"),
  price: text("price"),
  image: text("image"),
  size: productSizeEnum("size"),
  createdAt,
  updatedAt,
});

export const addressTable = pgTable("address", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  name: text("name"),
  street: text("street"),
  country: text("country"),
  city: text("city"),
  postalCode: text("postal_code"),
  phoneNumber: text("phone_number"),
  createdAt,
  updatedAt,
});

export const addressRelations = relations(addressTable, ({ many, one }) => ({
  orders: many(orderTable),
  userTable: one(userTable, {
    fields: [addressTable.userId],
    references: [userTable.id],
  }),
}));

export const orderStatusEnum = pgEnum("status", [
  "fulfilled",
  "shipped",
  "awaiting_shipment",
]);

export const orderTable = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id").references(() => productTable.id),
  userId: uuid("user_id").references(() => userTable.id),
  amount: real("amount"),
  isPaid: boolean("is_paid").default(false),
  status: orderStatusEnum("status"),
  shippingAddressId: uuid("address_id").references(() => addressTable.id),
  createdAt,
  updatedAt,
});

export const orderRelations = relations(orderTable, ({ one }) => ({
  userTable: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
  shippingAddress: one(addressTable, {
    fields: [orderTable.shippingAddressId],
    references: [addressTable.id],
  }),
}));
