import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { restaurant } from "./restaurant";

export const dish = sqliteTable('dish', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    isVegan: integer('isVegan', { mode: 'boolean' }).notNull(),
    restaurantId: integer('restaurantId', { mode: 'number' }).references(() => restaurant.id),
    dateAdded: integer('dateAdded', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
})
