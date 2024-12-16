"use server"
import { transactionsSchema } from "@/lib/schema";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";



export const deleteTransactions = async (id: string) => {
    const transactionExists = await  getTTransactionById(id);

    if (!transactionExists) {
        return {error: "Transaction does not exist"}
    }

    await db.transactions.delete({
        where: {
            id,
        }
    })
    return {success: "Transaction deleted successfully" }
 }




 export const getTTransactionById = async (id: string) => {
    const transaction = await db.transactions.findUnique({
        where: {
            id,
        },
        include: {
            receiver: true,
            sender: true,
            user: true,
        }
    })

    return transaction;
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


export const getMyTransactions = async () => {

    const user = await currentUser()


    if (!user) {
        return {error: "User does not exist"}
    }
    const transactions = await db.transactions.findMany( {
        where: {
            userId: user.id
        },
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
        return {error: "User does not exist"}

     }



     const transaction = await db.transactions.create({
        // @ts-ignore
        data: {
            product,
            status,
            balance,
            totalTransactionAmount,
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



export const updateTransaction = async (id: string, values: z.infer<typeof transactionsSchema>) => {
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
        orderStatus,    
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

     const transaction = await db.transactions.update({
        where: {
            id
        },
        data: {
            product,
            status,
            balance,
            totalTransactionAmount,
            type,
            description,
            
            category,
            sender: {
                update: {
                    senderAccountName,
                    senderAccountNumber,
                    senderBankName,
                    senderCompany,
                },
            },
            receiver: {
                update: {
                    receiverAccountName,
                    receiverAccountNumber,
                    receiverBankName,
                    receiverCompany,
                }
            }
        }
     })

     return { data: transaction, success: "Transaction updated successfully" };
}