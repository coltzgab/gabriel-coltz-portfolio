import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements - clipped to prevent mobile overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 bg-gradient-to-l from-organic-purple to-transparent mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-to-t from-organic-cyan to-transparent rounded-full blur-3xl mix-blend-screen" />
      </div>
      <div className="container mx-auto px-6 lg:px-24 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 h-full">
        <motion.div
          className="max-w-xl flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-organic-cyan/30 rounded-full bg-organic-cyan/5">
            <Sparkles size={14} className="text-organic-cyan" />
            <span className="text-xs font-bold uppercase tracking-widest text-organic-cyan">Assessoria de Branding & MKT</span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-organic-white uppercase">
            Transformamos expertise em <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-organic-cyan to-organic-purple">
              marca poderosa.
            </span>
          </h1>

          <p className="text-organic-white/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-sans mx-auto md:mx-0">
            Identidade visual estratégica, posicionamento digital e resultados que não dependem da sorte. O óbvio precisa ser dito, mas de forma inesquecível.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button className="w-full sm:w-auto" onClick={() => document.getElementById('ai-audit')?.scrollIntoView({ behavior: 'smooth' })}>
              Diagnóstico com IA
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver Cases <ArrowRight className="inline ml-2" size={18} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block h-[500px] w-full max-w-lg flex-1"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          {/* Decorative Image Composition mimicking the collage style */}
          <div className="absolute -top-12 -right-12 w-80 h-[380px] border-2 border-organic-cyan z-20 translate-x-4 translate-y-4 rounded-[120px]"></div>
          <div className="absolute -top-12 -right-12 w-80 h-[380px] bg-organic-gray z-10 overflow-hidden rounded-[120px]">
            <img src="/astronaut-left.png" alt="Brand Art" className="w-full h-full object-cover" />
          </div>

          <div className="absolute -bottom-12 -left-12 w-72 h-[320px] border-2 border-organic-purple z-20 -translate-x-4 -translate-y-4 rounded-[100px]"></div>
          <div className="absolute -bottom-12 -left-12 w-72 h-[320px] bg-organic-black z-10 overflow-hidden rounded-[100px]">
            <img src="/astronaut-right.png" alt="Strategy Art" className="w-full h-full object-cover" />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-organic-black border border-organic-white/10 p-6 backdrop-blur-sm z-30 rounded-full shadow-2xl">
            <p className="font-display text-organic-cyan text-4xl font-bold text-center">360°</p>
            <p className="text-[10px] uppercase tracking-widest text-center text-organic-white font-bold">Visão Estratégica</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};