"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import logo from '@/public/img/logo-icon.png'
import Image from "next/image"
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { useTransition } from "react";
import Link from "next/link";
import { signUpSchema } from "@/lib/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGGED_IN_REDIRRECT } from "@/routes";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { register, regsiter } from "@/actions/regsiter";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";
import { regsiter } from "@/actions/register";


export function SignUpForm() {

  const [terms, setTerms] = useState<boolean> (false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState < string | undefined>('')

   const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setError('')
    setSuccess('')

    startTransition(() => {
      if(values.password !== values.passwordConfirmation) {
        setError('Password does not matched')
      }
      
      regsiter(values)
      .then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })

  }



  return (
    <div className=" mt-20 flex flex-col bg-white py-12 space-y-4 border border-yellow-500 shadow-lg rounded-lg  w-full">
      
       <div className=" w-full items-center flex text-center bg-yellow-500 py-4 justify-center">
        <h1 className=" text-2xl font-poppins font-bold">AUG Legacy Oil</h1>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-10 w-full">
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
       <div className="flex items-center space-x-2">
    </div>
          <FormSuccess message={success} />
          <FormError message={error} />
       <Button type="submit" disabled={isPending} className=" bg-yellow-500 hover:bg-black/80 text-white w-full">Create an Account</Button>
      </form>
    </Form>
    </div>
  )
}

