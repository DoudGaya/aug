'use client' 
import { LoginForm } from '@/components/auth/LogInForm'

export default function LandingPage() {
 


  return (
    <div className=" my-auto h-screen py-20 px-10 bg-yellow-300 flex flex-col items-center justify-center">
        <div className=" w-full max-w-md">
          <LoginForm />
        </div>
    </div>
  )
}