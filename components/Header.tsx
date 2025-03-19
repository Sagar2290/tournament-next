import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user"

export default function Header() {
  return (
    <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <div className="max-w-40">

      <NavUser user={{
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZQdHyyrnf31L6mDHY72cGoNXd_lzO8AHv1Asoj3Vtb2cBPcspyi_Fl3R1Ar1RjdtcRhk&usqp=CAU",
      }} />
      </div>
    </header>
  );
}
