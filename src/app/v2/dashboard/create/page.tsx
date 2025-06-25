import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { UserNav } from "@/components/user-nav";
import ModeToggle from "@/components/mode-toggle";
import LogoutButton from "@/components/logout-button";
import NameProvider from "@/components/name-provider";
import Greeting from "@/components/greeting";
import VolunteerTaskForm from "@/components/task-form";

export default function Page() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 flex-1">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserNav />
              <LogoutButton />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <VolunteerTaskForm />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
