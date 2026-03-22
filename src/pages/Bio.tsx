import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Users, Palette, Rocket, FileText, ChevronRight, Sparkles, Box } from 'lucide-react';
import { ShootingStars } from '../components/ui/shooting-stars';
import { CelestialSphere } from '../components/ui/celestial-sphere';

export const Bio: React.FC = () => {
    const links = [
        {
            tag: "ATENDIMENTO",
            title: "Falar no WhatsApp",
            description: "Clique aqui para iniciar um atendimento direto e personalizado com nossa equipe agora mesmo.",
            url: "https://wa.me/5551981240660",
            buttonText: "CHAMAR AGORA",
            color: "from-green-500/20 to-emerald-500/10",
            borderColor: "border-green-500/30",
            icon: <MessageSquare className="w-5 h-5 text-green-400" />,
            image: "/tv-head-man.png"
        },
        {
            tag: "SOLUÇÕES DIGITAIS",
            title: "Web Design Premium",
            description: "Desenvolvemos sites de alta performance, focados em conversão e experiência do usuário (UX).",
            url: "/web-design",
            buttonText: "VER PROJETOS",
            color: "from-organic-cyan/20 to-blue-500/10",
            borderColor: "border-organic-cyan/30",
            icon: <Globe className="w-5 h-5 text-organic-cyan" />,
            image: "/character-hero-no-bg.png"
        },
        {
            tag: "ESTRATÉGIA",
            title: "Social Media",
            description: "Gestão completa de redes sociais com foco em crescimento orgânico e autoridade de marca.",
            url: "/social-media",
            buttonText: "SABER MAIS",
            color: "from-organic-cyan/20 to-organic-purple/10",
            borderColor: "border-organic-cyan/30",
            icon: <Users className="w-5 h-5 text-organic-cyan" />,
            image: "/social-hero.png"
        },
        {
            tag: "DIREÇÃO DE ARTE",
            title: "Branding",
            description: "Criação de identidades visuais potentes que comunicam a essência e os valores do seu negócio.",
            url: "/branding",
            buttonText: "VER BRANDING",
            color: "from-organic-purple/20 to-organic-cyan/10",
            borderColor: "border-organic-purple/30",
            icon: <Palette className="w-5 h-5 text-organic-purple" />,
            image: "/branding-hero.png"
        },
        {
            tag: "LANÇAMENTOS",
            title: "Coprodução",
            description: "Parceria estratégica para transformar seu conhecimento em um infoproduto de sucesso no mercado.",
            url: "/coproduction",
            buttonText: "RESERVAR VAGA",
            color: "from-organic-cyan/20 to-organic-purple/10",
            borderColor: "border-organic-cyan/30",
            icon: <Rocket className="w-5 h-5 text-organic-cyan" />,
            image: "/coproduction-hero.png"
        },
        {
            tag: "CONTEÚDO",
            title: "Organic Blog",
            description: "Acesse nosso blog com as últimas tendências de marketing digital e IA para 2026.",
            url: "/blog",
            buttonText: "LER ARTIGOS",
            color: "from-gray-500/20 to-gray-700/10",
            borderColor: "border-white/20",
            icon: <FileText className="w-5 h-5 text-white/50" />,
            image: "/character-hero-no-bg.png"
        }
    ];

    return (
        <div className="min-h-screen bg-organic-black text-organic-white font-sans selection:bg-organic-cyan selection:text-organic-black overflow-x-hidden relative">

            {/* Background Integrado (Igual ao Hero da Home) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <CelestialSphere hue={165.0} speed={0.15} zoom={1.2} particleSize={2.0} className="w-full h-full opacity-30 mix-blend-screen" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(71,228,190,0.05)_0%,rgba(0,0,0,0)_80%)]" />
                <div className="stars absolute inset-0" />

                <ShootingStars
                    starColor="#47e4be"
                    trailColor="#2EB9DF"
                    minSpeed={15}
                    maxSpeed={35}
                    minDelay={1000}
                    maxDelay={3000}
                />
                <ShootingStars
                    starColor="#5a3d7f"
                    trailColor="#47e4be"
                    minSpeed={10}
                    maxSpeed={25}
                    minDelay={2000}
                    maxDelay={4000}
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 pb-24">
                {/* Hero Futurista (Adeus bolinha clichê) */}
                <header className="text-center mb-24 px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Abstract Geometry */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-organic-cyan/10 blur-[60px] rounded-full animate-pulse" />

                        <div className="relative z-20 mb-8 flex flex-col items-center">
                            {/* Floating Glass Logo Container */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl mb-10 group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-organic-cyan/50 to-organic-purple/50 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
                                <img src="/logo.png" alt="Organic" className="w-20 h-auto relative z-10 brightness-110" />

                                {/* Orbiting Elements decoration */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-organic-cyan rounded-full blur-[2px] animate-ping opacity-30" />
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-organic-purple rounded-full blur-[1px]" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-organic-cyan/5 border border-organic-cyan/20 text-organic-cyan text-[10px] font-black tracking-[0.4em] mb-2 uppercase">
                                    <Box size={14} className="animate-spin-slow" />
                                    Inteligência Organic
                                </div>
                                <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white leading-[0.9] flex flex-col">
                                    <span>Além do</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-organic-cyan to-organic-purple">Comum</span>
                                </h1>
                                <p className="text-sm text-organic-white/60 font-medium max-w-[280px] mx-auto leading-relaxed border-t border-white/10 pt-4 mt-4">
                                    Estratégia 360° para marcas que cansam do básico e buscam o extraordinário.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </header>

                {/* Blocos Grandes (Estilo Gislaine Coltz) */}
                <div className="space-y-8">
                    {links.map((link, index) => (
                        <motion.a
                            key={link.title}
                            href={link.url}
                            target={link.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group block relative"
                        >
                            <div className={`relative min-h-[220px] overflow-hidden bg-gradient-to-br ${link.color} border ${link.borderColor} backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 flex flex-col justify-center shadow-lg transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-white/5`}>

                                {/* Info Section */}
                                <div className="max-w-[65%] md:max-w-[60%] space-y-3 md:space-y-4 relative z-20 text-left pr-2 md:pr-0">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black tracking-[0.2em] text-white/50 uppercase">
                                        {link.icon}
                                        {link.tag}
                                    </div>

                                    <h3 className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                                        {link.title}
                                    </h3>

                                    <p className="text-xs md:text-sm text-organic-white/60 leading-relaxed font-medium line-clamp-3 md:line-clamp-none whitespace-normal break-words">
                                        {link.description}
                                    </p>

                                    <div className="pt-2">
                                        <div className="inline-flex items-center gap-2 px-6 py-2.5 md:py-3 bg-white/10 group-hover:bg-white text-white group-hover:text-black rounded-full font-bold text-[9px] md:text-[10px] tracking-widest uppercase transition-all duration-300">
                                            {link.buttonText}
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Large Side Image */}
                                <div className="absolute right-[-10px] md:right-[-20px] bottom-[-10px] md:bottom-[-20px] w-[45%] md:w-[50%] h-[110%] md:h-[120%] z-10 pointer-events-none group-hover:scale-110 group-hover:-translate-y-2 md:group-hover:-translate-y-4 group-hover:-translate-x-2 md:group-hover:-translate-x-4 transition-all duration-700 ease-out flex items-end justify-end">
                                    <img
                                        src={link.image}
                                        alt=""
                                        className="w-full h-full object-contain object-bottom drop-shadow-2xl opacity-40 md:opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>

                                {/* Aesthetic Glow Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Footer Minimalista */}
                <footer className="mt-24 text-center">
                    <div className="flex justify-center gap-10 mb-10">
                        {['Instagram', 'Linkedin', 'Behance'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-organic-white/30 hover:text-organic-cyan transition-all uppercase text-[10px] font-black tracking-[0.3em] hover:tracking-[0.4em]"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                    <div className="space-y-2 opacity-20">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                            Organic Assessoria
                        </p>
                        <p className="text-[8px] font-medium uppercase tracking-[0.2em]">
                            &copy; 2026 - All Rights Reserved
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};
