"use server"
import { transactionsSchema } from "@/lib/schema";
import * as z from "zod";
import { db } from "@/lib/db";



export const deleteDispatchById = async (id: string) => {
    const dispatch = await db
 }


export const getAllTransactions = async () => {
    const dispatch = await db.transactions.findMany( {
        orderBy: {
         date: "asc"   
        }
    })
    return dispatch;
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
