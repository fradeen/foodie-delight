import React from 'react'
import { restaurant } from '@/lib/schema/restaurant'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'
export default function RestaurantSearchCard({ rest }: { rest: (typeof restaurant.$inferSelect) }) {
    return (
        <Card className="w-full aspect-[3/1] p-2">
            <div className='flex gap-1 justify-between items-center'>
                <div className='p-1 basis-2/3'>
                    <CardHeader className='p-0'>
                        <CardTitle className='text-2xl line-clamp-1'>{rest.name}</CardTitle>
                        <CardDescription>Partner Since: {rest.dateAdded.toDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <span className='line-clamp-2 h-12'>{rest.description}</span>
                    </CardContent>
                </div>
                <CardFooter className='p-0 basis-1/3 flex justify-around'>
                    <Image src={`/restaurant_${(rest.id % 4) + 1}.jpg`} width={640} height={640} alt='' className='rounded-lg' />
                </CardFooter>
            </div>
        </Card>
    )
}
