import React from 'react'
import { drizzle } from 'drizzle-orm/d1'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { restaurant } from '@/lib/schema/restaurant';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import RestaurantFormDialog from '@/components/RestaurantForm';

export const runtime = 'edge'

export default async function Dashboard() {
    const db = drizzle(getRequestContext().env.DB);
    const restaurants = await db.select().from(restaurant).all()
    return (
        <div className='flex flex-col sm:flex-row gap-2 items-center justify-center mt-40'>
            {
                restaurants.map(restaurant => (
                    <Card key={restaurant.id} className="w-full h-full sm:max-w-xs md:max-w-sm">
                        <CardHeader>
                            <CardTitle className='text-2xl'>{restaurant.name}</CardTitle>
                            <CardDescription>Partner Since: {restaurant.dateAdded.toDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>{restaurant.description}</CardContent>
                        <CardFooter className="flex justify-around">
                            <Button variant='outline'>Update Details</Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='destructive'>Delist</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] bg-inherit">
                                    <DialogHeader>
                                        <DialogTitle>Delist: {restaurant.name}</DialogTitle>
                                        <DialogDescription>
                                            Delisting a restaurant is permanent; once delisted all dishes associated to it will also be permanently removed.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Button variant='destructive'>Delist: {restaurant.name}</Button>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))
            }
            <Card className="w-full sm:max-w-xs md:max-w-sm">
                <CardHeader>
                    <CardTitle className='text-center'>Add new Restaurant</CardTitle>
                    {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                </CardHeader>
                {/* <CardContent>
                </CardContent> */}
                <CardFooter className="flex justify-around">
                    <RestaurantFormDialog />
                </CardFooter>
            </Card>
        </div>
    )
}
