'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  name: string
  role: 'volunteer' | 'organization'
  location?: string
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data, error } = await supabase
            .from('users')
            .select('name, role, location')
            .eq('id', user.id)
            .single()
          
          if (data && !error) {
            setProfile(data)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
    )
  }

  if (!profile) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{profile.name}</h2>
      <p className="text-gray-600 capitalize">{profile.role}</p>
      {profile.location && (
        <p className="text-sm text-gray-500">{profile.location}</p>
      )}
    </div>
  )
}