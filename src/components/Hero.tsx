import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full opacity-20 bg-gradient-to-l from-organic-purple to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10 bg-gradient-to-t from-organic-cyan to-transparent pointer-events-none rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-24 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
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

          <p className="text-organic-white/60 text-base md:text-lg max-w-lg mb-10 leading-relaxed font-sans">
            Identidade visual estratégica, posicionamento digital e resultados que não dependem da sorte. O óbvio precisa ser dito, mas de forma inesquecível.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => document.getElementById('ai-audit')?.scrollIntoView({ behavior: 'smooth' })}>
              Diagnóstico com IA
            </Button>
            <Button variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              Ver Cases <ArrowRight className="inline ml-2" size={18} />
            </Button>
          </div>
        </div>

        <div className="relative hidden md:block h-[600px]">
          {/* Decorative Image Composition mimicking the collage style */}
          <div className="absolute top-10 right-10 w-64 h-80 border-2 border-organic-cyan z-20 translate-x-4 translate-y-4 rounded-full"></div>
          <div className="absolute top-10 right-10 w-64 h-80 bg-organic-gray z-10 overflow-hidden rounded-full">
            <img src="/astronaut-left.png" alt="Brand Art" className="w-full h-full object-cover" />
          </div>

          <div className="absolute bottom-10 left-10 w-56 h-72 border-2 border-organic-purple z-20 -translate-x-4 -translate-y-4 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-56 h-72 bg-organic-black z-10 overflow-hidden rounded-full">
            <img src="/astronaut-right.png" alt="Strategy Art" className="w-full h-full object-cover" />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-organic-black border border-organic-white/10 p-6 backdrop-blur-sm z-30 rounded-full shadow-2xl">
            <p className="font-display text-organic-cyan text-4xl font-bold text-center">360°</p>
            <p className="text-[10px] uppercase tracking-widest text-center text-organic-white font-bold">Visão Estratégica</p>
          </div>
        </div>
      </div>
    </section>
  );
};