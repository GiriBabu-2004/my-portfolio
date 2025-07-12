"use client";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format to Indian Standard Time
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

      const formatted = now.toLocaleString("en-IN", options);
      setDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[60px] bg-slate-900 border-t border-cyan-500 flex items-center justify-between px-6">
      {/* Social Media Icons on Left */}
      <div className="flex pl-8 space-x-6 text-cyan-400 text-xl">
        <a
          href="https://github.com/GiriBabu-2004"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-cyan-300 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sujay-kumar-giri-29195a2b5/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-cyan-300 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://x.com/_giri_sujay02"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-cyan-300 transition"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/__amisujay__"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-cyan-300 transition"
        >
          <FaInstagram />
        </a>
      </div>

      {/* Date & Time on Right */}
      <div className="text-cyan-400 font-mono text-sm">{dateTime}</div>
    </div>
  );
};

export default Footer;
