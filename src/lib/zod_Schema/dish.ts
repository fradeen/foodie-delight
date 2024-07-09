import { z } from 'zod'

export const dishSchema = z.object({
    name: z.string().min(10).max(100),
    isVegan: z.boolean(),
    restaurantId: z.number().int(),
    description: z.string().refine(string => {
        const wordCount = string.split(' ').length
        return wordCount >= 5 && wordCount <= 100
    }, { message: 'Description should have word count between 5 and 100.' }),
})

export type dishType = z.infer<typeof dishSchema>