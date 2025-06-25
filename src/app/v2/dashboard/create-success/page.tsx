import { Button } from "@/components/ui/button";
import ConfettiBurst from "@/components/Confetti";

export default function Success() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-lg">Successfully posted your task!</h1>
      <a href="/v2/dashboard/view">
        <Button className="cursor-pointer">Proceed to Tasks</Button>
      </a>
      <ConfettiBurst />
    </div>
  );
}
