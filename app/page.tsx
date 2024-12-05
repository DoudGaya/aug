'use client'
import { LoginForm } from '@/components/auth/LogInForm'

export default function LandingPage() {
 


  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center">
        <div className=" w-full max-w-md">
          <LoginForm />
        </div>
    </div>
  )
}