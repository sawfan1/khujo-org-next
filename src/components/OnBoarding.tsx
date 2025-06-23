// Import necessary React hooks
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// Main App component
export default function OnBoarding() {
  // State to manage the current step of the onboarding process
  const [step, setStep] = useState(1);
  // State to store user's name
  const [name, setName] = useState('');
  // State to store user's location
  const [location, setLocation] = useState('');
  // State to store user's age
  const [age, setAge] = useState('');
  // State to store the selected city from the dropdown
  const [selectedCity, setSelectedCity] = useState('');

  // Example list of cities for the dropdown
  const cities = [
    'Dhaka', 'Chittagong', 'Rangpur', 'Barisal', 'Khulna', 'Sylhet', 'Rajshahi', 'Mymensingh'
  ];

  // Function to handle moving to the next step
  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  // Function to handle moving back to the previous step
  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  // Function to handle the final submission of the onboarding data
  const handleSubmit = () => {
    // In a real application, you would send this data to a backend or state management system
    console.log('Onboarding Complete!', {
      name,
      location,
      age,
      selectedCity,
    });
    // Replaced alert with a simple console log as alerts are not recommended in canvas
    console.log('Onboarding complete! Check the console for your data.');
    // You might want to navigate to another page or show a success message here
  };

  // Helper for the simplified Select component's value change
  const handleSelectValueChange = (newValue: string) => {
    setSelectedCity(newValue);
  };

  return (
      <Card className="w-full max-w-md rounded-lg shadow-xl border-2 border-gray-200">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-center">
            {step === 1 ? 'Welcome Aboard!' : 'Just a Few More Details'}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1
              ? 'Let’s get to know each other. Please provide your name to start.'
              : 'Help us tailor your experience by providing a bit more info.'}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0 space-y-6">
          {step === 1 && (
            // First Onboarding Screen
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md text-sm leading-relaxed">
                <h3 className="font-semibold text-lg mb-2">General Information:</h3>
                <p>
                  This onboarding process will help us personalize your experience. We value your privacy and only collect essential information.
                  You can proceed through the steps at your own pace.
                </p>
                <p className="mt-2">
                  Please feel free to reach out if you have any questions during this process.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            // Second Onboarding Screen
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Your skills</Label>
                <Input
                  id="skills"
                  type="text"
                  placeholder="e.g., Graphics, Management, Product Analysis"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Select Your City</Label>
                <Select onValueChange={handleSelectValueChange} value={selectedCity}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button
              onClick={handleBack}
              variant="outline"
            >
              Back
            </Button>
          )}
          {step === 1 && (
            <Button
              onClick={handleNext}
              disabled={!name.trim()} // Disable if name is empty
              className="flex-grow ml-auto"
            >
              Next
            </Button>
          )}
          {step === 2 && (
            <Button
              onClick={handleSubmit}
              disabled={!location.trim() || !age || !selectedCity} // Disable if any field is empty
              className="ml-auto bg-green-600 hover:bg-green-700"
            >
              Finish Onboarding
            </Button>
          )}
        </CardFooter>
      </Card>
  );
}