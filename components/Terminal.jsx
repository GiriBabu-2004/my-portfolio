"use client";

import React, { useState, useRef, useEffect } from "react";

const COMMANDS = {
  help: `Available commands:
 about - Learn more about me
 projects - View my projects
 skills - See my technical skills
 experience - My work experience
 education - My educational background
 certifications - View my certifications
 contact - How to reach me
 resume - Download my resume
 sudo - Activate god mode
 clear - Clear the terminal
  
 Type any of these commands to continue...
 `,
  about: `Hello, I'm Sujay Kumar Giri !
— a passionate full-stack developer with a strong focus on the MERN stack (MongoDB, Express.js, React, Node.js). 
— I've built several real-world projects that showcase both my frontend and backend skills. In addition to web development, I'm also proficient in C++, Java, and Python, which gives me a solid foundation in algorithms, data structures, and problem-solving. 
— I love learning new technologies and constantly pushing myself to build better, cleaner, and more efficient code. I love coding and solving problems.

In my free time, I love watching movies and tech videos — combining entertainment with learning whenever I can.

Feel free to explore using other commands like 'projects', 'skills', 'experience', 'education', 'certification', 'contact' or 'sudo'.
`,
  projects: `Projects:

1. Material Master
Material Master 📄✨ is a sleek and responsive web app for handling all your PDF needs.
From merging and compressing PDFs to converting between Word, JPG, and PDF formats — 
it offers fast, user-friendly tools all in one place.

Link: https://github.com/GiriBabu-2004/MaterialMaster-Tool

2. Tunify
Tunify 🎵 is a modern, full-stack music player built with the MERN stack, offering a smooth UI, 
playlist management, and YouTube music downloads.
Features include persistent sessions, theme switching, and real-time search,
delivering a personalized and responsive listening experience right from your browser.

Link: https://github.com/GiriBabu-2004/Tunify-A-music-player

3. FaceCase 
FaceCase 🎥 is a sleek and modern video conferencing app, inspired by Google Meet. Built with Next.js, React, MongoDB Atlas, and ZegoCloud, it enables secure, real-time audio/video meetings with seamless room management and responsive design. From authentication to in-call chat, FaceCase delivers a complete virtual meeting experience.

Link: https://github.com/GiriBabu-2004/FaceCase-meetingApp

4. FundPay
FundPay 💸 is a secure, full-stack fundraising web app designed for effortless donations and campaign management. Built with the MERN stack, it supports user/admin authentication, real-time payment verification, campaign creation, and automatic receipt generation — all within a modern, responsive interface.

Link: https://github.com/GiriBabu-2004/FundPay---Best-Funding-Web

5. Memory Booster
Memory Booster Game 🧠 is a fun, interactive web-based game built using React.js, Vite, Tailwind CSS, and React DnD. It’s designed to help users test and train their memory by matching or organizing elements through a smooth drag-and-drop interface.

Link: https://github.com/GiriBabu-2004/Memory-Booster

6. AddaBazz
AddaBazz 💬 is a dynamic mini social media platform built with the MERN stack, offering real-time messaging, post interactions, and profile management — all wrapped in a sleek, responsive UI. With TailwindCSS, Framer Motion, and React Bits, AddaBazz delivers a modern, animated, and engaging user experience across devices.

Link: https://github.com/GiriBabu-2004/AddaBazz-miniSocialMedia

7.GenLock
Password Manager Generator 🔐 is a secure, full-featured password management application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It’s designed to help users securely generate, store, and manage their passwords in one place — all from a sleek and user-friendly desktop-only interface.

Link: https://github.com/GiriBabu-2004/GenLock-PasswordManager-Generator

Type 'contact' to discuss collaborations!`,
  skills: `Technical Skills:

Programming Languages:
- JavaScript
- Python
- C++
- Java

Frontend:
- React.js, Next.js, Vite.js
- Redux, Material UI, Tailwind CSS
- Magic UI, Shadcn UI, Reactbits

Backend:
- Node.js, Express.js
- Flask
- SQL, MongoDB

Cloud:
- AWS
- Docker

Machine Learning & Tools:
- TensorFlow
- Git / GitHub
`,
  experience: `Work Experience:

- Currently a fresher, eager to learn and grow.
- Participated in several hackathons to build practical skills and collaborate on real projects.
- Passionate about coding challenges and constantly improving through hands-on experience.
`,
  education: `Education:

- Bachelor of Technology in Computer Science and Engineering
  JIS University
  CGPA: 9.18 (6th Semester)
  Currently in 4th year

- Completed 12th Grade
  Sonarpur Vidyapith H.S.
  Marks: 87%

- Completed 10th Grade
  Sonarpur Vidyapith H.S.
  Marks: 83%
`,
  certifications: `Certifications:

- Data Structures and Algorithms (DSA)
- Full Stack Development
- Generative AI (GenAI)
- Internet of Things (IoT)
- Java Programming
- Python Programming
- Various Webinars

G-Drive Link: https://drive.google.com/drive/folders/16x7w_gQPT6nSsUdukl-pq1dR5UX0U22J?usp=sharing
`,
  contact: `Get in touch:

Email: sujaykumargiri550@gmail.com
GitHub: https://github.com/GiriBabu-2004
LinkedIn: https://www.linkedin.com/in/sujay-kumar-giri-29195a2b5/
Twitter (X): https://x.com/_giri_sujay02
Instagram: https://www.instagram.com/__amisujay__

Feel free to reach out anytime!
`,
  sudo: `Activating god mode...

🎉 You are now a god! Congratulations, supreme coder! 👑😼
`,
};

// Regex to detect URLs (simple version)
const urlRegex = /(https?:\/\/[^\s]+)/g;

// Parse text into array of {type: 'text'|'link', value: string}
function parseTextWithLinks(text) {
  const parts = [];
  let lastIndex = 0;

  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", value: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }
  return parts;
}
const initialPrompt = (
  <>
    <span style={{ color: "#f729f7" }}>Welcome!</span> I'm Sujay Kumar Giri, a
    full-stack developer.
    <br />
    Type '<span style={{ color: "#41f62b" }}>help</span>' to see available
    commands.
  </>
);

function UnicodeSpinner() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % frames.length);
    }, 80); // speed
    return () => clearInterval(id);
  }, []);

  return <span style={{ color: "white" }}>{frames[i]}</span>;
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "prompt", value: initialPrompt },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const terminalRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const animateOutput = (fullText, idx) => {
    const parts = parseTextWithLinks(fullText);

    let partIndex = 0;
    let charIndex = 0;
    let displayedParts = [];

    const interval = 20;

    function type() {
      if (partIndex >= parts.length) {
        return; // done
      }

      const currentPart = parts[partIndex];

      if (currentPart.type === "link") {
        // Add whole link at once
        displayedParts.push(currentPart);
        partIndex++;
        charIndex = 0;
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[idx].displayedOutput = [...displayedParts];
          return newHistory;
        });
        setTimeout(type, interval);
      } else {
        // type text character by character
        if (charIndex < currentPart.value.length) {
          const textSoFar = currentPart.value.slice(0, charIndex + 1);
          const lastPart = displayedParts[displayedParts.length - 1];

          if (lastPart && lastPart.type === "text") {
            // update last text part
            displayedParts[displayedParts.length - 1] = {
              type: "text",
              value: textSoFar,
            };
          } else {
            // add new text part
            displayedParts.push({ type: "text", value: textSoFar });
          }

          charIndex++;
          setHistory((prev) => {
            const newHistory = [...prev];
            newHistory[idx].displayedOutput = [...displayedParts];
            return newHistory;
          });

          setTimeout(type, interval);
        } else {
          // finished this part, move to next
          partIndex++;
          charIndex = 0;
          setTimeout(type, interval);
        }
      }
    }

    type();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let newEntries = [...history, { type: "command", value: cmd }];

    if (cmd === "clear" || cmd === "cls") {
      newEntries = [{ type: "prompt", value: initialPrompt }];
      setHistory(newEntries);
      setInput("");
      return;
    }

    if (cmd === "resume") {
      // Show spinner
      newEntries.push({ type: "custom", value: "spinner" });
      setHistory(newEntries);
      setInput("");

      // Simulate delay & download
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/MyCV-SujayKumarGiri.pdf";
        link.setAttribute("download", "MyCV-SujayKumarGiri.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        const message = `Resume downloaded successfully.
If it doesn't download automatically or you want to see the resume in google drive, click here:
https://drive.google.com/file/d/1dePe_wCNE-vjXpPpywFFmFyW2XW6GjNA/view?usp=sharing`;
        // Replace spinner with success message
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            type: "output",
            value: message,
            displayedOutput: parseTextWithLinks(message),
            error: false,
          };
          return updated;
        });
      }, 3000);

      return;
    }
    
    if (COMMANDS[cmd]) {
      newEntries.push({
        type: "output",
        value: COMMANDS[cmd],
        displayedOutput: [],
        error: false,
      });
    } else {
      newEntries.push({
        type: "output",
        value: `command not found: ${cmd}`,
        displayedOutput: [{ type: "text", value: `command not found: ${cmd}` }],
        error: true,
      });
    }

    setHistory(newEntries);
    setInput("");

    if (COMMANDS[cmd]) {
      const outputIndex = newEntries.length - 1;
      setTimeout(() => animateOutput(COMMANDS[cmd], outputIndex), 100);
    }
  };

  const fontSize = "14px";

  return (
    <div
      ref={terminalRef}
      className="terminal w-full h-full bg-black font-mono p-4 overflow-y-auto overflow-x-hidden box-border"
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        color: "white",
        fontSize,
        maxHeight: "100vh",
        scrollbarWidth: "thin",
      }}
    >
      {history.map((entry, idx) => {
        if (entry.type === "prompt") {
          return (
            <pre key={idx} style={{ margin: 0, fontSize, color: "white" }}>
              {entry.value}
            </pre>
          );
        }
        if (entry.type === "command") {
          return (
            <pre
              key={idx}
              style={{ margin: 0, whiteSpace: "normal", fontSize }}
            >
              <span style={{ color: "#3b82f6" }}>sujay@developer:~$ </span>
              <span style={{ color: "#00FF00" }}>{entry.value}</span>
            </pre>
          );
        }
        if (entry.type === "custom" && entry.value === "spinner") {
          return (
            <pre key={idx} style={{ color: "white" }}>
              Downloading resume <UnicodeSpinner />
            </pre>
          );
        }

        if (entry.type === "output") {
          if (entry.error) {
            return (
              <pre
                key={idx}
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: "#ef4444",
                  fontSize,
                  minHeight: "1em",
                }}
              >
                {entry.value}
              </pre>
            );
          }

          // Render animated output with clickable links
          return (
            <pre
              key={idx}
              style={{
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "white",
                fontSize,
                minHeight: "1em",
              }}
            >
              {entry.displayedOutput &&
                entry.displayedOutput.map((part, i) => {
                  if (part.type === "link") {
                    return (
                      <a
                        key={i}
                        href={part.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#46bcf7",
                          textDecoration: "underline",
                        }}
                      >
                        {part.value}
                      </a>
                    );
                  }
                  return <span key={i}>{part.value}</span>;
                })}
            </pre>
          );
        }
        return null;
      })}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          fontSize,
        }}
      >
        <span style={{ color: "#3b82f6" }}>sujay@developer:~$&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black font-mono outline-none flex-grow min-w-0"
          autoComplete="off"
          spellCheck="false"
          style={{
            border: "none",
            backgroundColor: "transparent",
            flexGrow: 1,
            minWidth: 0,
            color: "#00FF00",
            whiteSpace: "normal",
            wordBreak: "break-word",
            fontSize,
          }}
        />
      </form>
    </div>
  );
}
