"use client";
import { createClient } from "@/lib/supabase/client";
import { Span } from "next/dist/trace";
import { useEffect, useState } from "react";
import { EventCard } from "./event-card";

interface Post {
  created_at: string;
  date_needed: string;
  description: string;
  title: string;
  ends_at: string;
  id: string;
  location: string;
  volunteers_needed: number;
  updated_at: string;
  status: string;
  requirements: string;
  organization_id: string;
}

interface Event {
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
  isRemote: boolean;
}

export default function EventLoader() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase.from("posts").select("*");

          if (data && !error) {
            setPosts(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    // returns skeleton
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-48 bg-gray-300 rounded-md mb-4"></div>

        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>

        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => {
        let event: Event = {
          title: post.title,
          description: post.description + post.requirements,
          date: post.ends_at,
          attendees: post.volunteers_needed,
          maxAttendees: post.volunteers_needed + 20,
          location: post.location,
          organizer: post.organization_id,
          isRemote: false,
          category: "tech nature social-service",
          image: "",
          time: "10:00 sharp",
        };
        return <EventCard key={index} {...event} />;
      })}
    </>
  );
}
