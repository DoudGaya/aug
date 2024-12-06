import React from 'react'
import { PublicNavigations } from '@/components/PublicNavigations'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (

     <>
        <SidebarProvider>
          <AppSidebar />
          <main className=' w-full'>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
    </>
  )
}
export default AuthLayout

