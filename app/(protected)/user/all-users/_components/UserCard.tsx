import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TransactionsInterface, UserWithTransactions } from "@/typings"





export function UserCard({ user }:{ user: UserWithTransactions}) {

  return (
    <div className=" w-full border flex-col items-center border-gray-300 py-6 px-3 flex bg-white rounded-lg">
      <div className=" h-[50px] w-[50px] rounded-full ">
      
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" stroke-1 stroke-yellow-700 size-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>

      </div>
      <p className=" text-sm"> { user.email } </p>
      <p className=" font-semibold"> { user.name } </p>

      <div className=" flex justify-between bg-yellow-50 my-3 px-3 rounded-lg py-2 items-center w-full">
        <div className="">Transactions </div>
        <div className=" text-lg">
            {user.transactions.length}
        </div>
      </div>
    </div>
  )
}

