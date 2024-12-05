import { getAllTransactions } from '@/actions/transactions'
import { Transactions } from '@prisma/client'
import React from 'react'

const AdminCasePage = async () => {


  const transactions = await getAllTransactions() as Transactions[]

  return (
    <div className='flex flex-col space-y-4 h-full'>
      <div className=" w-full bg-green-200">
         Hello World
      </div>
      <div className=""></div>

    </div>
    )
}

export default AdminCasePage