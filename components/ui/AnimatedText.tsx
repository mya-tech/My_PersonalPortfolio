"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface AnimatedTextProps {
  phrases: string[];
  interval?: number;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  phrases,
  interval = 2000,
  className
}) => {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases.length, interval]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
          className="inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
