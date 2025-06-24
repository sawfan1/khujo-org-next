'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Heart } from 'lucide-react'

interface UserProfile {
  name: string
  role: 'volunteer' | 'organization'
  location?: string
}

export default function Dash() {
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
    return (<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 w-[90%] mt-8">
        <div className="flex items-center justify-between">
          <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
      
    )
  }

  if (!profile) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 w-[90%] mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.name}</h1>
            <p className="text-blue-100">Ready to make a difference today?</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
)}
    // <div className="p-4 border rounded-lg">
    //   <h2 className="text-xl font-bold">{profile.name}</h2>
    //   <p className="text-gray-600 capitalize">{profile.role}</p>
    //   {profile.location && (
    //     <p className="text-sm text-gray-500">{profile.location}</p>
    //   )}
    // </div>
