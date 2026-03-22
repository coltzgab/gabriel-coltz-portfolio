import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CarouselItem {
    icon: LucideIcon;
    text: string;
}

interface NeonCarouselProps {
    items: CarouselItem[];
    speed?: number;
}

export const NeonCarousel: React.FC<NeonCarouselProps> = ({ items, speed = 25 }) => {
    // Duplicamos os itens para garantir um loop contínuo e preencher a tela
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
        <div className="neon-carousel relative w-full h-16 flex items-center bg-black/40 backdrop-blur-sm border-y border-organic-cyan/10 z-20" style={{ overflow: 'clip', contain: 'paint' }}>
            {/* Soft LED effect instead of strong glow */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(71,228,190,0.05)] pointer-events-none z-10" />

            <div className="flex w-full" style={{ overflow: 'clip' }}>
                <motion.div
                    className="flex items-center gap-16 whitespace-nowrap px-8"
                    animate={{
                        x: [0, -1200],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: speed * 1.5,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="flex items-center gap-4 text-white/80 font-sans font-bold text-sm uppercase tracking-[0.2em] group flex-shrink-0"
                            >
                                <div className="text-organic-cyan/70 group-hover:text-organic-cyan group-hover:scale-110 transition-all duration-300">
                                    <Icon size={18} strokeWidth={2.5} />
                                </div>
                                <span className="group-hover:text-white transition-colors duration-300">
                                    {item.text}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};
