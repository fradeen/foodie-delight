import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { restaurant } from '@/lib/schema/restaurant';
import RestaurantFormDialog from './RestaurantForm';
import RestaurantDelistdialog from './RestaurantDelistdialog';

export default function RestaurantCard({ rest, showOptions }: { rest: (typeof restaurant.$inferSelect), showOptions: boolean | undefined }) {
    return (
        <Card className="w-full h-fit max-w-xs sm:max-w-xs md:max-w-sm justify-self-center">
            <CardHeader>
                <CardTitle className='text-2xl'>{rest.name}</CardTitle>
                <CardDescription>Partner Since: {rest.dateAdded.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className='line-clamp-4 h-24 mb-4'>{rest.description}</CardContent>
            <CardFooter className="flex justify-around">
                {
                    showOptions && (
                        <>
                            <RestaurantFormDialog restaurant={{ ...rest, addressLineTwo: rest.addressLineTwo ?? '' }} />
                            <RestaurantDelistdialog id={rest.id} name={rest.name} />
                        </>)
                }
            </CardFooter>
        </Card>
    )
}
