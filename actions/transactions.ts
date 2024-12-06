"use server"
import { transactionsSchema } from "@/lib/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";



export const deleteDispatchById = async (id: string) => {
    const dispatch = await db
 }


export const getAllTransactions = async () => {
    const transactions = await db.transactions.findMany( {
        include: {
            receiver: true,
            sender: true,
            user: true,
        },
        orderBy: {
         date: "asc"   
        }
    })
    return transactions;
}


export async function createTransaction(values: z.infer<typeof transactionsSchema>) {
    const fieldValidation = transactionsSchema.safeParse(values);
    if (!fieldValidation.success) {
        return { error: "field Validation failed " };
    }

    const { 
        type,
        product,
        totalTransactionAmount,
        status,
        description,
        category,
        balance,
        sender: {
            senderAccountName,
            senderAccountNumber,
            senderBankName,
            senderCompany,
        }
        ,
        receiver: {
            receiverAccountName,
            receiverAccountNumber,
            receiverBankName,
            receiverCompany,
        }

     } = fieldValidation.data;


     const user = await currentUser()


     if (!user) {
        return {error: "Unauthorized"}
     }


     const transaction = await db.transactions.create({
        // @ts-ignore
        data: {
            product,
            status,
            balance: parseFloat(balance),
            totalTransactionAmount: parseFloat(totalTransactionAmount),
            type,
            description,
            category,
            user: {
                connect: {
                    id: user.id,
                },
            },
            sender: {
                create: {
                    senderAccountName,
                    senderAccountNumber,
                    senderBankName,
                    senderCompany,
                },
            },
            receiver: {
                create: {
                    receiverAccountName,
                    receiverAccountNumber,
                    receiverBankName,
                    receiverCompany,
                }
        }
     }})

     return { data: transaction, success: "Check your email to verify your account!" };
}
