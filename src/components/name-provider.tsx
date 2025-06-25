"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";

export default function NameProvider() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const supabase = createClient();

  useEffect(() => {
    async function fetchName() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("users")
            .select("name, role, location")
            .eq("id", user.id)
            .single();

          if (data && !error) {
            console.log(data);
            setName(data.name);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchName();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="w-full h-6 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
      </>
    );
  }

  return (
    <FadeIn>
      <span>{name} 👋</span>
    </FadeIn>
  );
}
