import { z } from "zod";

export const CourtSchema = z.object({
    name:z.string(),
    location: z.string(),
    pricePerHour: z.number()

})

export type CourtDTO = z.infer<typeof CourtSchema >