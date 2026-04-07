import { z } from 'zod';

export const registerUserSchema = z.object({
    email: z.string().email("Invalid email format").toLowerCase(),
    username: z.string().min(3, "username must be atleast 3 characters").max(20, "username is too long!").trim(),
    password:z.string().min(6,"pasword must be atleast 6 characters.")
})
export const loginUserSchema=z.object({
    email: z.string().email("Invalid email format").toLowerCase(),
 
    password:z.string().min(6,"pasword must be atleast 6 characters.")
})