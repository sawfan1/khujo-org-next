"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Users, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export interface VolunteerTask {
  title: string
  description: string
  requirements: string
  status: string
  endDate: string
  volunteersNeeded: number
  organisationName: string
  bgImage: string
}

const sampleTask: VolunteerTask = {
  title: "Community Garden Restoration Project",
  description:
    "Join us in transforming an abandoned lot into a thriving community garden that will provide fresh produce for local families and create a beautiful green space for everyone to enjoy. This project involves clearing debris, preparing soil, planting vegetables and flowers, building raised beds, and installing irrigation systems. We're looking for dedicated volunteers who are passionate about environmental sustainability and community development.",
  requirements: "physial",
  status: "open",
  endDate: "2024-02-15",
  volunteersNeeded: 12,
  organisationName: "Green City Initiative",
  bgImage: "/placeholder.svg?height=200&width=400",
}

const statusColors = {
  open: "bg-green-500",
  "in-progress": "bg-blue-500",
  completed: "bg-gray-500",
  cancelled: "bg-red-500",
}

const statusLabels = {
  open: "Open",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
}

export default function VolunteerTaskCard({ task = sampleTask }: { task?: VolunteerTask }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInterested, setIsInterested] = useState(false)
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: task.title,
          text: task.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleInterest = () => {
    setIsInterested(!isInterested)
    // Here you would typically make an API call to register interest
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden">
      {/* Header with background image */}
      <div className="relative h-32 overflow-hidden">
        <Image src={task.bgImage || "/placeholder.svg"} alt={task.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-4 right-4">
          <Badge>{task.status}</Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-16">
          <h2 className="text-xl font-bold text-white mb-1 line-clamp-2">{task.title}</h2>
          <p className="text-white/90 text-sm">{task.organisationName}</p>
        </div>
      </div>

      <CardHeader className="pb-2">
        {/* Key metrics */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{task.volunteersNeeded} volunteers needed</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Ends {formatDate(task.endDate)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <div>
          <h3 className="font-semibold mb-2">About this opportunity</h3>
          <p className="text-muted-foreground leading-relaxed">
            {isExpanded ? task.description : truncateText(task.description, 150)}
          </p>
          {task.description.length > 150 && (
            <Button
              variant="link"
              className="p-0 h-auto font-normal text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </Button>
          )}
        </div>

        {/* Requirements */}
        <Collapsible open={isRequirementsOpen} onOpenChange={setIsRequirementsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto font-semibold">
              Requirements ({task.requirements.length})
              {isRequirementsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2">
            <ul className="space-y-1">
              {task.requirements}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>

      <CardFooter className="flex gap-3 pt-4">
        <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button
          onClick={handleInterest}
          className={`flex items-center gap-2 flex-1 ${isInterested ? "bg-green-600 hover:bg-green-700" : ""}`}
          variant={isInterested ? "default" : "default"}
        >
          <Heart className={`h-4 w-4 ${isInterested ? "fill-current" : ""}`} />
          {isInterested ? "Interest Registered!" : "I'm Interested"}
        </Button>
      </CardFooter>
    </Card>
  )
}
