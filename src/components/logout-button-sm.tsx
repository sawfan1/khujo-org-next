"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 w-7 rounded-full p-0"
      onClick={handleLogout}
    >
      <LogOut className="h-[1rem] w-[1rem]" />
      <span className="sr-only">Log out</span>
    </Button>
  );
}
