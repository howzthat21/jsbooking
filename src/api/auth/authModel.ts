import { z } from "zod";



export const RegisterSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5),
    name:z.string().optional(),
    role:z.enum(['USER', 'ADMIN']).default('USER')

})

export type RegisterDTO = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5)
})


export type LoginDTO = z.infer<typeof LoginSchema>

export const UpdateSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5),
    name:z.string()
})

export type UpdateDTO = z.infer<typeof UpdateSchema>



