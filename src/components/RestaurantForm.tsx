'use client'
import React, { useRef } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { restaurantSchema, restaurantType } from '@/lib/zod_Schema/restaurant';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { addRestaurant, updateRestaurant } from '@/lib/actions';
import { useToast } from './ui/use-toast';
import { z } from 'zod';

export default function RestaurantFormDialog({ restaurant }: { restaurant?: (restaurantType & { id: number }) }) {
    let closeButtonRef = useRef<HTMLButtonElement>(null)
    const { toast } = useToast()
    const form = useForm<restaurantType>({
        resolver: zodResolver(restaurantSchema),
        defaultValues: restaurant ?? {
            name: '',
            addressLineOne: '',
            state: '',
            city: '',
            pinCode: '',
            description: '',
            addressLineTwo: ''
        }
    })
    async function onSubmit(values: restaurantType) {
        let error: (z.inferFlattenedErrors<typeof restaurantSchema> | string | undefined)
        if (restaurant && restaurant.id)
            await updateRestaurant.bind(null, { restaurant: values, id: restaurant.id })()
        else
            await addRestaurant.bind(null, values)()
        closeButtonRef.current?.click()
        toast({
            title: `${error ? "Uh oh! Something went wrong." : restaurant ? 'Restaurant details updated' : 'Restaurant added'} successfully.`,
            description: error ? error.toString() : undefined,
            variant: `${error ? 'destructive' : 'default'}`
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={`${restaurant ? 'outline' : 'default'}`}>{restaurant ? 'Update Details' : 'Add new Restaurant'}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-inherit overflow-y-auto max-h-[96%]">
                <DialogHeader>
                    <DialogTitle>{restaurant?.name ?? 'Add new Restaurant'}</DialogTitle>
                    <DialogDescription>
                        {`${restaurant ? 'Update' : 'Add new'} restaurant details.`}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Restaurant Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>About Restaurant</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="About Restaurant" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addressLineOne"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address line 1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addressLineTwo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address line 2</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Address line 2" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pinCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pincode</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Pincode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="State" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogClose asChild>
                            <button ref={closeButtonRef} type='button' className='hidden' tabIndex={-1} />
                        </DialogClose>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
