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
import { TransactionsInterface, UserWithTransactions } from '@/typings'
import { Textarea } from "@/components/ui/textarea"
import { signUpSchema, transactionsSchema } from '@/lib/schema'
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
import { regsiter } from '@/actions/register'

const paymentStatus = ['Pending', 'Completed', 'Failed', 'Refunded', 'Cancelled']

export function UserFormCreate({ onSubmit }: { onSubmit: (users: UserWithTransactions ) => void }) {
  const [isPending, setIsPending] = useState(false)
  // const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirmation: '',
      phone: ''
    },
  })

  async function handleSubmit(values: z.infer<typeof signUpSchema>) {

    setError('')
    setSuccess('')
    setIsPending(true)
    try {
    const data = await regsiter(values)
    if (data.error) {
      setError(data.error)
      return
    } 
    // @ts-ignore
    if (data.success) {
      await onSubmit(data.user as UserWithTransactions)
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
        <Separator  /> 
        <fieldset className=' border-2 rounded-lg  border-yellow-500 flex flex-col items-start text-center w-full p-4'>
        <legend className=' font-poppins text-lg font-semibold px-3 text-yellow-500 self-center'>Order Information</legend>
          <div className=" grid grid-cols-2 text-start gap-4 w-full ">
                <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name </FormLabel>
                    <FormControl>
                        <Input disabled={isPending} className=" outline-yellow-500" placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                    )}
                    />
                <div className=" grid grid-cols-2 gap-2">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} className=" outline-yellow-500" placeholder="Email Address" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} className=" outline-yellow-500" placeholder="(234) 000 000 000" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" disabled={isPending} className=" outline-yellow-500" placeholder="Passsord" {...field} />
                            </FormControl>

                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="passwordConfirmation"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password Confirmation</FormLabel>
                            <FormControl>
                                <Input type="password"disabled={isPending} className=" outline-yellow-500" placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                </div>
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


