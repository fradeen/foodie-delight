import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { restaurant } from '@/lib/schema/restaurant';
import RestaurantFormDialog from './RestaurantForm';
import RestaurantDelistdialog from './RestaurantDelistdialog';
import Image from 'next/image';

export default function RestaurantCard({ rest, showOptions }: { rest: (typeof restaurant.$inferSelect), showOptions: boolean | undefined }) {
    return (
        <Card className="w-full h-fit max-w-xs sm:max-w-xs md:max-w-sm justify-self-center">
            <CardHeader>
                <CardTitle className='text-2xl line-clamp-1'>{rest.name}</CardTitle>
                <CardDescription>Partner Since: {rest.dateAdded.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center gap-5'>
                <Image src={`/restaurant_${(rest.id % 4) + 1}.jpg`} width={640} height={640} alt='' className='rounded-lg' />
                <span className='line-clamp-4 h-24'>{rest.description}</span>
            </CardContent>
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
