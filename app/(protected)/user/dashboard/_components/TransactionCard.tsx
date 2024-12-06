import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionsInterface } from "@/typings"





export function TransactionCard({ transaction }:{ transaction:TransactionsInterface}) {



  console.log(transaction)
  return (
    <Card className=" border-yellow-100">
      <CardHeader className=" flex flex-col space-y-0">
       <div className=" w-full flex space-x-2 py-2 items-baseline border-b px-3  border-yellow-200  ">
       <h2 className=" text-lg font-semibold">Transaction Records</h2>
       <small className="  text-xs font-semibold "> ({ transaction.date.toDateString() }) </small>
       </div>
      </CardHeader>
        <CardContent>

          <div className=" flex flex-col space-y-4 p-4">
            <div className=" flex ">
              <div className=" flex flex-col space-y-0">
                <p className=" text-base font-poppins">Product Details</p>
                <div className=" flex space-x-3 flex-wrap">
                  <span className=" font-mono px-1 py-0.5">{transaction.product}</span>
                  <span className=" font-mono px-1 py-0.5">{transaction.type}</span>
                  <span className=" font-mono px-1 py-0.5">{transaction.category}</span>
                  {/* <span className=" font-mono px-1 py-0.5">{transactio}</span> */}
                </div>
              </div>   
            </div>


            <div className=" flex ">
              <div className=" flex flex-col space-y-0">
                <p className=" text-base font-poppins">Transaction Records</p>
                <div className=" flex space-x-3 flex-wrap">
                  <span className=" font-mono px-1 py-0.5">{transaction.product}</span>
                  <span className=" font-mono px-1 py-0.5">{transaction.type}</span>
                  <span className=" font-mono px-1 py-0.5">{transaction.category}</span>
                  {/* <span className=" font-mono px-1 py-0.5">{transactio}</span> */}
                </div>
              </div>   
            </div>
          </div>
        </CardContent>
    </Card>
  )
}

