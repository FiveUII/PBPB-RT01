"use client";

import { useEffect } from "react";
import { trackVisit } from "@/lib/actions";

export default function VisitorTracker() {
  useEffect(() => {
    // We only run this once on mount
    const today = new Date().toISOString().split("T")[0];
    
    // Check if the user has visited today
    const lastVisit = localStorage.getItem("last_visit_date");
    
    if (lastVisit !== today) {
      // Record visit to database
      trackVisit().catch(err => console.error("Failed to track visit:", err));
      
      // Save today's date so we don't track again today for this device
      localStorage.setItem("last_visit_date", today);
    }
  }, []);

  // This component doesn't render anything
  return null;
}
