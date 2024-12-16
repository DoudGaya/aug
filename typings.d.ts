import { Receiver, Sender } from "@prisma/client"


// interface User {
//     id: string
//     fullName: string 
//     email: string
//     password: string
//     image: string 
// }



interface User {
    id: string
    fullName: string
    email: string
    password: string
    image: string
}




// interface Sender {
//     id:                     string
//     senderBankName:         string
//     senderCompany:          string
//     senderAccountNumber:    string
//     senderAccountName:      string

//   }
  
//   interface Receiver {
//     id:                     string
//     receiverAccountName:    string
//     receiverAccountNumber:  string
//     receiverBankName:       string
//     receiverCompany:        string
   
//   }



interface TransactionsInterface {
    id:                        string   
    userId:                    string
    type:                      string
    product:                   string
    status:                    string
    orderStatus:               string
    totalTransactionAmount:    string
    balance:                   string
    description:               string
    category:                  string  
    sender:                    Sender
    receiver:                  Receiver
    date:                      Date
}