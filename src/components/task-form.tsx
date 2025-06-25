"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function VolunteerTaskForm() {
  const [date, setDate] = useState<Date>();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    volunteers_needed: "",
    location: "",
    requirements: "",
    // organization_id: ""
  });

  const hydratef = async () => {
    // im losing my mind bro
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user) {
      setFormData((prev) => ({ ...prev, location: user.id }));
    }

    return 0;
  };

  const handleSubmit = async () => {
    try {
      // hydratef()
      const supabase = createClient();

      const { data, error } = await supabase
        .from("posts")
        .insert([formData])
        .select();

      if (error) {
        console.log(error);
        console.log("error");
      } else {
        console.log("data inserted succesfully");
        router.push("/v2/dashboard/create-success");
      }
    } catch (err) {
      console.error("An unexpected error occurred during post insertion:", err);
      throw err; // Re-throw to allow calling function to handle
    }
  };

  const [termsAccepted, setTerms] = useState(false);
  const volunteerOptions = [10, 100, 200, 500, 1000];

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.volunteers_needed !== "" &&
      date !== undefined &&
      formData.location.trim() !== "" &&
      formData.requirements.trim() !== "" &&
      termsAccepted
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Volunteer Task</CardTitle>
          <CardDescription>
            Fill out the details for your volunteer opportunity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              placeholder="Enter the task title"
              className="w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the volunteer task (about 80 words)"
              className="min-h-[100px] resize-none"
              maxLength={500}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <p className="text-sm text-muted-foreground">
              Aim for about 80 words to give volunteers a clear understanding of
              the task.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="volunteers">Number of Volunteers Needed *</Label>
            <Select
              value={formData.volunteers_needed}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, volunteers_needed: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select number of volunteers" />
              </SelectTrigger>
              <SelectContent>
                {volunteerOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} volunteers
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>End Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick an end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Enter the location"
              className="w-full"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements *</Label>
            <Input
              id="requirements"
              placeholder="List any specific requirements or qualifications"
              className="w-full"
              value={formData.requirements}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  requirements: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTerms(!termsAccepted)}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions *
              </Label>
            </div>

            <Button
              className="w-full cursor-pointer"
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Create Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
