"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

import { Progress } from "@/components/ui/progress";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import FadeIn from "@/components/FadeIn";
import { BriefcaseBusiness, User } from "lucide-react";
import Link from "next/link";

export function OnboardingSection5() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option: any) => {
    setSelectedOption(option); // Update the state with the selected option
  };

  const handleSignUp = async () => { // Removed 'e: React.FormEvent' because it's no longer a form submission
    // e.preventDefault(); // No longer needed if button type is "button"
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //   emailRedirectTo: `${window.location.origin}/protected`,
        // },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Supabase sign-up error:", error); // Added for detailed debugging
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-l from-white via-white to-teal-100">

        <Card className="w-full max-w-sm">
        {/* <Progress className="w-70 mx-auto" value={50}></Progress> */}
        <h1 className="text-lg mx-auto font-bold"><FadeIn>Sign Up for KHUJO.org!</FadeIn></h1>
        {/* start from here */}
        <div className="flex w-90 mx-auto p-4 gap-4">
            <div
            className={`
              flex-1 p-2 border-2 rounded-xl cursor-pointer
              flex flex-col items-center justify-center text-center
              transition-all duration-200 ease-in-out
              ${selectedOption === 'volunteer'
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-105'
                : 'border-gray-300 bg-white text-gray-600 hover:border-blue-400 hover:shadow-sm'
              }
            `}
            onClick={() => handleSelect('volunteer')}
          >
            {/* Removed SVG icon for Volunteer */}
            <User />
            <p>
              As volunteer
            </p>
          </div>

          {/* Organization Box */}
          <div
            className={`
              flex-1 p-2 border-2 rounded-xl cursor-pointer
              flex flex-col items-center justify-center text-center
              transition-all duration-200 ease-in-out
              ${selectedOption === 'organization'
                ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-md scale-105'
                : 'border-gray-300 bg-white text-gray-600 hover:border-green-400 hover:shadow-sm'
              }
            `}
            onClick={() => handleSelect('organization')}
          >
            {/* Removed SVG icon for Organization */}
            <BriefcaseBusiness />
            <p className="font-semibold">
               As organization
            </p>
          </div>

        </div>

        {/* rest from here */}
          
      
        <CardHeader>
        <FadeIn><CardTitle>Create an account</CardTitle></FadeIn>
        <CardDescription>
          Enter your email and password below to register
        </CardDescription>
        <CardAction>
          <a href="/login"><Button className="cursor-pointer"  variant="link">Login</Button></a>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* Form is no longer directly submitting, but still good for semantics */}
        <div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" required />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
        <Button
          type="button" // Change type to "button"
          className="w-full cursor-pointer"
          onClick={handleSignUp} // Add onClick handler
          disabled={isLoading}
        >
          {isLoading ? "Creating an account..." : "Sign up"}
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default OnboardingSection5;