import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ProjectCard } from "../ui/ProjectCard";
import { projects } from "@/data/projects";
import { Code2 } from "lucide-react";

export const Projects = () => {
  // Sort projects: featured first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <SectionWrapper id="projects" className="py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-4">
        <div>
          <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
            03 · Portfolio Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
            Featured Projects
          </h2>
          <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-text-muted bg-bg-secondary border border-border-light/40 px-3 py-1.5 rounded-full select-none">
          <Code2 className="h-3.5 w-3.5 text-accent-mid" />
          Source of truth: data/projects.ts
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={idx}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
