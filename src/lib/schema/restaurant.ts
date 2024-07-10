import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const restaurant = sqliteTable('restaurant', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    addressLineOne: text('addressLineOne').notNull(),
    addressLineTwo: text('addressLineTwo'),
    city: text('city').notNull(),
    pinCode: text('pinCode').notNull(),
    state: text('state').notNull(),
    dateAdded: integer('dateAdded', { mode: 'timestamp_ms' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})
