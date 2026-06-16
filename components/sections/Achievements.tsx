"use client";

import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { achievements } from "@/data/achievements";
import * as LucideIcons from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export const Achievements = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <SectionWrapper id="achievements" className="py-20 bg-bg-secondary/20 border-y border-border-light/20">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
          06 · Milestones & Awards
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
          Achievements
        </h2>
        <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
      </div>

      {/* Grid: 3 columns desktop, 1 mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item, idx) => {
          // Dynamically resolve icon component
          const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[item.icon] || LucideIcons.Award;

          return (
            <motion.div
              key={item.title}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="relative flex flex-col justify-between rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                {/* Icon & Year Row */}
                <div className="flex justify-between items-center mb-5">
                  <div className="p-3 bg-bg-tertiary text-accent-dark border border-border-mid/50 rounded-lg">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold bg-bg-secondary text-text-secondary border border-border-light px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-normal">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
