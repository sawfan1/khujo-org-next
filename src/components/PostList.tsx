// components/PostList.tsx
'use client' // This directive makes it a Client Component

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client' // Adjust path as needed
import { VolunteerTask } from '@/components/task'
import VolunteerTaskCard from '@/components/task'


interface Post {
  created_at: string,
  date_needed: string,
  description: string,
  title: string,
  ends_at: string,
  id: string,
  location: string,
  volunteers_needed: number,
  updated_at: string,
  status: string,
  requirements: string,
  organization_id: string,
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
          
          if (data && !error) {
            setPosts(data)
            console.log(data)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>{posts.map((task, index) => {
      let objectTask: VolunteerTask = {
        title: task.title,
        description: task.description,
        requirements: task.requirements,
        status: task.status,
        volunteersNeeded: task.volunteers_needed,
        endDate: task.ends_at,
        organisationName: task.organization_id,
        bgImage: "/placeholder.svg?height=200&width=400"
      }
      return (
        <VolunteerTaskCard key={index} task={objectTask} />
      )
    })}
    </div>
  )
}

