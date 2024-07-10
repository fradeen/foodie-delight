import React from 'react'
import Image from 'next/image'
import { drizzle } from 'drizzle-orm/d1';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { restaurant } from '@/lib/schema/restaurant';
import { eq } from 'drizzle-orm';

export const runtime = 'edge'

export default async function RestaurantInfo({ params }: { params: { id: number } }) {
    const db = drizzle(getRequestContext().env.DB);
    const restaurants = await db.select().from(restaurant).where(eq(restaurant.id, params.id))
    return (
        <article className='grow flex flex-col md:block mt-10' aria-label='about restaurant'>
            <div className='mx-auto relative md:float-start w-full max-w-xs md:max-w-none md:w-2/5 aspect-square rounded-lg overflow-hidden md:mr-5'>
                <Image src={`/restaurant_${(params.id % 4) + 1}.jpg`} alt='Restaurant Image' width={640} height={640} className='mx-auto' />
            </div>
            <h1 className='mx-auto text-center md:text-start text-4xl font-semibold'>{restaurants[0].name}</h1>
            <section className='text-muted-foreground my-5'>
                Partner Since:{restaurants[0].dateAdded.toDateString()}
            </section>
            <section className='text-xl text-justify'>
                {restaurants[0].description}
            </section>
        </article>
    )
}
