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

export const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 bg-organic-black">
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="font-display text-4xl font-bold mb-2 text-organic-white">O que fazemos</h2>
            <div className="h-1 w-20 bg-organic-purple"></div>
          </div>
          <p className="text-organic-white/50 mt-4 md:mt-0 max-w-md text-right">
            Um ecossistema completo para escalar sua autoridade digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-1 rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-300 animate-on-scroll h-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative h-full p-8 rounded-[1.8rem] bg-organic-black border border-white/5 group-hover:border-white/10 transition-colors">
                <div className="mb-6 text-organic-cyan group-hover:text-organic-white transition-colors duration-300 transform group-hover:-translate-y-1">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3 text-organic-white uppercase tracking-wide">{service.title}</h3>
                <p className="text-organic-white/60 leading-relaxed text-sm font-sans italic">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};