import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const testimonials = [
  {
    quote: 'A Organic transformou completamente a presença digital da MP4. Em 3 meses dobramos a captação de novos clientes pelo site. O trabalho de branding é impecável.',
    name: 'Eduardo M.',
    role: 'CEO',
    company: 'MP4 Contábil',
    initials: 'EM',
    color: 'from-organic-cyan/20 to-organic-purple/20',
  },
  {
    quote: 'Identidade visual que capturou exatamente o posicionamento que queríamos para o mercado imobiliário premium. A equipe entende de negócio, não só de design.',
    name: 'Carlos F.',
    role: 'Diretor Comercial',
    company: 'Next Imóveis',
    initials: 'CF',
    color: 'from-organic-purple/20 to-organic-cyan/20',
  },
  {
    quote: 'O trabalho de social media e branding elevou o nível da nossa marca a outro patamar. Hoje somos referência visual no segmento e os resultados falam por si.',
    name: 'Ana L.',
    role: 'Fundadora',
    company: 'Olivers',
    initials: 'AL',
    color: 'from-organic-cyan/10 to-organic-purple/10',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-organic-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-organic-black via-organic-purple/5 to-organic-black pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-organic-purple/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-organic-purple/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-organic-purple/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-organic-purple/40 rounded-full bg-organic-purple/10">
              <Star size={14} className="text-organic-purple fill-organic-purple/60" />
              <span className="text-xs font-bold uppercase tracking-widest text-organic-purple">Depoimentos</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase leading-tight mb-4 text-white">
              O que nossos <span className="text-organic-cyan italic">clientes</span> dizem
            </h2>
            <p className="text-lg text-organic-white/50 font-sans max-w-xl">
              Resultados reais de empresas que confiaram na Organic para elevar sua marca.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 0.15} duration={0.7}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-6 h-full overflow-hidden group hover:border-organic-cyan/30 transition-colors duration-300"
              >
                {/* bg glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]`} />

                <Quote size={28} className="text-organic-cyan/40 flex-shrink-0 relative z-10" />

                <p className="text-organic-white/70 font-sans text-sm leading-relaxed italic relative z-10 flex-1">
                  "{t.quote}"
                </p>

                {/* Stars */}
                <div className="flex gap-1 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="text-organic-cyan fill-organic-cyan" />
                  ))}
                </div>

                <div className="flex items-center gap-4 relative z-10 border-t border-white/10 pt-5">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-organic-cyan/30 to-organic-purple/30 border border-organic-cyan/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-organic-cyan font-display">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-organic-white font-bold text-sm font-sans">{t.name}</p>
                    <p className="text-organic-white/40 text-xs font-sans">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
