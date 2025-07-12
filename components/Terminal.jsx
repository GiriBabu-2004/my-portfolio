"use client";

import React, { useState, useRef, useEffect } from 'react';

const COMMANDS = {
  help: "Available commands:\n- about\n- projects\n- skills\n- experience\n- education\n-certification\n- contact\n- sudo\n- clear",
  about: "Hi! I'm Sujay Kumar Giri, a full-stack developer with experience in building web applications using modern technologies. I love coding and solving problems.",
  projects: "Projects:\n- Project A\n- Project B\n- Project C",
  skills: "Skills:\n- JavaScript / TypeScript\n- React, Node.js\n- Tailwind, Three.js",
  experience: "Experience:\n- Developer at XYZ (2022–present)\n- Intern at ABC (2021–2022)",
  education: "Education:\n- BSc in Computer Science, University XYZ, 2022",
  certification: "Certifications:\n- Cert A (Issuer)\n- Cert B (Issuer)",
  contact: "Email: sujay@example.com\nLinkedIn: https://linkedin.com/in/sujay",
  sudo: "You are not sudoer, meow 😼",
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
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'link', value: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }
  return parts;
}
const initialPrompt = (
  <>
    <span style={{ color: '#f729f7' }}>Welcome!</span> I'm Sujay Kumar Giri, a full-stack developer.<br />
    Type '<span style={{ color: '#41f62b' }}>help</span>' to see commands.
  </>
);
export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'prompt', value: initialPrompt },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  // We'll animate output showing one "chunk" at a time:
  // A chunk is either a text segment (string of characters) or a link (entire link at once)
  // This allows links to appear fully clickable after they appear.

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

      if (currentPart.type === 'link') {
        // Add whole link at once
        displayedParts.push(currentPart);
        partIndex++;
        charIndex = 0;
        setHistory(prev => {
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

          if (lastPart && lastPart.type === 'text') {
            // update last text part
            displayedParts[displayedParts.length - 1] = { type: 'text', value: textSoFar };
          } else {
            // add new text part
            displayedParts.push({ type: 'text', value: textSoFar });
          }

          charIndex++;
          setHistory(prev => {
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
    let newEntries = [
      ...history,
      { type: 'command', value: cmd },
    ];

    if (cmd === 'clear') {
      newEntries = [];
      setHistory(newEntries);
      setInput('');
      return;
    }

    if (COMMANDS[cmd]) {
      newEntries.push({ type: 'output', value: COMMANDS[cmd], displayedOutput: [], error: false });
    } else {
      newEntries.push({ type: 'output', value: `command not found: ${cmd}`, displayedOutput: [{ type: 'text', value: `command not found: ${cmd}`}], error: true });
    }

    setHistory(newEntries);
    setInput('');

    if (COMMANDS[cmd]) {
      const outputIndex = newEntries.length - 1;
      setTimeout(() => animateOutput(COMMANDS[cmd], outputIndex), 100);
    }
  };

  const fontSize = '14px';

  return (
    <div
      className="terminal w-full h-full bg-black font-mono p-4 overflow-y-auto overflow-x-hidden box-border"
      style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: 'white',
        fontSize,
      }}
    >
      {history.map((entry, idx) => {
        if (entry.type === 'prompt') {
          return (
            <pre key={idx} style={{ margin: 0, fontSize, color: 'white' }}>
              {entry.value}
            </pre>
          );
        }
        if (entry.type === 'command') {
          return (
            <pre key={idx} style={{ margin: 0, whiteSpace: 'normal', fontSize }}>
              <span style={{ color: '#3b82f6' }}>sujay@developer:~$ </span>
              <span style={{ color: '#00FF00' }}>{entry.value}</span>
            </pre>
          );
        }
        if (entry.type === 'output') {
          if (entry.error) {
            return (
              <pre
                key={idx}
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  color: '#ef4444',
                  fontSize,
                  minHeight: '1em',
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
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: 'white',
                fontSize,
                minHeight: '1em',
              }}
            >
              {entry.displayedOutput && entry.displayedOutput.map((part, i) => {
                if (part.type === 'link') {
                  return (
                    <a
                      key={i}
                      href={part.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3b82f6', textDecoration: 'underline' }}
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
        style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontSize }}
      >
        <span style={{ color: '#3b82f6' }}>sujay@developer:~$&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black font-mono outline-none flex-grow min-w-0"
          autoComplete="off"
          spellCheck="false"
          style={{
            border: 'none',
            backgroundColor: 'transparent',
            flexGrow: 1,
            minWidth: 0,
            color: '#00FF00',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            fontSize,
          }}
        />
      </form>
    </div>
  );
}
