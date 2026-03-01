import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

export const ClientList: React.FC = () => {
    const clients = [
        "JJ Lima",
        "Juliano Camello",
        "MP4 Contábil",
        "Next Imóveis",
        "Olivers",
        "FinUp",
        "ClipStorm",
        "Gislaine Coltz"
    ];

    return (
        <section className="py-32 relative overflow-hidden bg-organic-black">
            {/* Background elements to make it pop */}
            <div className="absolute inset-0 bg-gradient-to-b from-organic-black via-organic-cyan/5 to-organic-black pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-organic-cyan/10 blur-[120px] rounded-[100%] pointer-events-none" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-organic-cyan/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-organic-cyan/30 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <ScrollReveal animation="fade-up" duration={0.8}>
                    <div className="text-center mb-20 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-organic-cyan/30 rounded-full bg-organic-cyan/10">
                            <Star size={16} className="text-organic-cyan fill-organic-cyan/50" />
                            <span className="text-xs font-bold uppercase tracking-widest text-organic-cyan">Parcerias de Elite</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase leading-tight mb-4 text-white">
                            Marcas que <span className="text-organic-cyan italic">aceleramos</span>
                        </h2>
                        <p className="text-lg text-organic-white/60 font-sans max-w-2xl">
                            Estratégias que transformam negócios. Conheça as empresas que confiam na Organic para dominar seus mercados.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {clients.map((client, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                            className="group relative flex items-center justify-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-organic-cyan/40 transition-all duration-300 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-organic-cyan/0 via-organic-cyan/0 to-organic-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-center text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(71,228,190,0.8)] transition-all duration-300 select-none z-10">
                                {client}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
