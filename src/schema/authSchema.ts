import { z } from "zod";


export const registerSchema = z.object({
    email:z.string().email('invalid email address'),
    password:z.string().min(5, password)
    name:z.string().optional(),
    role:z.enum(['USER','ADMIN']).default('USER')
})

const RegisterDTO = z.infer<typeof registerSchema>;

export const signInSchema = z.object({
  email: z.string().email('invalid email address'),
  password:z.string(),
  
})


export const updateSchema = z.object({
  email:z.string().email('invalid email address'),
  password:z.string().min(5, password)
  name:z.string

}) 
