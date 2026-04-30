import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <img
        src="/hero-gabriel-cinematic.jpeg"
        alt="Gabriel Coltz"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      <div className="relative z-10 flex min-h-screen items-end justify-center px-6 pb-24 pt-32 sm:pb-[18vh]">
        <motion.div
          className="w-[min(420px,82vw)] text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display text-[clamp(1.7rem,2.7vw,3.1rem)] font-bold leading-none text-organic-white">
            Gabriel Coltz
          </h1>

          <p className="mt-3 text-[clamp(0.72rem,1.05vw,1rem)] font-medium leading-tight text-organic-cyan">
            Estratégia · Branding · Inteligência Artificial
          </p>

          <div className="mx-auto mt-6 h-0.5 w-10 bg-organic-cyan sm:w-12" />
        </motion.div>
      </div>
    </section>
  );
};
