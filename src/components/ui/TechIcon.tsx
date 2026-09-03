import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "w-4 h-4", size = 16 }: TechIconProps) {
  const normalized = name.toLowerCase().trim();

  if (normalized.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#3776AB" d="M11.872 2c-4.808 0-4.506 2.083-4.506 2.083l.006 2.158h4.568v.646H5.654S2 6.452 2 11.272c0 4.82 3.195 4.654 3.195 4.654h1.912v-2.705s-.103-3.23 3.18-3.23h5.498s3.003.05 3.003-2.902V4.93S19.24 2 11.872 2zM9.254 3.44a.89.89 0 110 1.782.89.89 0 010-1.782z" />
        <path fill="#FFD43B" d="M12.128 22c4.808 0 4.506-2.083 4.506-2.083l-.006-2.158h-4.568v-.646h6.286S22 17.548 22 12.728c0-4.82-3.195-4.654-3.195-4.654h-1.912v2.705s.103 3.23-3.18 3.23H8.215s-3.003-.05-3.003 2.902v2.158S4.76 22 12.128 22zm2.618-1.44a.89.89 0 110-1.782.89.89 0 010 1.782z" />
      </svg>
    );
  }

  if (normalized.includes("java") && !normalized.includes("script")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#EA2D2E" d="M8.851 18.56s-.917.534.612.653c2.063.158 4.254.12 6.13-.505 0 0 .506.347.88.583-2.615 1.05-6.666.904-8.868-.046.002 0 .428-.42.746-.685zM8.28 16.533s-1.127.766.495.845c2.316.113 5.485.083 7.828-.694 0 0 .34.37.585.544-3.064 1.134-7.854.996-10.237-.15.001 0 .61-.31.917-.545zM12.637 1.838s1.956 2.054-.537 4.908c-2.082 2.385-.688 3.655.074 5.228-1.503-1.614-2.222-3.125-1.076-4.707 1.637-2.26 2.457-3.79-.17-5.429zM10.82 13.914s-2.906.665.864.912c2.72.176 6.892-.047 8.948-.847 0 0-.69.467-1.196.657-2.67.755-7.142.92-9.762.197.001 0 .462-.486 1.146-.919z" />
      </svg>
    );
  }

  if (normalized.includes("script") || normalized === "js") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path fill="#000" d="M6.97 18.06c.4.65.98 1.14 1.76 1.14.77 0 1.25-.38 1.25-.94 0-.65-.5-1-1.34-1.37l-.46-.2c-1.33-.56-2.21-1.25-2.21-2.73 0-1.46 1.14-2.6 2.92-2.6 1.27 0 2.19.45 2.84 1.5l-1.4.9c-.35-.58-.75-.85-1.42-.85-.67 0-1.09.35-1.09.84 0 .55.43.87 1.25 1.22l.46.2c1.55.67 2.36 1.34 2.36 2.82 0 1.67-1.3 2.75-3.26 2.75-1.8 0-2.9-.84-3.52-2.03l1.81-1.05zm7.3 0c.4.65.98 1.14 1.76 1.14.77 0 1.25-.38 1.25-.94 0-.65-.5-1-1.34-1.37l-.46-.2c-1.33-.56-2.21-1.25-2.21-2.73 0-1.46 1.14-2.6 2.92-2.6 1.27 0 2.19.45 2.84 1.5l-1.4.9c-.35-.58-.75-.85-1.42-.85-.67 0-1.09.35-1.09.84 0 .55.43.87 1.25 1.22l.46.2c1.55.67 2.36 1.34 2.36 2.82 0 1.67-1.3 2.75-3.26 2.75-1.8 0-2.9-.84-3.52-2.03l1.81-1.05z" />
      </svg>
    );
  }

  if (normalized.includes("sql")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-blue-400`}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  if (normalized.includes("react")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    );
  }

  if (normalized.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="12" r="11" fill="black" stroke="white" strokeWidth="1" />
        <path fill="white" d="M14.7 16.6L9.6 9.8V16H8V8h1.8l5.1 6.8V8h1.6v8.6h-1.8z" />
      </svg>
    );
  }

  if (normalized.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#339933" d="M12 2L2 7.7v11.5L12 22l10-5.8V7.7L12 2zm-1.8 15.6h-1.6v-6.2h1.6v6.2zm3.6 0h-1.6V8.2h1.6v9.4z" />
      </svg>
    );
  }

  if (normalized.includes("flask")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-emerald-400`}>
        <path d="M9 3h6M10 3v6l-4.5 9A2 2 0 0 0 7.3 21h9.4a2 2 0 0 0 1.8-3L14 9V3" />
      </svg>
    );
  }

  if (normalized.includes("pytorch")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#EE4C2C" d="M14.6 2.1a1 1 0 0 0-1.2.6L12 6.5 10.6 2.7a1 1 0 0 0-1.2-.6 1 1 0 0 0-.6 1.2l2 5.5A1 1 0 0 0 11.7 9.5h.6a1 1 0 0 0 .9-.6l2-5.5a1 1 0 0 0-.6-1.3zM12 11.5a5.5 5.5 0 1 0 5.5 5.5 5.5 5.5 0 0 0-5.5-5.5z" />
      </svg>
    );
  }

  if (normalized.includes("tensor")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#FF6F00" d="M1.5 6.5L12 12v10.5L1.5 17V6.5zm21 0L12 12v10.5l10.5-5.5V6.5zM12 1.5L1.5 6.5 12 12l10.5-5.5L12 1.5z" />
      </svg>
    );
  }

  if (normalized.includes("scikit") || normalized.includes("sklearn")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="8" cy="12" r="6" fill="#F7931E" opacity="0.8" />
        <circle cx="16" cy="12" r="6" fill="#38B5E6" opacity="0.8" />
      </svg>
    );
  }

  if (normalized.includes("opencv")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <circle cx="12" cy="7" r="4" fill="#5C3EE8" />
        <circle cx="7" cy="16" r="4" fill="#E2231A" />
        <circle cx="17" cy="16" r="4" fill="#00A859" />
      </svg>
    );
  }

  if (normalized.includes("pandas")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <rect x="5" y="4" width="3" height="16" fill="#150458" />
        <rect x="10" y="7" width="3" height="13" fill="#E70488" />
        <rect x="15" y="4" width="3" height="16" fill="#00A0E9" />
      </svg>
    );
  }

  if (normalized.includes("numpy")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#013243" d="M4 4h4v16H4zM16 4h4v16h-4zM10 8h4v8h-4z" />
        <path fill="#4DABCF" d="M8 4l8 8v8L8 12z" />
      </svg>
    );
  }

  if (normalized.includes("html")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#E34F26" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.7 7.5H7.7l.3 3.5h8.8l-.6 6.3-4.2 1.2-4.2-1.2-.3-3.2H4.8l.5 5.8 6.7 1.8 6.7-1.8 1.1-12.4z" />
      </svg>
    );
  }

  if (normalized.includes("css")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#1572B6" d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.7 7.5H7.7l.3 3.5h8.8l-.6 6.3-4.2 1.2-4.2-1.2-.3-3.2H4.8l.5 5.8 6.7 1.8 6.7-1.8 1.1-12.4z" />
      </svg>
    );
  }

  if (normalized.includes("git") && !normalized.includes("hub")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#F05032" d="M23.54 11.08L12.92.46a1.4 1.4 0 0 0-1.98 0L9.07 2.33a1.4 1.4 0 0 0 0 1.98l.9.9L1.4 13.78a1.4 1.4 0 0 0 0 1.98l10.62 10.62c.55.55 1.43.55 1.98 0l10.62-10.62a1.4 1.4 0 0 0 0-1.98z" />
      </svg>
    );
  }

  if (normalized.includes("github")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  if (normalized.includes("linux")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fill="#FCC624" d="M12 2C8 2 6 5 6 9c0 3 1 6 1 9 0 2-1 3-2 3s-1 1 1 1c4 0 5-2 6-2s2 2 6 2c2 0 2-1 1-1s-2-1-2-3c0-3 1-6 1-9 0-4-2-7-6-7z" />
        <circle cx="10" cy="8" r="1.5" fill="#000" />
        <circle cx="14" cy="8" r="1.5" fill="#000" />
      </svg>
    );
  }

  if (normalized.includes("api") || normalized.includes("rest")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-indigo-400`}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    );
  }

  // Default fallback code symbol
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-blue-400`}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
