"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Cat } from "@/types";
import { Sparkles, User } from "lucide-react";

interface TeamGridProps {
  cats: (Cat & { image?: string })[];
}

export const TeamGrid: React.FC<TeamGridProps> = ({ cats }) => {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  // Bounce variants for cats
  const catVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: shouldReduceMotion ? "linear" : "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* 1. Static Human Card ("The Human") */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={catVariants}
        className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-accent-mid bg-bg-tertiary p-6 shadow-md hover:shadow-lg transition-shadow"
      >
        {/* GPA & Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-end">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-accent-dark text-white shadow-sm border border-accent-mid">
            <Sparkles className="h-3 w-3" /> Human
          </span>
        </div>

        {/* Photo Container */}
        <div className="relative mb-5 h-44 w-36 overflow-hidden rounded-lg border-2 border-accent-mid/50 bg-bg-primary shadow-sm group-hover:scale-[1.02] transition-transform duration-300">
          {!imgError ? (
            <Image
              src="/images/maryamya.jpg"
              alt="Maryam-Ya Touré"
              fill
              className="object-cover"
              sizes="(max-width: 150px) 100vw, 150px"
              onError={() => setImgError(true)}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-accent-light/35 to-bg-tertiary text-accent-deeper text-center p-3">
              <User className="h-8 w-8 mb-1 opacity-70" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">MYT Photo</span>
            </div>
          )}
        </div>

        <h3 className="font-serif text-lg font-bold text-text-primary text-center">
          Maryam-Ya Touré
        </h3>
        <p className="text-sm text-accent-dark font-semibold text-center mt-0.5">
          Lead Developer & Founder
        </p>
        <p className="text-xs text-text-muted text-center mt-2 px-2 border-t border-border-light/40 pt-2 leading-relaxed">
          Full-Stack Dev, Cloud Engineer, AI Builder & Creator of Samyah For Skin.
        </p>
      </motion.div>

      {/* 2. Dynamic Cat Cards */}
      {cats.map((cat) => {
        // Safe check for image field. Vercel KV stores cat records which include the base64 composite image
        const catImageSrc = cat.image || (cat as { image?: string; imageUrl?: string }).imageUrl;

        return (
          <motion.div
            key={cat.id}
            variants={catVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
            className="flex flex-col items-center overflow-hidden rounded-xl border border-border-light bg-bg-primary p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Timestamp badge */}
            <span className="absolute top-3 right-3 text-[9px] text-text-muted/70 font-semibold bg-bg-secondary px-2 py-0.5 rounded-full border border-border-light/40">
              🐾 Team Member
            </span>

            {/* Assembled Cat Rendering */}
            <div className="relative mb-5 h-40 w-40 overflow-hidden rounded-lg bg-bg-secondary border border-border-light/30 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
              {catImageSrc ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={catImageSrc}
                  alt={cat.name}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="text-center p-4">
                  <span className="text-4xl mb-1 block">🐱</span>
                  <span className="text-[10px] font-semibold text-text-muted">Loading sprite...</span>
                </div>
              )}
            </div>

            <h3 className="font-serif text-lg font-bold text-text-primary text-center">
              {cat.name}
            </h3>
            <p className="text-sm text-text-secondary font-semibold text-center mt-0.5">
              {cat.role}
            </p>
            <span className="text-[10px] bg-bg-tertiary text-accent-dark border border-border-mid/40 rounded-full px-2.5 py-0.5 mt-3.5 font-bold font-mono tracking-wider">
              {cat.baseId.toUpperCase()}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
