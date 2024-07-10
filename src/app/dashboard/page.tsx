import React from 'react'
import { drizzle } from 'drizzle-orm/d1'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { restaurant } from '@/lib/schema/restaurant';
import RestaurantFormDialog from '@/components/RestaurantForm';
import RestaurantCard from '@/components/RestaurantCard';

export const runtime = 'edge'

export default async function Dashboard() {
    const db = drizzle(getRequestContext().env.DB);
    const restaurants = await db.select().from(restaurant).all()
    return (
        <>
            <div className='flex justify-between items-center gap-2 mt-10'>
                <h1 className='text-3xl font-semibold'>Add/Update Restaurants</h1>
                <RestaurantFormDialog />
            </div>
            <div className={` mx-auto w-fit grid grid-cols-1 ${restaurants.length > 1 ? 'sm:grid-cols-2' : ''} ${restaurants.length > 2 ? 'md:grid-cols-3' : ''} justify-items-center content-center gap-5 mt-10`}>
                {
                    restaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.id} rest={restaurant} showOptions={true} />
                    ))
                }
            </div>
        </>
    )
}
