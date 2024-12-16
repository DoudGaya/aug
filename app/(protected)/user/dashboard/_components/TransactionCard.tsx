"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TransactionsInterface } from "@/typings"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { UpdateTransactionForm } from "./UpdateTransactionForm"






export function TransactionCard({ transaction }:{ transaction:TransactionsInterface}) {

  const router = useRouter()

  const deleteTRansaction = async ( id: string ) => {

    await deleteTRansaction( id ) 

  }


  const handleDelete = ( id: string) => { 
    deleteTRansaction(id)
    router.refresh()
    return {success: "Item Deleted"}
  }


  return (
    <Card className=" border-yellow-100">
      <CardHeader className=" flex flex-col space-y-0">
       <div className=" w-full flex flex-col justify-center items-center text-center py-6 px-3  ">
       <h2 className={`text-2xl font-poppins ${transaction.status == "Pending" ? " text-yellow-500" : transaction.status == "Completed" ? " text-green-500" : transaction.status == "Canceled" ? " text-red-600" : " text-green-500"} font-bold`}> { transaction.status || "Completed" }</h2>
       <small className="  text-xs font-semibold "> ({ transaction.date.toDateString() }) </small>
       </div>
      </CardHeader>
        <CardContent>
          <div className=" flex flex-col space-y-6 px-3">
            <div className=" flex flex-col">              
              <div className=" flex flex-col space-y-2">
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Total Amount</small>
                  <div className="flex text-gray-700 items-center space-x-0.5">
                    <small className=" font- text-sm ">₦</small>
                  <p className=" text-sm font-semibold"> {transaction.totalTransactionAmount} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Balance</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                      <small className=" font- text-sm ">₦</small>
                    <p className=" text-sm font-semibold"> {transaction.balance} </p>
                  </div>
                </div>
                <div className=" flex flex-col">
                    <p>Sender's Information</p>
                </div>
                <Separator />
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Company</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none bg-yellow-300 text-yellow-900 px-2 rounded-full"> {transaction?.sender?.senderCompany} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Account</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.sender?.senderAccountName} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Account Number</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.sender?.senderAccountNumber} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Bank</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.sender?.senderBankName} </p>
                  </div>
                </div>
                <div className=" flex flex-col">
                    <p>Receiver's Information</p>
                </div>
                <Separator />
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Company</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none bg-yellow-300 text-yellow-900 px-2 rounded-full"> {transaction?.receiver?.receiverCompany} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Account</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.receiver?.receiverAccountName} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Account Number</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.receiver?.receiverAccountNumber} </p>
                  </div>
                </div>
                <div className=" flex justify-between items-center">
                  <small className=" text-xs font-poppins text-gray-500 font-">Bank</small>
                    <div className="flex text-gray-700 items-center space-x-0.5">
                    <p className=" text-xs flex-none"> {transaction?.receiver?.receiverBankName} </p>
                  </div>
                </div>
              </div>   
            </div>
            <Separator />
            <div className=" w-full flex flex-col space-y-2">
            </div>
            <div className=" flex ">
              <div className=" flex flex-col space-y-3">
                <p className=" font- font-poppins">Product Details</p>
                <span> { transaction.orderStatus } </span>
                <div className=" flex space-x-1 flex-wrap">
                  <span className=" bg-stone-200 px-2 text-xs rounded-lg">{transaction.product}</span>
                  <span className=" bg-stone-200 px-2 text-xs rounded-lg">{transaction.type}</span>
                  <span className=" bg-stone-200 px-2 text-xs rounded-lg">{transaction.category}</span>
                </div>
              </div>   
            </div>
          </div>
        </CardContent>

        <Dialog>
          <DialogTrigger asChild className=" w-full p-2">
            <div className="  flex justify-between">
                <Button className='font-poppins py-1 text-yellow-10'>Update Record</Button>
                <Button className='font-poppins py-1 bg-transparent text-red-500' variant={'link'}>Update Record</Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] w-full h-[80%] md:max-w-xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className='py-5 flex text-center bg-yellow-200 dark:bg-yellow-900 rounded-lg justify-center'>
                <p className='flex items-start text-center font-poppins dark:text-yellow-200 text-yellow-900'>Update Record</p>
              </DialogTitle>
            </DialogHeader>
            <CardFooter className=" w-full">
                <UpdateTransactionForm transaction={transaction} />
            </CardFooter>
            {/* <TransactionForm onSubmit={(data: TransactionsInterface) => setTransaction([...transactions, data])} /> */}
          </DialogContent>
        </Dialog>
        {/* <CardFooter className=" flex justify-center"> <Button onClick={ handleDelete() } className=" py-2">Delete</Button> </CardFooter> */}
    </Card>
  )
}

