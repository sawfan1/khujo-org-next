// components/UserProfile.tsx
"use client"; // This is a Client Component

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Adjust path as needed
import { User } from "@supabase/supabase-js";

export default function EmailProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          setError(error.message);
        } else {
          setUser(user);
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Run once on component mount

  if (loading) {
    return <span>Loading user data...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!user) {
    return <span>No user logged in.</span>;
  }

  return <span>{user.email}</span>;
}
