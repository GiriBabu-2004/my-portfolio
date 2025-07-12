"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000); // Hide after 5 seconds
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-md transition duration-500 animate-slide-up">
          📢 For the best experience, use a desktop or larger screen!
        </div>
      )}

      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left section: hidden on mobile */}
        <div className="hidden md:block w-1/2 h-full overflow-hidden">
          <LeftSection />
        </div>

        {/* Right section: full width on mobile */}
        <div className="w-full md:w-1/2 h-full overflow-auto">
          <RightSection />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
