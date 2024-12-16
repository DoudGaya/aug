import { getAllTransactions } from '@/actions/transactions'
import React from 'react'
import { UsersActionCard } from './_components/UsersActionCard'
import { TransactionsInterface, UserWithTransactions } from '@/typings'
import { getAllUsers } from '@/data/user'

const AdminCasePage = async () => {
    // @ts-ignore
  const users = await getAllUsers() as UserWithTransactions[]

  return (
    <div className='flex flex-col space-y-4 w-full'>
        <div className=" w-full">
            <UsersActionCard users={users} />
        </div>
    </div>
    )
}
export default AdminCasePage