import React from 'react'
import { drizzle } from 'drizzle-orm/d1'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { restaurant } from '@/lib/schema/restaurant';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RestaurantFormDialog from '@/components/RestaurantForm';
import RestaurantDelistdialog from '@/components/RestaurantDelistdialog';

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
            <div className={`grid grid-cols-1 ${restaurants.length > 1 ? 'sm:grid-cols-2' : ''} ${restaurants.length > 2 ? 'md:grid-cols-3' : ''} justify-items-center content-center gap-5 mt-10`}>
                {
                    restaurants.map(restaurant => (
                        <Card key={restaurant.id} className="w-full h-fit max-w-xs sm:max-w-xs md:max-w-sm justify-self-center">
                            <CardHeader>
                                <CardTitle className='text-2xl'>{restaurant.name}</CardTitle>
                                <CardDescription>Partner Since: {restaurant.dateAdded.toDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent className='line-clamp-4 h-24 mb-4'>{restaurant.description}</CardContent>
                            <CardFooter className="flex justify-around">
                                <RestaurantFormDialog restaurant={{ ...restaurant, addressLineTwo: restaurant.addressLineTwo ?? '' }} />
                                <RestaurantDelistdialog id={restaurant.id} name={restaurant.name} />
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
