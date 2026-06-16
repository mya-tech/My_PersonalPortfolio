"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { projects } from "@/data/projects";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ExternalLink, ArrowRight, Image as ImageIcon, X } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Helper description mappings to explain "how/why" each tool was used in the Deep Dive
const TECH_EXPLANATIONS: Record<string, string> = {
  React: "Used to construct component layouts with clean component state isolation.",
  Next: "Leveraged for App Router file routing, static rendering speed, and image delivery optimization.",
  "Next.js": "Leveraged for App Router file routing, static rendering speed, and image delivery optimization.",
  TypeScript: "Enforced compile-time schema constraints, preventing state-mapping bugs.",
  Tailwind: "Provided responsive styles without generating ad-hoc styling files.",
  "Tailwind CSS": "Provided responsive styles without generating ad-hoc styling files.",
  "Framer Motion": "Animated scroll reveals and accordions seamlessly while respecting user system settings.",
  Python: "Built the backend spatial-queries API endpoints with FastAPI.",
  FastAPI: "Served low-latency WebSockets connections for spatial data streams.",
  DuckDB: "Aggregated massive tabular urban datasets in-memory on the fly.",
  "NVIDIA NIM LLMs": "Translated spoken user instructions to structured SQL commands.",
  "deck.gl": "Rendered high-density visual hotspots smoothly via WebGL context layers.",
  WebSockets: "Pushed continuous DuckDB spatial updates to client dashboards.",
  "Google Routes API": "Calculated optimal transit paths between urban hazard nodes.",
  PostgreSQL: "Persisted SaaS configurations with Row-Level Security constraints.",
  Supabase: "Managed client session verification and PostgreSQL schema triggers.",
  PWA: "Cached app configurations via Service Workers, supporting offline database entries.",
  "Node.js": "Ran the containerized file conversion REST microservice.",
  "Express.js": "Configured middleware gates and route endpoints for raw document ingest.",
  "AWS EC2": "Hosted target Docker deployment clusters inside secure AWS VPCs.",
  "AWS Cognito": "Authenticated user JSON Web Tokens secure handshakes.",
  S3: "Stored user document binary uploads securely.",
  Docker: "Packaged backend environments to enforce consistent build outputs.",
  Jest: "Executed rigorous test assertion suites ensuring code coverage targets.",
  "GitHub Actions": "Automated build compilation and push to AWS registry on commits.",
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const shouldReduceMotion = useReducedMotion();

  // Find current project
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];

  // Paginated links
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  // Lightbox modal state
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-20 bg-bg-primary">
      {/* 1. Back Navigation Link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/#projects"
          className="inline-flex items-center text-sm font-semibold text-text-secondary hover:text-accent-mid transition-colors group"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to All Projects
        </Link>
      </div>

      {/* 2. Hero Banner */}
      <section className="bg-bg-secondary border-y border-border-light/50 py-12 md:py-16 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-accent-dark/95 italic mb-6">
              {project.tagline}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <Tag key={tech} className="px-3 py-1 font-sans text-xs">
                  {tech}
                </Tag>
              ))}
            </div>

            {/* External repository links */}
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Long-form story (8 Columns) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Story Content */}
          <div className="prose prose-slate max-w-none">
            <h2 className="font-serif text-2xl font-bold text-text-primary border-b border-border-light pb-2 mb-4">
              The Story
            </h2>
            <div 
              className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-6 font-normal whitespace-pre-line"
              style={{ contentVisibility: "auto" }}
            >
              {project.story}
            </div>
          </div>

          {/* Screenshots Gallery Section */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-text-primary border-b border-border-light pb-2 mb-6">
              Screenshots
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.screenshots.map((src, index) => {
                const isPlaceholder = src.includes("placeholder");
                return (
                  <div
                    key={index}
                    onClick={() => setActiveScreenshot(src)}
                    className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border-light/50 bg-bg-secondary flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:border-accent-light/75 transition-all"
                  >
                    {!isPlaceholder ? (
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-light/10 via-bg-tertiary to-bg-secondary opacity-60 group-hover:scale-102 transition-transform duration-300" />
                        <div className="z-10 flex flex-col items-center text-center p-4">
                          <ImageIcon className="h-8 w-8 text-accent-dark/60 mb-2 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-xs font-bold text-text-primary">Screenshot #{index + 1}</span>
                          <span className="text-[10px] text-text-muted mt-1 uppercase font-semibold">Click to expand preview</span>
                        </div>
                        <span className="absolute bottom-3 right-3 text-[9px] bg-white/80 border border-border-light px-2 py-0.5 rounded-full text-text-muted font-bold tracking-wider">
                          MVP STAGE
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Section (Conditional Rendering) */}
          {project.videoUrl && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-text-primary border-b border-border-light pb-2 mb-6">
                Demo Video
              </h2>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border-light bg-black">
                <iframe
                  src={project.videoUrl}
                  title="Demo Video Preview"
                  loading="lazy"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Tech Stack Deep Dive (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 rounded-xl border border-border-light bg-bg-secondary/20 p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-text-primary border-b border-border-light pb-3 mb-5">
              Technical Deep Dive
            </h2>
            
            <div className="space-y-4">
              {project.techStack.map((tech) => {
                const explanation = TECH_EXPLANATIONS[tech] || "Chosen to increase rendering execution speed and component modularity.";
                return (
                  <div key={tech} className="bg-bg-primary rounded-lg border border-border-light/60 p-4 shadow-inner">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-mid" />
                      <span className="text-xs font-extrabold text-accent-dark tracking-wide uppercase font-mono">{tech}</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                      {explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Pagination Links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-border-light/40 mt-16 pt-8 flex items-center justify-between">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent-mid transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Prev: {prevProject.title}</span>
        </Link>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent-mid transition-colors group"
        >
          <span>Next: {nextProject.title}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* 5. Screenshot Lightbox Modal overlay */}
      <AnimatePresence>
        {activeScreenshot && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <div 
              className="absolute inset-0" 
              onClick={() => setActiveScreenshot(null)} 
            />
            
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { scale: 1 } : { scale: 0.95, opacity: 0 }}
              className="bg-bg-primary border border-border-light rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 p-6 flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveScreenshot(null)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary p-1 rounded-full hover:bg-bg-secondary transition-colors"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative aspect-[16/10] w-full rounded-lg bg-bg-secondary flex flex-col items-center justify-center border border-border-light mt-4 overflow-hidden">
                {!activeScreenshot.includes("placeholder") ? (
                  <Image
                    src={activeScreenshot}
                    alt={`${project.title} expanded screenshot`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-light/10 to-bg-tertiary opacity-40" />
                    <ImageIcon className="h-16 w-16 text-accent-mid/50 mb-3" />
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {project.title} Screenshot
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">
                      Path: {activeScreenshot}
                    </p>
                    <span className="text-[10px] text-text-muted mt-4 bg-white/70 px-3 py-1 rounded-full border border-border-light uppercase font-bold tracking-wider">
                      Full screenshot mock layout coming soon in staging deployment
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
