import { Button } from "@/components/ui/button";
import ConfettiBurst from "@/components/Confetti";

export default function Success() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-lg">Successfully signed up.</h1>
      <a href="/login"><Button className="cursor-pointer" >Proceed to Login</Button></a>
      <ConfettiBurst />
    </div>
  )
}