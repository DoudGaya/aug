import { Calendar, Home, Search, User, User2} from "lucide-react"
import { Switch } from "@/components/ui/switch"


const homes = [
    {
      title: "Transactions",
      url: "#",
      icon: Home,
    },
    {
      title: "Create User",
      url: "/user/create-user",
      icon: User,
    },
    {
      title: "All Users",
      url: "/user/all-users",
      icon: User2 ,
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
import { LogOutButton } from "./auth/LogOutButton"
  
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
                <div>
                    <LogOutButton>
                      <span>Logout</span>
                    </LogOutButton>
                </div> 
                <DarkButton />
         </div>
        </SidebarFooter>
     </Sidebar>
    )
  }
  