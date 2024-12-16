import { getAllTransactions } from '@/actions/transactions'
import React from 'react'
import { TransactionActionArea } from './_components/TransactionActionArea'
import { TransactionsInterface } from '@/typings'

const AdminCasePage = async () => {
  const transactions = await getAllTransactions() as TransactionsInterface[]

  return (
    <div className='flex flex-col space-y-4 w-full'>
        <div className=" w-full">
            <TransactionActionArea transactions={transactions} />
        </div>
    </div>
    )
}
export default AdminCasePage