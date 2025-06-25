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

const sampleEvents = [
  {
    title: "Community Garden Cleanup",
    description:
      "Join us for a morning of beautifying our local community garden. We'll be planting new flowers, removing weeds, and general maintenance.",
    date: "Dec 28, 2024",
    time: "9:00 AM",
    location: "Central Community Garden, Main St",
    category: "Environment",
    organizer: "Green Volunteers",
    attendees: 12,
    maxAttendees: 25,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: false,
  },
  {
    title: "Virtual Tutoring Session",
    description:
      "Help local students with their homework and provide educational support through our online platform.",
    date: "Dec 29, 2024",
    time: "3:00 PM",
    location: "Online via Zoom",
    category: "Education",
    organizer: "EduHelp Foundation",
    attendees: 8,
    maxAttendees: 15,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: true,
  },
  {
    title: "Food Bank Distribution",
    description:
      "Volunteer to help distribute food packages to families in need. No experience necessary, training provided.",
    date: "Dec 30, 2024",
    time: "10:00 AM",
    location: "Downtown Food Bank, 123 Helper Ave",
    category: "Community",
    organizer: "City Food Bank",
    attendees: 18,
    maxAttendees: 30,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: false,
  },
  {
    title: "Senior Center Tech Support",
    description:
      "Assist elderly residents with technology questions, smartphone setup, and basic computer skills.",
    date: "Jan 2, 2025",
    time: "2:00 PM",
    location: "Sunset Senior Center",
    category: "Community",
    organizer: "Tech4Seniors",
    attendees: 6,
    maxAttendees: 12,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: false,
  },
  {
    title: "Beach Cleanup Drive",
    description:
      "Help preserve our coastline by participating in our monthly beach cleanup. Supplies and refreshments provided.",
    date: "Jan 5, 2025",
    time: "8:00 AM",
    location: "Oceanview Beach, Pier 12",
    category: "Environment",
    organizer: "Ocean Guardians",
    attendees: 24,
    maxAttendees: 50,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: false,
  },
  {
    title: "Remote Fundraising Campaign",
    description:
      "Join our team to help coordinate online fundraising efforts for local charities. Work from anywhere!",
    date: "Jan 8, 2025",
    time: "6:00 PM",
    location: "Remote Work",
    category: "Volunteer Work",
    organizer: "Charity Connect",
    attendees: 15,
    maxAttendees: 20,
    image: "/placeholder.svg?height=200&width=400",
    isRemote: true,
  },
];

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
              <h2 className="text-2xl font-bold">Find Events</h2>
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
