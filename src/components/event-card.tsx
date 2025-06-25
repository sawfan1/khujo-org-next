"use client";

import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  isRemote?: boolean;
}

export function EventCard({
  title,
  description,
  date,
  time,
  location,
  category,
  organizer,
  attendees,
  maxAttendees,
  image,
  isRemote = false,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldTruncate = description.length > maxLength;

  const displayDescription =
    shouldTruncate && !isExpanded
      ? description.slice(0, maxLength) + "..."
      : description;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={isRemote ? "secondary" : "default"}>
                  {category}
                </Badge>
                <span className="text-sm text-orange-600 font-medium ml-1">
                  Event starting soon
                </span>
              </div>
              <h3 className="font-semibold text-xl leading-tight">{title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{time}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {displayDescription}
              </p>
              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-primary hover:underline focus:outline-none"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>

            {/* Event Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {attendees}/{maxAttendees} attendees
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="text-xs">
                    {organizer.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  by {organizer}
                </span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <div className="text-lg font-semibold">Free</div>
                <Badge variant="outline" className="text-xs">
                  Promoted
                </Badge>
              </div>
              <Button className="px-6 cursor-pointer">Join Event</Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
