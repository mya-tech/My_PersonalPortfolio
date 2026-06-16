"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/types";
import { Tag } from "./Tag";
import { ExternalLink, ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const maxPills = 4;
  const hasMore = project.techStack.length > maxPills;
  const remaining = project.techStack.length - maxPills;

  // Stagger entry animation
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border-light bg-bg-primary p-6 transition-shadow hover:shadow-xl hover:shadow-accent-light/10"
    >
      <div>
        {/* Project Visual Cover Image */}
        <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-lg bg-bg-secondary flex items-center justify-center border border-border-light/50">
          {project.screenshots && project.screenshots.length > 0 && !project.screenshots[0].includes("placeholder") ? (
            <Image
              src={project.screenshots[0]}
              alt={`${project.title} cover`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-light/20 to-bg-tertiary opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="z-10 flex flex-col items-center p-4 text-center">
                <span className="text-4xl mb-1 select-none">💻</span>
                <span className="font-serif text-sm font-semibold text-accent-deeper/80 tracking-wide uppercase">
                  {project.title}
                </span>
              </div>
            </>
          )}
          {/* Subtle overlay border */}
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg" />
        </div>

        {/* Project Header */}
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-serif text-xl font-bold text-text-primary group-hover:text-accent-dark transition-colors">
            {project.title}
          </h3>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-text-muted hover:text-accent-mid"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="mb-1 text-sm font-medium text-accent-dark/90 italic">
          {project.tagline}
        </p>

        <p className="mb-6 text-sm text-text-secondary line-clamp-3">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack Pills */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, maxPills).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {hasMore && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-bg-secondary text-text-muted border border-border-light">
              +{remaining} more
            </span>
          )}
        </div>

        {/* Navigation Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-sm font-semibold text-accent-mid hover:text-accent-dark transition-colors group/link"
        >
          View Project
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};
