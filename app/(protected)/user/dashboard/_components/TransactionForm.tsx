'use client'

import { startTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { TransactionsInterface } from '@/typings'
import { Textarea } from "@/components/ui/textarea"
import { transactionsSchema } from '@/lib/schema'
import { createTransaction } from '@/actions/transactions'
import { Separator } from '@/components/ui/separator'
import { nigerianBanks } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormError } from '@/components/FormError'

const paymentStatus = ['Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled']

export function TransactionForm({ onSubmit }: { onSubmit: (transaction: TransactionsInterface) => void }) {
  const [isPending, setIsPending] = useState(false)
  // const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()

  const form = useForm<z.infer<typeof transactionsSchema>>({
    resolver: zodResolver(transactionsSchema),
    defaultValues: {
      totalTransactionAmount: '',
      balance: '',
      status: '',
      type: '',
      category: '',
      product: '',
      description: '',
      receiver: {
        receiverAccountName: '',
        receiverAccountNumber: '',
        receiverBankName: '',
        receiverCompany: '',
      },
      sender: {
        senderAccountName: '',
        senderAccountNumber: '',
        senderBankName: '',
        senderCompany: '',
      },
    },
  })

  async function handleSubmit(values: z.infer<typeof transactionsSchema>) {

    setError('')
    setSuccess('')
    setIsPending(true)
    try {
    const data = await createTransaction(values)
    if (data.error) {
      setError(data.error)
      return
    } 
    // @ts-ignore
    if (data.success) {
      await onSubmit(data.data as TransactionsInterface)
      form.reset()
      setIsPending(false)
      router.refresh()
    }
    await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      
    }
  }




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4">
         <fieldset className=' border-2 rounded-lg  border-yellow-500 flex flex-col items-start text-center w-full p-4'>
            <legend className=' font-poppins text-lg font-semibold px-3 text-yellow-500 self-center'>Sender's Information</legend>
          <div className=" flex flex-col text-start space-y-4 w-full ">
          <FormField
            control={form.control}
            name="sender.senderCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>My Company</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sender.senderAccountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>My Account Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sender.senderAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>My Account Number</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
              control={form.control}
              name="sender.senderBankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' dark:text-yellow-200'>Select Bank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nigerianBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.name}>{bank.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
         </fieldset>


          <Separator  /> 

          <fieldset className=' border-2 rounded-lg  border-yellow-500 flex flex-col items-start text-center w-full p-4'>
            <legend className=' font-poppins text-lg font-semibold px-3 text-yellow-500 self-center'>Reciever's Information</legend>
          <div className=" flex flex-col text-start space-y-4 w-full ">
          <FormField
            control={form.control}
            name="receiver.receiverCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Receiver Company</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiver.receiverAccountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Receiver Account Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="receiver.receiverAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Receiver Account Number</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="receiver.receiverBankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' dark:text-yellow-200'>Receiver Bank</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className=' dark:text-yellow-200' placeholder="Select Bank" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nigerianBanks.map((bank) => (
                        <SelectItem className=' dark:text-yellow-200' key={bank.id} value={bank.name}>{bank.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

        <FormField
            control={form.control}
            name="receiver.receiverAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Receiver Account Number</FormLabel>
                <FormControl>
                    <Input disabled={isPending} {...field} placeholder="Type your message here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         </div>
         </fieldset>

      <fieldset className=' border-2 rounded-lg  border-yellow-500 flex flex-col items-start text-center w-full p-4'>
        <legend className=' font-poppins text-lg font-semibold px-3 text-yellow-500 self-center'>Order Information</legend>
          <div className=" grid grid-cols-2 text-start gap-4 w-full ">

          <FormField
            control={form.control}
            name="totalTransactionAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Transaction Amount</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value).toLocaleString());
                      }
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Balance</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(value))) {
                        field.onChange(Number(value).toLocaleString());
                      }
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=' dark:text-yellow-200'>Paymanet Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className=' dark:text-yellow-200' placeholder="Select Payment Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentStatus.map((status) => (
                        <SelectItem className=' dark:text-yellow-200' key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />



        <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Product Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Product Type</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' dark:text-yellow-200'>Product Category</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel className=' dark:text-yellow-200'>Additional Information</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} className='h-[100px]' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        </fieldset>


        <FormError message={error} />


        </div>
        <Button type="submit" className=' w-full ' disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}


