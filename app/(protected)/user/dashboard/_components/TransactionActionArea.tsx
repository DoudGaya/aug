'use client'

import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DarkButton } from '@/components/DarkButton'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '@/components/ui/scroll-area'
import { TransactionCard } from './TransactionCard'
import { TransactionForm } from './TransactionForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionsInterface } from '@/typings'
import { currentUser } from '@/lib/auth'

const logout = () => {
  signOut()
}

export function TransactionActionArea({
  transactions
}: {
  transactions: TransactionsInterface[]
}) {
  const [transactionList, setTransaction] = useState<(TransactionsInterface)[]>([...transactions])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const itemsPerPage = 20

  const filteredTransactions = transactionList.filter(transaction =>
    transaction?.balance?.toString().includes(searchTerm.toLowerCase()) ||
    transaction?.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.status?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    transaction?.category?.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.sender.senderCompany?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    transaction?.receiver.receiverCompany?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.receiver.receiverAccountNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.receiver.receiverAccountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction?.receiver?.receiverBankName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col max-h-min py-0 my-0 border-b drop-shadow-sm px-6 w-full">
        <div className="w-full items-center flex bg-yellow-200 dark:bg-yellow-900/70 px-6 justify-between py-4 rounded-lg mb-4">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row w-full md:justify-between md:items-center">
            <div className="flex space-y-2 flex-col">
              <p className=' font-poppins dark:text-yellow-200 font-semibold'>Transaction Management System</p>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='font-poppins py-1 text-yellow-10'>Add Transaction Record</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] h-[80%] md:max-w-xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className='py-5 flex text-center bg-yellow-200 dark:bg-yellow-900 rounded-lg justify-center'>
                        <p className='flex items-start text-center font-poppins dark:text-yellow-200 text-yellow-900'>Add transaction Record</p>
                      </DialogTitle>
                    </DialogHeader>
                    <TransactionForm onSubmit={(data: TransactionsInterface) => setTransaction([...transactions, data])} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4 flex flex-col space-y-2">
               <div className=" flex flex-col space-y-1">
                  <Label htmlFor="search" className='text-base font-poppins dark:text-yellow-200 font-semibold'>Search dispatches</Label>
                  <small className=' text-xs dark:text-yellow-100'>(Bank, Balance, receiver's records, sender's records)</small>
               </div>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by driver name, vehicle number, or product type"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="max-w-sm dark:text-yellow-400 outline-yellow-500 border-yellow-500 placeholder:text-yellow-700 w-[350px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <div className="grid max-w-7xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentTransactions.map((transaction: TransactionsInterface) => (
              <TransactionCard transaction={transaction} key={transaction.id} />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="flex justify-center py-4 bg-white dark:bg-black border-t">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
