"use server"

import { drizzle } from "drizzle-orm/d1";
import { restaurantSchema, restaurantType } from "./zod_Schema/restaurant";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { restaurant } from "./schema/restaurant";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";

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
        if (err instanceof Error)
            return err.message
    }
    revalidatePath('/dashboard')
}

export async function updateRestaurant(rest: { restaurant: restaurantType, id: number }) {
    try {
        const db = drizzle(getRequestContext().env.DB)
        const validateRestarunt = restaurantSchema.safeParse(rest.restaurant)
        if (!validateRestarunt.success) {
            return validateRestarunt.error.flatten()
        }
        if (!rest.id)
            return 'No restaurant id provided.'
        const queryResult = await db.update(restaurant)
            .set(validateRestarunt.data)
            .where(eq(restaurant.id, rest.id))
        console.log(queryResult)
    } catch (err) {
        console.log(err)
        if (err instanceof Error)
            return err.message
    }
    revalidatePath('/dashboard')
}

export async function deleteRestaurant(id: number) {
    try {
        const db = drizzle(getRequestContext().env.DB)
        const queryResult = await db.delete(restaurant)
            .where(eq(restaurant.id, id))
        console.log(queryResult)
    } catch (err) {
        console.log(err)
        if (err instanceof Error)
            return err.message
    }
    revalidatePath('/dashboard')
}

export async function getRestaurant(page: number = 1) {
    try {
        const db = drizzle(getRequestContext().env.DB)
        const queryResult = await db
            .select()
            .from(restaurant)
            .orderBy(asc(restaurant.dateAdded))
            .limit(3)
            .offset((page - 1) * 3)
        return queryResult
    } catch (err) {
        console.log(err)
    }
    revalidatePath('/dashboard')
}