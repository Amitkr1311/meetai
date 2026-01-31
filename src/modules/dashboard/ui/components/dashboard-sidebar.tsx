"use client"

import { BotIcon, StarIcon, VideoIcon } from "lucide-react";

import {
    Sidebar,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarContent,
    SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { SidebarHeader } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { DashboardUserButton } from "./dashboardUserButton";


const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings",
    },
    {
        icon: BotIcon,
        label: "Agents",
        href: "/agents",
    }
]

const SecondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade",
    },
]

const DashboardSidebar = () => {
  const pathname = usePathname();
//   const pathname = "/agents"; // Forcing active state for demo purposes
  return (
    <Sidebar>
        <SidebarHeader className="text-sidebar-accent-foreground">
            <Link href="/" className="flex items-center gap-2 px-2 pt-2">
                <Image src="/logo.svg" alt="Meet.AI" width={32} height={32} />
                <p className="text-2xl font-semibold">Meet.AI</p>
            </Link>
        </SidebarHeader>
        <div className="px-4 py-2">
            <Separator className="opacity-10 text-[#5D6B68]" />
        </div>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {firstSection.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild
                                className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                                )}
                                isActive={pathname === item.href}
                            >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4 tracking-tight" />
                                        {item.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]" />
            </div>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {SecondSection.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild
                                className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50"
                                )}
                                isActive={pathname === item.href}
                            >
                                    <Link href={item.href}>
                                        <item.icon className="mr-2 h-4 w-4 tracking-tight" />
                                        {item.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <DashboardUserButton />
        </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
