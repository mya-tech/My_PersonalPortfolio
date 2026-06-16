"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "The Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  // Handle scroll class toggle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to highlight active section
  useEffect(() => {
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on middle part of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.href.replace("#", ""));
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-bg-primary/80 backdrop-blur-md border-b border-border-light shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setActiveSection("");
            }
          }}
          className="font-serif text-2xl font-black text-accent-deeper tracking-wider flex items-center justify-center h-10 w-10 rounded-lg border-2 border-accent-mid bg-bg-tertiary select-none"
        >
          MYT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={pathname === "/" ? item.href : `/${item.href}`}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors relative py-1",
                  isActive
                    ? "text-accent-dark font-bold"
                    : "text-text-secondary hover:text-accent-mid"
                )}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-mid rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
          <Button
            href="/resume/maryamya-toure-resume.pdf"
            download="Maryam-Ya_Toure_Resume.pdf"
            variant="secondary"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Download className="h-4 w-4" />
            Resume
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-accent-dark hover:bg-bg-secondary focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden animate-fade-down duration-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-bg-primary/95 backdrop-blur-lg border-b border-border-light shadow-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={pathname === "/" ? item.href : `/${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "block px-3 py-2.5 rounded-md text-base font-semibold transition-colors",
                    isActive
                      ? "bg-bg-tertiary text-accent-dark"
                      : "text-text-secondary hover:text-accent-mid hover:bg-bg-secondary"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 pb-2 px-3 border-t border-border-light mt-3">
              <Button
                href="/resume/maryamya-toure-resume.pdf"
                download="Maryam-Ya_Toure_Resume.pdf"
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
