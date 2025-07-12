import Navbar from "@/components/Navbar";
import LeftSection from "@/components/LeftSection";
import RightSection from "@/components/RightSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main content area: Left and Right */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left section (lanyard) */}
        <div className="w-1/2 h-full overflow-hidden">
          <LeftSection />
        </div>

        {/* Right section (content/info) */}
        <div className="w-1/2 h-full overflow-auto ">
          <RightSection />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
