"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Heart, Building2, ArrowLeft, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { TooltipTrigger, Tooltip } from "@/components/ui/tooltip"
import { TooltipContent } from "@/components/ui/tooltip"

interface FormData {
  email: string
  password: string
  userType: "volunteer" | "organization" | ""
  // Volunteer fields
  name: string
  age: string
  location: string
  // Organization fields
  organizationName: string
  organizationLocation: string
  organizationSize: string
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function Component() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    userType: "",
    name: "",
    age: "",
    location: "",
    organizationName: "",
    organizationLocation: "",
    organizationSize: "",
  })

  /* code for supabase signup */

  const handleSignUp = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            type: formData.userType,
            name: formData.name,
            age: formData.age,
            location: formData.location,
            organizationName: formData.organizationName,
            organizationLocation: formData.organizationLocation,
            organizationSize: formData.organizationSize
          }
        }
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && isValidEmail(formData.email)
      case 2:
        return formData.userType
      case 3:
        if (formData.userType === "volunteer") {
          return formData.name && formData.age && formData.location
        } else {
          return formData.organizationName && formData.organizationLocation && formData.organizationSize
        }
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Welcome! 👋</h2>
              <p className="text-muted-foreground ml-6">Let's get started with your account<Tooltip><TooltipTrigger asChild><Link href="/login"><Button className="font-bold transform translate-x-4 translate-y--3 cursor-pointer" variant="link">Log In?</Button></Link></TooltipTrigger><TooltipContent>
        <p>Do you want to log in instead? 🤔</p>
      </TooltipContent></Tooltip></p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className={
                    formData.email && !isValidEmail(formData.email) ? "border-red-500 focus:border-red-500" : ""
                  }
                />
                {formData.email && !isValidEmail(formData.email) && (
                  <p className="text-sm text-red-500">Please enter a valid email address</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">How would you like to join?</h2>
              <p className="text-muted-foreground">Choose the option that best describes you</p>
            </div>
            <RadioGroup
              value={formData.userType}
              onValueChange={(value: any) => updateFormData("userType", value)}
              className="space-y-4"
            >
              <div
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => updateFormData("userType", "volunteer")}
              >
                <RadioGroupItem value="volunteer" id="volunteer" />
                <div className="flex items-center space-x-3 flex-1 pointer-events-none">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <Label htmlFor="volunteer" className="text-base font-medium">
                      Volunteer
                    </Label>
                    <p className="text-sm text-muted-foreground">Join as an individual volunteer</p>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => updateFormData("userType", "organization")}
              >
                <RadioGroupItem value="organization" id="organization" />
                <div className="flex items-center space-x-3 flex-1 pointer-events-none">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <Label htmlFor="organization" className="text-base font-medium">
                      Organization
                    </Label>
                    <p className="text-sm text-muted-foreground">Register your organization</p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        )

      case 3:
        if (formData.userType === "volunteer") {
          return (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                <p className="text-muted-foreground">Help us match you with the right opportunities</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhaka">Dhaka</SelectItem>
                      <SelectItem value="chittagong">Chittagong</SelectItem>
                      <SelectItem value="barisal">Barisal</SelectItem>
                      <SelectItem value="khulna">Khulna</SelectItem>
                      <SelectItem value="mymensingh">Mymensingh</SelectItem>
                      <SelectItem value="rajshahi">Rajshahi</SelectItem>
                      <SelectItem value="sylhet">Sylhet</SelectItem>
                      <SelectItem value="rangpur">Rangpur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        } else {
          return (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Organization Details</h2>
                <p className="text-muted-foreground">Tell us about your organization</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input
                    id="orgName"
                    placeholder="Enter organization name"
                    value={formData.organizationName}
                    onChange={(e) => updateFormData("organizationName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgLocation">Location</Label>
                  <Input
                    id="orgLocation"
                    placeholder="Enter organization location"
                    value={formData.organizationLocation}
                    onChange={(e) => updateFormData("organizationLocation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgSize">Organization Size</Label>
                  <Select
                    value={formData.organizationSize}
                    onValueChange={(value) => updateFormData("organizationSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )
        }

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md ">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStep === totalSteps ? (
              <>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button onClick={handleSignUp} disabled={!isStepValid()} className="flex items-center gap-2 cursor-pointer">
                {isLoading ? "Creating an account..." : "Complete"}
                <Users className="h-4 w-4" />
              </Button></>
            ) : (
              <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
