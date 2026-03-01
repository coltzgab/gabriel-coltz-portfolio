import React, { useEffect } from 'react';
import { Palette, Diamond, Layout, PenTool, ArrowRight, Eye, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeonCarousel } from '../components/ui/NeonCarousel';
import { GlowingEffect } from '../components/ui/glowing-effect';

export const Branding: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const portfolio = [
        {
            title: "MP4 Contábil",
            category: "Branding & Identity",
            description: "Identidade sólida para o setor contábil digital.",
            image: "/branding-mp4.png",
            color: "rgba(71, 228, 190, 0.4)" // Organic Cyan
        },
        {
            title: "Olivers",
            category: "Brand System",
            description: "Ecessistema visual moderno para marca criativa.",
            image: "/branding-olivers.png",
            color: "rgba(90, 61, 127, 0.4)" // Organic Purple
        },
        {
            title: "Finup AI",
            category: "Financial Branding",
            description: "Posicionamento premium para inovação financeira.",
            image: "/branding-finup.png",
            color: "rgba(255, 107, 0, 0.4)" // Finup Orange
        },
        {
            title: "Gislaine Coltz",
            category: "Luxury Personal Branding",
            description: "Marca pessoal sofisticada e atemporal.",
            image: "/branding-gislaine.png",
            color: "rgba(191, 155, 155, 0.4)" // Soft Rose
        }
    ];

    const brandingFeatures = [
        {
            icon: <Star size={24} className="text-organic-cyan" />,
            title: "Símbolos Vivos",
            description: "Não criamos apenas logos. Criamos identidades que contam histórias e emocionam."
        },
        {
            icon: <Layout size={24} className="text-organic-cyan" />,
            title: "Sistemas Visuais",
            description: "Identidades flexíveis que funcionam do mobile ao outdoor com consistência total."
        },
        {
            icon: <PenTool size={24} className="text-organic-cyan" />,
            title: "Posicionamento",
            description: "Design que comunica profissionalismo, autoridade e a alma do seu negócio."
        }
    ];

    return (
        <div className="pt-24 font-sans selection:bg-organic-cyan selection:text-organic-black">
            {/* Hero Section */}
            <section className="pt-20 pb-0 px-6 lg:px-24 relative overflow-hidden h-[750px] flex items-center justify-center">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 h-full max-w-7xl">
                    <div className="max-w-xl flex-1 shrink-0 py-20 z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-organic-cyan/30 rounded-full bg-organic-cyan/5">
                            <Star size={14} className="text-organic-cyan" />
                            <span className="text-xs font-bold uppercase tracking-widest text-organic-cyan"> Branding & Posicionamento</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                            Identidade visual com <br className="hidden md:block" /> <span className="text-organic-cyan italic">alma</span> e estratégia
                        </h1>
                        <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans mx-auto lg:mx-0">
                            Não criamos apenas logotipos. Desenvolvemos sistemas visuais que comunicam autoridade, despertam desejo e constroem valor de marca real.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button className="px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center space-x-2 w-full sm:w-auto">
                                <span className="font-display text-lg uppercase">Criar minha marca</span>
                            </button>
                            <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center space-x-2 w-full sm:w-auto">
                                <span className="font-display text-lg uppercase tracking-wider">Ver Projetos</span>
                            </button>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:flex relative h-full w-full max-w-xl flex-1 items-end justify-center"
                    >
                        <div className="relative w-full mt-auto -mb-8">
                            <div className="absolute inset-0 bg-organic-purple/20 blur-[100px] rounded-full" />
                            <img
                                src="/branding-hero.png"
                                alt="Identidade Visual com Alma"
                                className="relative z-10 w-full h-auto object-contain object-bottom drop-shadow-[0_0_40px_rgba(167,139,250,0.15)]"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <NeonCarousel
                items={[
                    { text: "IDENTIDADE VISUAL", icon: Palette },
                    { text: "BRANDING COM ALMA", icon: Diamond },
                    { text: "POSICIONAMENTO", icon: Star },
                    { text: "DESIGN ESTRATÉGICO", icon: PenTool },
                    { text: "SISTEMAS VISUAIS", icon: Layout },
                    { text: "VALOR DE MARCA", icon: Eye }
                ]}
            />

            {/* Portfolio Showcase Section */}
            <section className="py-32 px-6 lg:px-24 bg-organic-black overflow-hidden" id="portfolio">
                <div className="container mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-4">
                            Marcas que <span className="text-organic-cyan">dominam</span> o mercado
                        </h2>
                        <p className="text-organic-white/50 text-lg max-w-2xl mx-auto font-sans">
                            Confira como transformamos conceitos abstratos em universos visuais inesquecíveis.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {portfolio.map((site, idx) => (
                            <div
                                key={idx}
                                className="group relative rounded-[60px] p-2 overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
                            >
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={2}
                                />
                                <div className="relative z-10 bg-organic-black rounded-[54px] overflow-hidden">
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img
                                            src={site.image}
                                            alt={site.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-10 relative z-10">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-organic-cyan text-xs font-bold uppercase tracking-[0.3em] mb-3 block">{site.category}</span>
                                                <h3 className="text-4xl font-display font-bold uppercase mb-2 group-hover:text-organic-cyan transition-colors">{site.title}</h3>
                                                <p className="text-organic-white/60 font-sans max-w-md">{site.description}</p>
                                            </div>
                                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-organic-black transition-all">
                                                <ArrowRight size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expertise Grid */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {brandingFeatures.map((feature, idx) => (
                            <div key={idx} className="p-10 rounded-[60px] bg-organic-black/40 border border-white/10 hover:border-organic-cyan/50 transition-all group text-center">
                                <div className="w-12 h-12 bg-organic-cyan/10 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold font-display uppercase mb-4 tracking-wide">{feature.title}</h3>
                                <p className="text-organic-white/50 leading-relaxed font-sans text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategy Section (Fixed structural bugs + Pop Art Visuals) */}
            <section className="py-24 md:py-32 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Visual Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full order-2 lg:order-1"
                        >
                            <div className="absolute -inset-10 bg-organic-cyan/10 blur-[100px] rounded-full opacity-30 animate-pulse pointer-events-none"></div>

                            <div className="relative aspect-square lg:aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 bg-organic-gray/20 backdrop-blur-3xl flex items-center justify-center group">

                                {/* Inner Card content with full-bleed image */}
                                <div className="absolute inset-0 w-full h-full border border-white/5 rounded-[30px] md:rounded-[40px] overflow-hidden bg-organic-black group p-0">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.05, 1],
                                            rotate: [0, 1, 0]
                                        }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-full relative"
                                    >
                                        <img
                                            src="/dna-pop-art.png"
                                            alt="DNA Estratégico Pop Art"
                                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-all duration-700"
                                        />
                                        {/* Gradient Overlay to blend the image edges and protect text */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-organic-black via-organic-black/60 to-transparent pointer-events-none" />
                                        <div className="absolute inset-0 bg-organic-black/20 pointer-events-none" />
                                    </motion.div>

                                    <div className="absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
                                        <div className="mt-auto">
                                            <h3 className="font-display text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[0.8] tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                                                DNA <br /> <span className="text-organic-cyan">Estratégico</span>
                                            </h3>
                                            <p className="mt-6 text-organic-white font-sans uppercase tracking-[0.4em] text-[10px] md:text-xs font-black bg-organic-cyan/40 backdrop-blur-xl w-fit mx-auto px-6 py-2 rounded-full border border-white/20 shadow-[0_0_30px_rgba(71,228,190,0.3)]">
                                                Marca em Evolução
                                            </p>
                                        </div>
                                    </div>

                                    {/* Scanline Effect for Comic/Tech vibe */}
                                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] z-30 opacity-30" />
                                </div>

                                {/* Decorative floating elements inside aspect container but outside image clip */}
                                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] border border-white/5 rounded-full opacity-20 pointer-events-none" />
                            </div>
                        </motion.div>

                        {/* Content Column */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
                                    <Sparkles size={14} className="text-organic-cyan" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Arquitetura de Marca</span>
                                </div>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-8 uppercase leading-none text-white tracking-tighter">
                                    Design que gera <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-organic-cyan to-organic-purple">valor real</span>
                                </h2>
                                <p className="text-organic-white/60 mb-12 text-base md:text-lg font-sans max-w-xl leading-relaxed font-medium">
                                    Através do Branding, transformamos a percepção do seu negócio. Não trabalhamos apenas com estética — trabalhamos com a construção de autoridade e valor percebido no mercado.
                                </p>
                            </motion.div>

                            <div className="grid gap-4 md:gap-6 w-full">
                                {[
                                    { t: "Naming e Logomarca", d: "Nomes e símbolos inesquecíveis que criam conexão profunda imediata.", icon: <Sparkles size={20} /> },
                                    { t: "Manual da Marca", d: "Diretrizes claras para manter sua marca impecável em qualquer escala.", icon: <Layout size={20} /> },
                                    { t: "Social Kit Premium", d: "Tudo o que seu negócio precisa para dominar as redes com impacto visual.", icon: <Palette size={20} /> }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className="flex items-center space-x-6 p-6 rounded-[30px] border border-white/5 bg-white/5 hover:bg-white/10 hover:border-organic-cyan/30 transition-all group overflow-hidden relative"
                                    >
                                        <div className="absolute right-[-10%] top-[-10%] w-24 h-24 bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-organic-cyan/10 text-organic-cyan flex items-center justify-center group-hover:scale-110 group-hover:bg-organic-cyan group-hover:text-black transition-all">
                                            {item.icon}
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-bold text-lg md:text-xl uppercase tracking-wide mb-1 text-white group-hover:text-organic-cyan transition-colors">{item.t}</h4>
                                            <p className="text-organic-white/40 text-xs md:text-sm font-sans leading-relaxed line-clamp-2 md:line-clamp-none">{item.d}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
