import React from "react";
import { Github, Linkedin } from "@/components/ui/Icons";

export const Footer = () => {
  const currentYear = 2026; // Setting to 2026 as per spec update year

  return (
    <footer className="bg-bg-secondary border-t border-border-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Attribution */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-sm font-semibold text-text-primary">
            Built by Maryam-Ya Touré · {currentYear}
          </p>
          <p className="text-xs text-text-muted mt-1.5 max-w-md">
            Designed & developed with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/mya-tech"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full border border-border-light text-text-secondary hover:text-accent-mid hover:border-accent-light bg-bg-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/maryamya"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full border border-border-light text-text-secondary hover:text-accent-mid hover:border-accent-light bg-bg-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
