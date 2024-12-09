import { db } from "@/lib/db";
import { User } from "lucide-react";

export const getUserByEmail = async (email: string) => {
   try {
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })
    return user
    
   } catch (error) {
        console.log(error)
   }
}

export const getUserByIdWithTransaction = async (id: string) => {
    try {
        const users = await db.user.findUnique({
            where: {
                id
            },
            include: {
                transactions: true
            }
        })
        return users
    } catch (error) {
        console.log(error)
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            },
        })
        return user
        
    } catch (error) {
       console.log(error)
    }
}



export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({
            where: {
                role: "user"
            },
            include: {
                transactions: true,
            }
        })
        return users
    } catch (error) {
        console.log(error)
    }
}

