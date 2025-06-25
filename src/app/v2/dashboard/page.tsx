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
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 p-4 relative">
                <h3 className="font-bold text-2xl">Welcome to khujo.org!</h3>
                <div className="font-semibold text-2xl mt-2">
                  <NameProvider />
                </div>
                <div className="mt-5">
                  <Greeting />
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h3 className="font-medium">Getting Started</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Check out the Overview and Profiles sections to get started.
                </p>
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 p-4">
                <h3 className="font-medium">Management Tools</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Manage volunteers, jobs, and settings from the sidebar.
                </p>
              </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-4 md:min-h-min">
              <h2 className="text-xl font-semibold mb-4">Main Content Area</h2>
              <p className="text-muted-foreground">
                This is where your main content will be displayed. The sidebar
                is fully responsive and will collapse on mobile devices.
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
