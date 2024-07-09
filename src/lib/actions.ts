"use server"

import { drizzle } from "drizzle-orm/d1";
import { restaurantSchema, restaurantType } from "./zod_Schema/restaurant";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { restaurant } from "./schema/restaurant";
import { revalidatePath } from "next/cache";

export async function addRestaurant(rest: restaurantType) {
    try {
        const db = drizzle(getRequestContext().env.DB)
        const validateRestarunt = restaurantSchema.safeParse(rest)
        if (!validateRestarunt.success) {
            return validateRestarunt.error.flatten()
        }
        const queryResult = await db.insert(restaurant).values(validateRestarunt.data)
        console.log(queryResult)
    } catch (err) {
        console.log(err)
    }
    revalidatePath('/dashboard')
}