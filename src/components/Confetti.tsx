"use client"

import React, { useState, useEffect } from 'react';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import randomInRange from 'react-canvas-confetti/dist/helpers/randomInRange'

export default function ConfettiBurst() {
  const decorateOptions = (defaultOptions : any) => {
    return {
      ...defaultOptions,
      colors: ["#3734eb", "#0affbe", "#4531c4"],
      scalar: randomInRange(1, 1.8)
    };
  };

  return (
    <Realistic autorun={{speed: 0.3, duration: 1.2  }} decorateOptions={decorateOptions} />
  )
}