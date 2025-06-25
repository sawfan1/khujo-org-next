"use client";

import React, { useState, useEffect } from "react";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 5 && hour < 18) {
        // Assuming day is from 5 AM to 5:59 PM
        setGreeting("Good Morning! ☕");
      } else {
        // Assuming night is from 6 PM to 4:59 AM
        setGreeting("Good Night! 🛌");
      }
    };

    // Set initial greeting
    updateGreeting();

    // Optionally, update the greeting at the start of each hour if the component stays mounted for long periods
    const intervalId = setInterval(updateGreeting, 60 * 60 * 1000); // Check every hour

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <p className="text-lg font-semibold text-gray-800 dark:text-white">
      {greeting}
    </p>
  );
};

export default Greeting;
