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
  uniqueIndex,
  check,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

const createdAt = timestamp("created_at").defaultNow().notNull();

const updatedAt = timestamp("updated_at")
  .defaultNow()
  .notNull()
  .$onUpdate(() => new Date());

export const userTable = pgTable(
  "user",
  {
    id: uuid("id").defaultRandom().notNull().unique(),
    avatar: text("avatar"),
    fullName: text("full_name"),
    username: text("username").notNull(),
    email: text("email").notNull().unique(),
    birthDate: timestamp("birth_date"),
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
    .primaryKey()
    .references(() => userTable.email, {
      onDelete: "cascade",
    }),
  subscriptionId: text("subscription_id"),
  customerId: text("customer_id"),
  priceId: text("price_id"),
  expiresAt: timestamp("expires_at"),
  createdAt,
  updatedAt,
});

export const productTable = pgTable("product", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  flavorProfile: text("flavor_profile").notNull(),
  description: text("description"),
  image: text("image"),
  inStock: boolean("in_stock").default(true),
  createdAt,
  updatedAt,
});

export const productSKUTable = pgTable("product_sku", {
  id: serial("id").primaryKey(),
  productId: serial("product_id").references(() => productTable.id),
  sku: text("sku").notNull(),
  price: integer("price").notNull(), // stored in cents
  sizeAttributeId: serial("size_attribute_id").references(
    () => productAttributeTable.id,
  ),
  grindAttributeId: serial("grind_attribute_id").references(
    () => productAttributeTable.id,
  ),
  createdAt,
  updatedAt,
});

export const productAttributeTypeEnum = pgEnum("attribute_type", [
  "size",
  "grind",
]);

export const productAttributeTable = pgTable(
  "product_attribute",
  {
    id: serial("id").primaryKey(),
    value: text("value").notNull(),
    type: productAttributeTypeEnum("type").notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    return {
      valueTypeUnique: uniqueIndex("value_type_unique").on(
        table.value,
        table.type,
      ),
      checkConstraint: check(
        "check_attribute_value",
        sql`${table.value} IN ('100', '250', '1000', 'whole-bean', 'ground')`,
      ),
    };
  },
);

// export const addCheckConstraint = sql`
//   ALTER TABLE product_attribute
//   ADD CONSTRAINT check_attribute_value_matches_type
//   CHECK (
//     (type = 'size' AND value IN ('100', '250', '1000')) OR
//     (type = 'grind' AND value IN ('whole-bean', 'ground'))
//   );
// `;

//TODO: change text to varchar with a limit declared in addressFormSchema
export const addressTable = pgTable("address", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
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

//TODO: Improve order and order_item tables
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
  productId: serial("product_id")
    .references(() => productTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  productSkuId: serial("product_id")
    .references(() => productSKUTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt,
  updatedAt,
});

export const cartTable = pgTable("cart", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => userTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  total: real("total").default(0).notNull(),
  createdAt,
  updatedAt,
});

export const cartItemTable = pgTable("cart_item", {
  id: serial("id").primaryKey(),
  cartId: serial("cart_id")
    .references(() => cartTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  productId: serial("product_id")
    .references(() => productTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  // TODO: push this table again
  productSkuId: serial("product_sku_id")
    .references(() => productSKUTable.id, {
      onDelete: "cascade",
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

export const productRelations = relations(productTable, ({ many }) => ({
  skus: many(productSKUTable),
}));

export const productSKURelations = relations(productSKUTable, ({ one }) => ({
  product: one(productTable, {
    fields: [productSKUTable.productId],
    references: [productTable.id],
  }),
  sizeAttribute: one(productAttributeTable, {
    fields: [productSKUTable.sizeAttributeId],
    references: [productAttributeTable.id],
  }),
  grindAttribute: one(productAttributeTable, {
    fields: [productSKUTable.grindAttributeId],
    references: [productAttributeTable.id],
  }),
}));

//TODO: maybe is not required
export const productAttributeRelations = relations(
  productAttributeTable,
  ({ many }) => ({
    skus: many(productSKUTable),
  }),
);
