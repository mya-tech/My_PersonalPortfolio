"use client";

import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Tag } from "../ui/Tag";
import { skills } from "@/data/skills";
import { motion, useReducedMotion } from "framer-motion";
import { Library } from "lucide-react";

export const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  // Category card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: "easeOut",
      },
    }),
  };

  return (
    <SectionWrapper id="skills" className="py-20">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
          04 · My Toolbox
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
          Technical Skills
        </h2>
        <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillGroup, idx) => (
          <motion.div
            key={skillGroup.category}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
            className="group rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border-light/40">
              <Library className="h-4.5 w-4.5 text-accent-mid group-hover:scale-105 transition-transform" />
              <h3 className="font-serif text-base font-bold text-text-primary">
                {skillGroup.category}
              </h3>
            </div>

            {/* Pills Wrapper */}
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <Tag key={skill} className="px-3 py-1 font-sans text-xs tracking-wide">
                  {skill}
                </Tag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};
