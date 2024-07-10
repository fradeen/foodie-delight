import React from 'react'
import { restaurant } from '@/lib/schema/restaurant'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image'
export default function RestaurantSearchCard({ rest }: { rest: (typeof restaurant.$inferSelect) }) {
    return (
        <Card className="w-full h-fit">
            <CardHeader>
                <CardTitle className='text-2xl'>{rest.name}</CardTitle>
                <CardDescription>Partner Since: {rest.dateAdded.toDateString()}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-row-reverse items-center justify-between gap-5'>
                <Image src={`/restaurant_${(rest.id % 4) + 1}.jpg`} width={640} height={640} alt='' className='rounded-lg size-20' />
                <span className='line-clamp-4 h-24'>{rest.description}</span>
            </CardContent>
        </Card>
    )
}
