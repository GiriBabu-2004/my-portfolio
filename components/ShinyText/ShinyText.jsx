import React from "react";

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <>
      <style>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .shiny-text {
          position: relative;
          color: #888888; /* fixed gray color */
          background: linear-gradient(
            120deg,
            #888888 40%,
            #ffffff 50%,
            #888888 60%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine linear infinite;
          animation-duration: var(--shine-duration);
        }
        .shiny-text.disabled {
          animation: none;
          background: none;
          color: #888888;
          -webkit-text-fill-color: initial;
        }
      `}</style>

      <span
        className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
        style={{ "--shine-duration": animationDuration }}
      >
        {text}
      </span>
    </>
  );
};

export default ShinyText;
