import { Calendar, Home, Inbox, Search, Settings,} from "lucide-react"
import { Switch } from "@/components/ui/switch"


const homes = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "All Transactions",
      url: "/user/transactions",
      icon: Inbox,
    },
    {
      title: "Pending Transactions",
      url: "/user/pending-transactions",
      icon: Calendar,
    },
    {
      title: "Partial Transactions",
      url: "/user/partial-transactions",
      icon: Search,
    },
  ]


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { DarkButton } from "./DarkButton"
  
  export function AppSidebar() {
    return (
     <Sidebar>
      <SidebarHeader className=" w-full flex justify-start py-3 bg-yellow-500 ">
        <h1 className=" text-lg font-semibold font-poppins text-black">AUG | LEGACY</h1>
      </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className=" border-b ">Legacy Transaction System</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {
                            homes.map(item => (
                                <SidebarMenuItem className="" key={item.title}>
                                    <SidebarMenuButton className=" py-3" asChild>
                                        <a className="" href={item.url}>
                                            <item.icon />
                                            <span className=" py-3"> {item.title} </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="">
         <div className=" dark:bg-gray-600/50 bg items-center flex justify-between py-1 bg-gray-200 px-3 rounded-lg w-full h-full">
                <p>Dark Mode</p> 
                <DarkButton />
         </div>
        </SidebarFooter>
     </Sidebar>
    )
  }
  