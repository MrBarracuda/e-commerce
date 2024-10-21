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
  integer,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

//TODO: Change all timestamp to Date type
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
    id: uuid("id").unique().defaultRandom().notNull(),
    avatar: text("avatar"),
    fullName: text("full_name"),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    //TODO: deprecate phone
    phone: text("phone"),
    dateOfBirth: timestamp("date_of_birth", {
      withTimezone: true,
      mode: "string",
    }),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.id, table.email] }),
    };
  },
);

export const subscriptionTable = pgTable("subscription", {
  email: text("email")
    .notNull()
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
  updatedAt,
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
  id: serial("id").primaryKey(),
  name: text("name"),
  subName: text("sub_name"),
  description: text("description"),
  price: text("price"),
  image: text("image"),
  size: productSizeEnum("size"),
  createdAt,
  updatedAt,
});

//TODO: change text to varchar with a limit declared in addressFormSchema
export const addressTable = pgTable("address", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  name: text("name"),
  addressLine1: text("address_line_1"),
  addressLine2: text("address_line_2"),
  country: text("country"),
  city: text("city"),
  postalCode: text("postal_code"),
  phone: text("phone"),
  createdAt,
  updatedAt,
});

export const subscriptionRelations = relations(
  subscriptionTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [subscriptionTable.email],
      references: [userTable.email],
    }),
  }),
);

export const addressRelations = relations(addressTable, ({ many, one }) => ({
  orders: many(orderTable),
  user: one(userTable, {
    fields: [addressTable.userId],
    references: [userTable.id],
  }),
}));

export const orderStatusEnum = pgEnum("status", [
  "fulfilled",
  "shipped",
  "awaiting_shipment",
]);

// export const orderTable = pgTable("order", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   productId: serial("product_id").references(() => productTable.id),
//   userId: uuid("user_id").references(() => userTable.id),
//   cartId: serial("cart_id").references(() => cartTable.id),
//   amount: real("amount"),
//   isPaid: boolean("is_paid").default(false),
//   status: orderStatusEnum("status"),
//   addressId: uuid("address_id").references(() => addressTable.id),
//   createdAt,
//   updatedAt,
// });

export const orderTable = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => userTable.id),
  addressId: uuid("address_id").references(() => addressTable.id),
  cartId: serial("cart_id").references(() => cartTable.id), // Reintroduced
  isPaid: boolean("is_paid").default(false),
  status: orderStatusEnum("status"),
  createdAt,
  updatedAt,
});

export const orderItemTable = pgTable("order_item", {
  id: serial("id").primaryKey(),
  orderId: uuid("order_id").references(() => orderTable.id),
  productId: serial("product_id").references(() => productTable.id),
  quantity: integer("quantity").default(1).notNull(),
  createdAt,
  updatedAt,
});

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  totalAmount: real("total_amount").default(0).notNull(),
  createdAt,
  updatedAt,
});

export const cartItemTable = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  cartId: serial("cart_id")
    .references(() => cartTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  productId: serial("product_id")
    .references(() => productTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt,
  updatedAt,
});

export const cartRelations = relations(cartTable, ({ many, one }) => ({
  user: one(userTable, {
    fields: [cartTable.userId],
    references: [userTable.id],
  }),
  cartItems: many(cartItemTable),
}));

export const cartItemRelations = relations(cartItemTable, ({ one }) => ({
  cart: one(cartTable, {
    fields: [cartItemTable.cartId],
    references: [cartTable.id],
  }),
  product: one(productTable, {
    fields: [cartItemTable.productId],
    references: [productTable.id],
  }),
}));

// export const orderRelations = relations(orderTable, ({ one }) => ({
//   user: one(userTable, {
//     fields: [orderTable.userId],
//     references: [userTable.id],
//   }),
//   address: one(addressTable, {
//     fields: [orderTable.addressId],
//     references: [addressTable.id],
//   }),
//   cart: one(cartTable, {
//     fields: [orderTable.cartId],
//     references: [cartTable.id],
//   }),
// }));

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [orderTable.userId],
    references: [userTable.id],
  }),
  address: one(addressTable, {
    fields: [orderTable.addressId],
    references: [addressTable.id],
  }),
  orderItems: many(orderItemTable),
  cart: one(cartTable, {
    fields: [orderTable.cartId],
    references: [cartTable.id],
  }),
}));

export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderItemTable.orderId],
    references: [orderTable.id],
  }),
  product: one(productTable, {
    fields: [orderItemTable.productId],
    references: [productTable.id],
  }),
}));
