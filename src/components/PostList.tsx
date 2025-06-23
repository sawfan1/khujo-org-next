// components/PostList.tsx
'use client' // This directive makes it a Client Component

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client' // Adjust path as needed
import { Card } from './ui/card'

interface Post {
  id: string
  brief: string
  description: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('id, brief, description')

      

      if (error) {
        setError(error.message)
        console.error('Error fetching posts:', error)
      } else {
        console.log(data)
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, []) // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      {posts.length > 0 ? (
        <ul className='flex gap-4'>
          {posts.map((post) => (
            <li key={post.id}>
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-70">
  <div className="relative h- m-2.5 overflow-hidden text-white rounded-md">
    <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="card-image" />
  </div>
  <div className="p-4">
    <h6 className="mb-2 text-slate-800 text-xl font-semibold">
      {post.brief}
    </h6>
    <p className="text-slate-600 leading-normal font-light">
      {post.description}
    </p>
  </div>
  <div className="px-4 pb-4 pt-0 mt-2">
    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
      Read more
    </button>
  </div>
</div>  </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}

