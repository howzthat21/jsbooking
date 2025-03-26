import { z } from "zod";


export const registerSchema = z.object({
    email:z.string().email('invalid email address'),
    password:z.string().min(5, 'password weak'),
    name:z.string().optional(),
    role:z.enum(['USER','ADMIN']).default('USER')
})

type RegisterDTO = z.infer<typeof registerSchema>;

export const signInSchema = z.object({
  email: z.string().email('invalid email address'),
  password:z.string().min(5, 'password weak')
  
})


export const updateSchema = z.object({
  email:z.string().email('invalid email address'),
  password:z.string().min(5, 'password weak'),
  name:z.string()

}) 
