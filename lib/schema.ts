import { stat } from "fs"
import { z } from "zod"


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  phone: z.optional(z.string()),
  image: z.optional(z.any())
}) 

export const settingsSecurityDetailsSchema = z.object({
  oldPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  newPasswordConfirmation: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
}) 


export const loginSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
    password: z.string().min(1, {
      message: "Password is required"
    }),
  })
  

  export const newPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Min of 6 Characters required"
    }),
    passwordConfirmation: z.string().min(6, {
    message: "Min of 6 Characters required"
    }),
  })

  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email must be of type email"
    }),
  })
  

  export const signUpSchema = z.object({
    fullName: z.string().min(2, {
      message: "Please provide your Full Name",
    }),
    email: z.string().min(3, {
      message: "Email address must be less than 2 characters",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    phone: z.string().min(2, {
      message: "Password confirmation must match characters.",
    }),
    passwordConfirmation: z.string().min(6, {
      message: "Password confirmation must match",
    }),
  })


  const senderSchema = z.object({
    senderAccountName: z.string(),
    senderCompany: z.string(),
    senderAccountNumber: z.string(),
    senderBankName: z.string(),
  })

  const receiverSchema = z.object({
    receiverAccountName: z.string(),
    receiverAccountNumber: z.string(),
    receiverBankName: z.string(),
    receiverCompany: z.string(),
  })

  export const transactionsSchema = z.object({
    type: z.string(),
    product: z.string(),
    balance: z.string(),
    status: z.string(),
    totalTransactionAmount: z.string(),
    bankName: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
    sender: senderSchema,
    receiver: receiverSchema
  })


