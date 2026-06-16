"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/experience";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Calendar, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  exp: typeof experiences[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ exp, index, isOpen, onToggle }) => {
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  // Pop-in entry variants
  const nodeVariants = {
    hidden: { scale: shouldReduceMotion ? 1 : 0.6, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 12, delay: shouldReduceMotion ? 0 : 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : (isEven ? -40 : 40) },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 16, delay: shouldReduceMotion ? 0 : 0.15 }
    }
  };

  const cardElement = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "w-full rounded-xl border border-border-light bg-bg-primary p-5 shadow-sm hover:shadow-md transition-shadow text-left cursor-pointer select-none",
        isOpen && "border-accent-light ring-1 ring-accent-light/35 bg-bg-secondary/20"
      )}
      onClick={onToggle}
    >
      {/* Header metadata */}
      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-semibold text-accent-dark">
        <span className="inline-flex items-center gap-1 bg-tag-bg text-tag-text border border-tag-border px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px]">
          {exp.type}
        </span>
        <span className="inline-flex items-center gap-1 text-text-muted">
          <Calendar className="h-3 w-3" />
          {exp.period}
        </span>
      </div>

      <h3 className="font-serif text-lg font-bold text-text-primary mb-0.5 group-hover:text-accent-mid">
        {exp.role}
      </h3>
      <p className="text-sm font-semibold text-text-secondary mb-3">
        {exp.company}
      </p>

      {/* Trigger button for Accordion */}
      <div className="flex items-center text-xs font-bold text-accent-mid hover:text-accent-dark transition-colors">
        {isOpen ? (
          <span className="flex items-center gap-1">
            <Minus className="h-3.5 w-3.5" /> Collapse details
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Plus className="h-3.5 w-3.5" /> Expand details
          </span>
        )}
      </div>

      {/* Accordion bullets list */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-2 border-t border-border-light/40 pt-3 text-xs sm:text-sm text-text-secondary list-disc pl-4 leading-relaxed">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="marker:text-accent-mid">
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="relative mb-12 last:mb-0 flex flex-col md:flex-row items-start md:justify-between w-full">
      {/* 1. Timeline Connector Circle (Pops In) */}
      <motion.button
        onClick={onToggle}
        variants={nodeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={cn(
          "absolute left-4 md:left-1/2 top-1.5 -translate-x-[9.5px] md:-translate-x-1/2 z-20 h-5 w-5 rounded-full border-2 bg-bg-primary transition-all duration-300 flex items-center justify-center shadow-sm hover:scale-110",
          isOpen ? "border-accent-dark ring-4 ring-accent-light/30" : "border-accent-mid"
        )}
        title={isOpen ? "Collapse Details" : "Expand Details"}
      >
        <div className={cn("h-2 w-2 rounded-full transition-colors", isOpen ? "bg-accent-dark" : "bg-accent-mid")} />
      </motion.button>

      {/* 2. Dynamic card and spacer positions based on index parity */}
      {isEven ? (
        <>
          <div className="w-full md:w-[45%] pl-10 md:pl-0 pr-0 md:pr-8 flex flex-col">
            {cardElement}
          </div>
          <div className="hidden md:block w-[45%]" />
        </>
      ) : (
        <>
          <div className="hidden md:block w-[45%]" />
          <div className="w-full md:w-[45%] pl-10 md:pl-8 flex flex-col">
            {cardElement}
          </div>
        </>
      )}
    </div>
  );
};

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  // Track open sections. We list chronological order (TDSB, Seneca, Samyah, Gemini Université)
  // Let's reverse them or show them as is. The experiences array in data/experience.ts is reverse chronological.
  // The spec says "Entries (in order): TDSB, Seneca, Samyah, Gemini". Let's sort or list them so they are in that order!
  // Let's map chronological:
  const chronologicalExp = [...experiences].reverse(); // Since experiences starts with Gemini (Latest) and ends with TDSB. Reversing gives chronological!
  
  const [openIndex, setOpenIndex] = useState<number | null>(chronologicalExp.length - 1); // Open the latest job by default (which is index 3)

  // Scroll hook to track percentage of timeline scrolled through
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  // Smooth drawing effect using springs
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleToggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <SectionWrapper id="experience" className="py-20">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
          02 · Professional Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
          Work Experience
        </h2>
        <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-4">
        
        {/* Timeline background guide line (static light color) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-bg-secondary -translate-x-[0.5px] md:-translate-x-1/2" />

        {/* Timeline active line (draws on scroll) */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-mid origin-top -translate-x-[0.5px] md:-translate-x-1/2 z-10"
          />
        )}

        {/* Render experiences in chronological order */}
        <div className="flex flex-col">
          {chronologicalExp.map((exp, idx) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};
