import { z } from 'zod'

export const restaurantSchema = z.object({
    name: z.string().trim().min(10).max(100),
    addressLineOne: z.string().trim().min(10).max(150),
    addressLineTwo: z.union([z.string().length(0), z.string().min(10).max(150)]).transform((e: string) => e === "" ? undefined : e).optional(),
    state: z.string().min(3).trim().max(20),
    city: z.string().min(3).trim().max(20),
    pinCode: z.string().trim().regex(/^[1-9]+$/).regex(/^[1-9][0-9]{5}$/),
    description: z.string().trim().refine(string => {
        const wordCount = string.split(' ').length
        return wordCount >= 5 && wordCount <= 100
    }, { message: 'Description should have word count between 5 and 100.' }),
})

export type restaurantType = z.infer<typeof restaurantSchema>