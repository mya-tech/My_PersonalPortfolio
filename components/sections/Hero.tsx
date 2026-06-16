"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, FileText, ArrowDown, User } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Button } from "../ui/Button";
import { AnimatedText } from "../ui/AnimatedText";
import { aboutData } from "@/data/about";
import { motion, useReducedMotion } from "framer-motion";

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const roles = ["Full-Stack Developer", "Cloud Engineer", "AI Builder", "Founder"];

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("projects");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Entry animations for text elements
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-b from-bg-primary via-bg-secondary/40 to-bg-primary overflow-hidden relative">
      {/* Absolute decorative background details */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-accent-light/10 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-bg-tertiary/60 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Side: 60% Width */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="md:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Status Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-bg-tertiary text-accent-dark border border-accent-light/40"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mid opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-mid"></span>
            </span>
            Available for opportunities
          </motion.div>

          {/* Heading */}
          <div className="space-y-3">
            <motion.p variants={itemVariants} className="text-sm font-bold tracking-widest text-text-muted uppercase">
              Welcome to my portfolio
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-text-primary tracking-tight font-serif"
            >
              Maryam-Ya Touré
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold text-text-secondary h-10 flex items-center"
            >
              <span className="mr-2 text-text-muted">I am a</span>
              <AnimatedText phrases={roles} className="text-accent-mid" />
            </motion.div>
          </div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed font-normal"
          >
            {aboutData.heroBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 w-full sm:w-auto">
            <Button
              onClick={handleScrollToProjects}
              variant="primary"
              size="lg"
              className="group flex items-center gap-1 w-full sm:w-auto"
            >
              View My Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
            <Button
              href="/resume/maryamya-toure-resume.pdf"
              download="Maryam-Ya_Toure_Resume.pdf"
              variant="outline"
              size="lg"
              className="flex items-center gap-1.5 w-full sm:w-auto"
            >
              <FileText className="h-4 w-4" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center space-x-5 pt-2">
            <a
              href="https://github.com/mya-tech"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-mid transition-colors p-1"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/maryamya"
              target="_blank"
              rel="noreferrer"
              className="text-text-secondary hover:text-accent-mid transition-colors p-1"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:maryamya.toure@example.com"
              className="text-text-secondary hover:text-accent-mid transition-colors p-1"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: 40% Width (Photo) */}
        <div className="md:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
            className="relative w-80 h-[380px] sm:w-[350px] sm:h-[450px] md:w-[400px] md:h-[500px] rounded-2xl border-4 border-border-mid bg-bg-primary shadow-2xl overflow-hidden group"
          >
            {/* Image Placeholder */}
            {!imgError ? (
              <Image
                src="/My_pic.heic"
                alt="Maryam-Ya Touré portrait"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 400px) 100vw, 400px"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-light/30 via-bg-tertiary to-bg-secondary flex flex-col items-center justify-center p-6 text-center text-accent-deeper">
                <User className="h-16 w-16 mb-2 opacity-50 stroke-[1.5]" />
                <span className="font-serif font-bold text-lg">Maryam-Ya Touré</span>
                <span className="text-xs font-semibold text-text-secondary mt-1">Photo Placeholder</span>
              </div>
            )}

            {/* Inner Border Ring */}
            <div className="absolute inset-0 ring-4 ring-inset ring-accent-light/20 rounded-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
