"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, Heart, Building2, ArrowLeft, ArrowRight } from "lucide-react"

interface FormData {
  email: string
  password: string
  role: "volunteer" | "organization" | ""
  name: string
  age: string
  location: string
  organizationSize: string
  acceptedTerms: boolean
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function Component() {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [formData, setFormData] = React.useState<FormData>({
    email: "",
    password: "",
    role: "",
    name: "",
    age: "",
    location: "",
    organizationSize: "",
    acceptedTerms: false,
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
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

  const handleSubmit = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: formData.role,
            full_name: formData.name,
            organization_name: formData.name,
            age: formData.age ? formData.age : 0,
            location: formData.location,
            organization_size: formData.organizationSize
          }
        }
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && isValidEmail(formData.email)
      case 2:
        return formData.role
      case 3:
        const baseFieldsValid =
          formData.role === "volunteer"
            ? formData.name && formData.age && formData.location
            : formData.name && formData.location && formData.organizationSize
        return baseFieldsValid && formData.acceptedTerms
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
              <p className="text-muted-foreground">Let's get started with your account</p>
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
            <div className="text-center pt-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                      onClick={() => router.push("/login")}
                    >
                      Log in instead
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Already have an account? 🤔 Click here to log in</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
              value={formData.role}
              onValueChange={(value) => updateFormData("role", value)}
              className="space-y-4"
            >
              <div
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => updateFormData("role", "volunteer")}
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
                onClick={() => updateFormData("role", "organization")}
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
        if (formData.role === "volunteer") {
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
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => updateFormData("acceptedTerms", checked as boolean)}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to the terms and conditions
                  </Label>
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
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter organization name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
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
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => updateFormData("acceptedTerms", checked as boolean)}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I have read and agree to the terms and conditions
                  </Label>
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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
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
                <Button onClick={handleSubmit} disabled={!isStepValid()} className="flex items-center gap-2 cursor-pointer">
                  {isLoading ? "Creating an account..." : "Complete"}
                  <Users className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button onClick={handleNext} disabled={!isStepValid()} className="flex items-center gap-2 cursor-pointer">
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
