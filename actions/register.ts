"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
// import { generateVerificationToken } from '@/lib/tokens'


export const regsiter = async (values: z.infer<typeof signUpSchema>) => {
    const fieldValidation = signUpSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { fullName, email, password, passwordConfirmation, phone } = fieldValidation.data


    if (password !== passwordConfirmation) return {error: "Password doesn not match"}

    const hashedPassword = await bcrypt.hash(password, 10)
    
    // checking for an existing user
    const emailExist = await getUserByEmail(email)
    
    if (emailExist) {
        return {error: "User already Exist"}
    }
  const user =  await db.user.create({
        data: {
            name: fullName,
            email,
            phone,
            password: hashedPassword,
            emailVerified: new Date().toISOString(),
            role: "USER",
        }
    })

    return { user: user,  success: "User has been created successfully"}
}