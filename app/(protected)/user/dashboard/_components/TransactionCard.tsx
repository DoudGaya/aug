"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TransactionsInterface } from "@/typings"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { UpdateTransactionForm } from "./UpdateTransactionForm"
import { deleteTransactions } from "@/actions/transactions"






export function TransactionCard({ transaction }:{ transaction:TransactionsInterface}) {

  const router = useRouter()

  const {toast} = useToast()

  const deleteCard = () => {
    handleDelete(transaction.id)
  }


  const handleDelete = async (id: string) => {
    await deleteTransactions(id)
    router.refresh()
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been successfully deleted",
    })
  }


  // const handleDelete = ( id: string) => { 
  //   deleteTRansaction(id)

  //   toast({
  //     title: "Transaction Deleted",
    
  //   })
  // }


  return (
    <Card className=" border-yellow-100">
      <CardHeader className=" flex flex-col space-y-0">
       <div className=" w-full flex flex-col justify-center items-center text-center py-6 px-3  ">
       <h2 className={`text-2xl font-poppins ${transaction.status == "Pending" ? " text-yellow-500" : transaction.status == "Completed" ? " text-green-500" : transaction.status == "Canceled" ? " text-red-600" : " text-green-500"} font-bold`}> { transaction.status || "Completed" }</h2>
       <small className="  text-xs font-semibold "> ({ transaction.date.toDateString() }) </small>
        <div className=" flex w-full justify-center items-center text-center py-3">
              <span className={` ${ transaction.orderStatus === 'Shipped' ? 'bg-green-500' : transaction.orderStatus === 'Processing' ? 'bg-yellow-400' : transaction.orderStatus === 'Received' ? ' bg-green-700 text-white' : " bg-gray-300 dark:bg-gray-800" } text-xs px-3 py-0.5 rounded-full font-semibold font-poppins `}> { transaction?.orderStatus } </span>
          </div>
       {/* <div className=" flex w-full py-3">
            <span className={` ${ transaction.orderStatus === 'Shipped' ? 'bg-green-500' : transaction.orderStatus === 'Processing' ? 'bg-yellow-600' : transaction.orderStatus === 'Recieved' ? '' : "" } text-xs rounded-lg `}> { transaction?.orderStatus } </span>
        </div>   */}
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
            <div className=" w-full flex flex-col justify-center">
            </div>
            <div className=" flex rounded-lg">
              <div className=" flex flex-col space-y-3">
                <p className="  font-poppins">Product Details</p>
              
                <div className=" flex space-x-1 flex-wrap">
                  <span className=" bg-stone-200 dark:bg-gray-800 px-2 text-xs rounded-lg">{transaction.product}</span>
                  <span className=" bg-stone-200 dark:bg-gray-800 px-2 text-xs rounded-lg">{transaction.type}</span>
                </div>
              </div>   
            </div>
          </div>
        </CardContent>

        <Dialog>
            <div className="  flex justify-between w-full p-2">
          <DialogTrigger asChild className=" ">
                <Button className='font-poppins py-1 text-yellow-10'>Update Record</Button>
          </DialogTrigger>


            <AlertDialog>
              <AlertDialogTrigger>
                  <p className='font-poppins py-1 bg-transparent text-red-500 px-3 underline' >Delete Record</p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your transaction.

                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                  <AlertDialogAction className=" bg-red-300 text-red-700 hover:bg-red-400"> 
                    <button className="" onClick={deleteCard}>Yes Delete</button>
                    </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>


            </div>
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

