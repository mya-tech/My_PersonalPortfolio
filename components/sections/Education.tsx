"use client";

import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Tag } from "../ui/Tag";
import { GraduationCap, BookOpen } from "lucide-react";

export const Education = () => {
  const coursework = [
    "Cloud Computing (CCP555)",
    "Database Administration & Design",
    "Open Source Systems (OSP390)",
    "Object-Oriented Programming (C++)",
    "Software Architecture",
    "Web Development (HTML/CSS/JS)",
    "Advanced Web Technologies",
    "Algorithms & Data Structures"
  ];

  return (
    <SectionWrapper id="education" className="py-16 md:py-20">
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
          05 · Academic Background
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
          Education
        </h2>
        <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
      </div>

      {/* Single Clean Card */}
      <div className="max-w-3xl mx-auto rounded-xl border border-border-light bg-bg-primary p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 pb-5 border-b border-border-light/40">
          
          {/* Logo Placeholder & Info */}
          <div className="flex gap-4 items-start">
            <div className="h-12 w-12 rounded-lg bg-bg-tertiary flex items-center justify-center border border-border-mid text-accent-dark select-none flex-shrink-0">
              <span className="font-serif font-black text-xl tracking-wider">S</span>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-text-primary">
                Seneca Polytechnic
              </h3>
              <p className="text-sm font-semibold text-accent-dark mt-0.5">
                Honours Bachelor of Technology (Software Development)
              </p>
              <p className="text-xs text-text-muted mt-1 flex items-center gap-1.5 font-medium">
                <BookOpen className="h-3.5 w-3.5" />
                Sept 2022 - April 2026 (Expected)
              </p>
            </div>
          </div>

          {/* GPA Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-light/30 border border-accent-mid/40 rounded-full text-xs font-extrabold text-accent-dark font-sans shadow-sm select-none">
            <GraduationCap className="h-4 w-4" />
            GPA 3.9 / 4.0
          </div>
        </div>

        {/* Coursework Tags */}
        <div>
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-3 flex items-center gap-1.5">
            Key Coursework
          </h4>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course) => (
              <Tag key={course} className="px-3 py-1 font-sans text-xs">
                {course}
              </Tag>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};
