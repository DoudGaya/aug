import React from 'react'
import { PublicNavigations } from '@/components/PublicNavigations'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const AuthLayout = ({ children }: { children:  React.ReactNode}) => {
  return (

     <>
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
    </>
  )
}

export default AuthLayout



// import { auth } from '@/auth'
// import { SessionProvider } from "next-auth/react";

// export default async function AdmninLayout({ children }: { children: React.ReactNode }) {
//   const session = await auth()
//   const user = session?.user.name
//     return (
//       <SessionProvider session={session}>
//         <div className="flex md:flex-row md:overflow-hidden">
//           <div className="flex flex-col w-full ">
//             {/* <TopNav /> */}
//               <div className=" mt-20 md:mt-0 w-full h-full">
//                 {children}
//               </div>
//           </div>
//         </div>
//       </SessionProvider>
//     );
// }