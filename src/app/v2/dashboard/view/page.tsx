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
import { EventFilters } from "@/components/event-filters";
import { EventCard } from "@/components/event-card";
import EventLoader from "@/components/event-loader";
import FadeIn from "@/components/FadeIn";

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
          <div className="flex flex-1 flex-col gap-6 p-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">
                <FadeIn>Find Events</FadeIn>
              </h2>
              <p className="text-muted-foreground">
                Discover volunteer opportunities and community events near you
              </p>
            </div>
            <EventFilters />
            <div className="space-y-4">
              {/* {sampleEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))} */}
              <EventLoader />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
