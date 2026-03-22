import React, { useEffect, useRef } from 'react';
import { PenTool, BarChart3, Globe, Share2, Layers, Search } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Branding & Identidade',
    description: 'Criação de marcas memoráveis. Logo, paleta, tipografia e todo o universo visual que comunica seus valores.',
    icon: <PenTool size={32} />
  },
  {
    id: '2',
    title: 'Social Media',
    description: 'Gestão estratégica de redes sociais. Planejamento de conteúdo, design de posts e copywriting persuasivo.',
    icon: <Share2 size={32} />
  },
  {
    id: '3',
    title: 'Tráfego Pago',
    description: 'Gestão de anúncios (Ads). Colocamos sua oferta na frente de quem realmente quer comprar.',
    icon: <BarChart3 size={32} />
  },
  {
    id: '4',
    title: 'Web Design',
    description: 'Landing pages de alta conversão e sites institucionais modernos, rápidos e otimizados para mobile.',
    icon: <Globe size={32} />
  },
  {
    id: '5',
    title: 'Posicionamento',
    description: 'Consultoria para definir sua voz, arquétipo e diferenciais competitivos no mercado.',
    icon: <Layers size={32} />
  },
  {
    id: '6',
    title: 'SEO & Copy',
    description: 'Textos que vendem e otimização para ser encontrado no Google organicamente.',
    icon: <Search size={32} />
  }
];

import { GlowingEffect } from './ui/glowing-effect';
import { ScrollReveal } from './ui/ScrollReveal';

export const Services: React.FC = () => {

  return (
    <section id="services" className="py-24 bg-organic-black overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up" duration={0.8}>
          <div className="mb-16 flex flex-col items-center md:items-end md:flex-row md:justify-between text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="font-display text-4xl font-bold mb-2 text-organic-white uppercase tracking-tighter">O que fazemos</h2>
              <div className="h-1 w-20 bg-organic-purple rounded-full"></div>
            </div>
            <p className="text-organic-white/50 mt-4 md:mt-0 max-w-md md:text-right font-sans text-sm md:text-base leading-relaxed">
              Um ecossistema completo para escalar sua autoridade digital.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const anim = index % 3 === 0 ? "slide-right" : index % 3 === 1 ? "scale-up" : "slide-left";
            return (
              <ScrollReveal
                key={service.id}
                animation={anim as any}
                delay={(index % 3) * 0.15}
                duration={0.8}
              >
                <div className="group relative p-1 rounded-[4rem] border border-white/5 overflow-hidden transition-all h-full h-full min-h-[300px]">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />
                  <div className="relative h-full p-8 rounded-[3.8rem] bg-organic-black border border-white/5 group-hover:border-white/10 transition-colors flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="mb-6 text-organic-cyan group-hover:text-organic-white transition-colors duration-300 transform group-hover:-translate-y-1">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 text-organic-white uppercase tracking-wide">{service.title}</h3>
                    <p className="text-organic-white/60 leading-relaxed text-sm font-sans italic">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  );
};