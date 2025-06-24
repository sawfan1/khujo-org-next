"use client"


import Link from "next/link";
import { useState } from "react";
import PostList from "@/components/PostList";
import Navbar from "@/components/dash-nav";


export default function Tasks() {
  const [isOpen, setIsOpen] = useState(false);
  
    // Function to toggle the mobile menu's visibility
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div>

    <Navbar />

    <div className=" h-screen p-8">
      <h1 className="font-bold text-4xl">List of running tasks</h1>
    <PostList />

    </div>


    </div>
    
    
  )
} 