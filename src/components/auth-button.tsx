import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";
import { LogIn, SquareArrowOutUpRight } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-2">
      <a href="/v1/dashboard"><Button className="cursor-pointer bg-teal-700 hover:bg-teal-800"><SquareArrowOutUpRight /> Dashboard</Button></a>
      <LogoutButton />
    </div>
  ) : (
      <Button asChild size="sm" className="p-4 bg-indigo-400 hover:bg-indigo-600 cursor-pointer">
        <Link href="/login"><LogIn /> Log In</Link>
      </Button>
  );
}