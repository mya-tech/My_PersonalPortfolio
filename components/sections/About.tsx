"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SectionWrapper } from "../ui/SectionWrapper";
import { aboutData } from "@/data/about";
import { UserCheck } from "lucide-react";

// Hook to perform a high-performance count-up animation
const useCountUp = (target: number, duration: number = 1000, trigger: boolean = false, isFloat: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let frameId: number;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCount(easedProgress * target);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, trigger]);

  return isFloat ? count.toFixed(1) : Math.floor(count);
};

interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  trigger: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, prefix = "", suffix = "", trigger }) => {
  const isFloat = value % 1 !== 0;
  const displayVal = useCountUp(value, 1500, trigger, isFloat);

  return (
    <div className="bg-bg-primary border border-border-light rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="text-2xl sm:text-3xl font-bold font-serif text-accent-dark">
        {prefix}{displayVal}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-text-secondary mt-1 uppercase">
        {label}
      </div>
    </div>
  );
};

export const About = () => {
  const [imgError, setImgError] = useState(false);
  const [triggerStats, setTriggerStats] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Monitor when section is visible to trigger stat count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggerStats(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <SectionWrapper id="about" className="py-20">
        {/* Section Title */}
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-extrabold text-accent-mid tracking-widest uppercase block mb-2">
            01 · Get to know me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-text-primary">
            About Me
          </h2>
          <div className="h-1 w-12 bg-accent-mid rounded mt-3" />
        </div>

        {/* Two-Column Bio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Column: Portrait Illustration / Secondary Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl border-4 border-border-light bg-bg-secondary shadow-lg overflow-hidden group">
              {!imgError ? (
                <Image
                  src="/My_pic2.jpg"
                  alt="Maryam-Ya Touré working profile"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  sizes="(max-width: 288px) 100vw, 288px"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary to-bg-secondary flex flex-col items-center justify-center p-6 text-center text-accent-deeper">
                  <UserCheck className="h-16 w-16 mb-2 opacity-50 stroke-[1.5]" />
                  <span className="font-serif font-bold text-lg">Maryam-Ya Touré</span>
                  <span className="text-xs font-semibold text-text-muted mt-1 leading-relaxed">
                    Creative Bio Illustration
                  </span>
                </div>
              )}
              {/* Inner ring overlay */}
              <div className="absolute inset-0 ring-4 ring-inset ring-accent-light/10 rounded-xl" />
            </div>
          </div>

          {/* Right Column: Bio Paragraphs */}
          <div className="md:col-span-7 flex flex-col space-y-5">
            {aboutData.storyParagraphs.map((para, idx) => (
              <p key={idx} className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                {para}
              </p>
            ))}
          </div>

        </div>

        {/* Fun Facts Strip */}
        <div className="mt-16 md:mt-20 pt-8 border-t border-border-light/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {aboutData.funFacts.map((fact, idx) => (
              <StatCard
                key={idx}
                value={fact.value}
                label={fact.label}
                prefix={fact.prefix}
                suffix={fact.suffix}
                trigger={triggerStats}
              />
            ))}
          </div>
        </div>

      </SectionWrapper>
    </div>
  );
};
