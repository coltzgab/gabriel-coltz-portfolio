import React from 'react';

const cases = [
  { id: 1, client: "MP4 Contabil", cat: "Web Design", img: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://mp4contabil.com.br/")}/large/`, url: "https://mp4contabil.com.br/" },
  { id: 2, client: "Olivers", cat: "Branding & Web", img: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://olivers-zeta.vercel.app/")}/large/`, url: "https://olivers-zeta.vercel.app/" },
  { id: 3, client: "FinUp AI", cat: "Web Design", img: "/finup-hero.png", url: "https://finup-ai.vercel.app/" },
  { id: 4, client: "Gislaine Coltz", cat: "Personal Branding", img: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://gislaine-coltz.vercel.app/")}/large/`, url: "https://gislaine-coltz.vercel.app/" },
];

import { GlowingEffect } from './ui/glowing-effect';

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 bg-organic-black overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-center mb-16 uppercase tracking-tight">
          Cases <span className="text-organic-purple italic">Reais</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((item, index) => (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
              className={`relative group cursor-pointer rounded-3xl p-1 transition-all ${index % 2 === 0 ? 'md:mt-12' : ''}`}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="aspect-[4/5] bg-organic-gray relative overflow-hidden rounded-[calc(1.5rem-4px)]">
                <img
                  src={item.img}
                  alt={item.client}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-organic-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 border-2 border-organic-cyan/50 m-4 rounded-2xl">
                  <span className="text-organic-cyan text-xs font-bold uppercase tracking-widest mb-2">{item.cat}</span>
                  <h3 className="text-2xl font-display font-bold text-organic-white">{item.client}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};