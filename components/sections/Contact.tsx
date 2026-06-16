"use client";

import React, { useState } from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Linkedin } from "@/components/ui/Icons";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setToastMessage("Please fill in all fields before sending.");
      return;
    }

    try {
      setIsSending(true);
      setStatus("idle");
      setToastMessage("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error("Failed to dispatch your message.");
      }

      setStatus("success");
      setToastMessage("Message sent successfully! I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setStatus("error");
      setToastMessage(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-20">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
          08 · Start a conversation
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
          Contact Me
        </h2>
        <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Let's work together */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <h3 className="font-serif text-2xl font-bold text-text-primary">
            Let&apos;s work together
          </h3>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
            Have an exciting opportunity, a project proposal, or just want to chat about cloud architectures, SaaS systems, or community cat design? Feel free to reach out. I&apos;m always open to new connections.
          </p>

          <div className="flex flex-col space-y-4 pt-4">
            {/* Direct Email */}
            <a
              href="mailto:maryamya.toure@example.com"
              className="inline-flex items-center gap-3 text-sm font-semibold text-text-primary hover:text-accent-mid transition-colors group"
            >
              <span className="p-2.5 rounded-lg bg-bg-secondary border border-border-light/50 group-hover:border-accent-light group-hover:bg-bg-tertiary transition-colors">
                <Mail className="h-4.5 w-4.5 text-accent-dark" />
              </span>
              maryamya.toure@example.com
            </a>

            {/* LinkedIn profile */}
            <a
              href="https://linkedin.com/in/maryamya"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-sm font-semibold text-text-primary hover:text-accent-mid transition-colors group"
            >
              <span className="p-2.5 rounded-lg bg-bg-secondary border border-border-light/50 group-hover:border-accent-light group-hover:bg-bg-tertiary transition-colors">
                <Linkedin className="h-4.5 w-4.5 text-accent-dark" />
              </span>
              linkedin.com/in/maryamya
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-bg-secondary/35 border border-border-light/50 rounded-xl p-6 sm:p-8 shadow-sm">
          {/* Status feedback block */}
          {status !== "idle" && toastMessage && (
            <div
              className={`mb-6 flex items-start gap-3 rounded-lg border p-4 text-xs font-semibold ${
                status === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              )}
              <span>{toastMessage}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label htmlFor="user-name" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <input
                id="user-name"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-border-light bg-bg-primary px-4 py-2.5 text-sm text-text-primary focus:border-accent-mid focus:ring-2 focus:ring-accent-light/50 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="user-email" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                id="user-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border-light bg-bg-primary px-4 py-2.5 text-sm text-text-primary focus:border-accent-mid focus:ring-2 focus:ring-accent-light/50 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="user-message" className="block text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5">
                Message
              </label>
              <textarea
                id="user-message"
                required
                rows={5}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-md border border-border-light bg-bg-primary px-4 py-2.5 text-sm text-text-primary focus:border-accent-mid focus:ring-2 focus:ring-accent-light/50 focus:outline-none resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSending}
              className="w-full flex items-center justify-center gap-2"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

      </div>
    </SectionWrapper>
  );
};
