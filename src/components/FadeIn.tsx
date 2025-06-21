"use client"

import { motion } from "motion/react"
import type { Variants } from "motion/react"
import React from 'react'

interface ReplicaProps {
  children: React.ReactNode
}


const cardVariants: Variants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        },
    },
}

export default function FadeIn({ children }: ReplicaProps) {
  return (
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{amount: 0.8, once: true}} variants={cardVariants}>
      {children}
    </motion.div>
  )
}