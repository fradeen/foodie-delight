import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const restaurant = sqliteTable('restaurant', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    addressLineOne: text('address').notNull(),
    addressLineTwo: text('address'),
    city: text('address').notNull(),
    pinCode: text('address').notNull(),
    dateAdded: integer('dateAdded', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})
