import { pgTable, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const size = pgEnum("size", ['5', '10', '15', '30', '50', '75', '100', '125', '150', '200'])
export const status = pgEnum("status", ['fulfilled', 'shipped', 'awaiting_shipment'])



