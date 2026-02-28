import React, { useEffect } from 'react';
import { Palette, Diamond, Layout, PenTool, CheckCircle2, ArrowRight, Eye, Star } from 'lucide-react';
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
            description: "Ecossistema visual moderno para marca criativa.",
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
            <section className="py-20 px-6 lg:px-24">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-organic-cyan/30 rounded-full bg-organic-cyan/5">
                            <Star size={14} className="text-organic-cyan" />
                            <span className="text-xs font-bold uppercase tracking-widest text-organic-cyan"> Branding & Posicionamento</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                            Identidade visual com <span className="text-organic-cyan">alma</span> e estratégia
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
                                    borderWidth={3}
                                />
                                <div className="relative rounded-[50px] overflow-hidden bg-organic-black h-full">
                                    {/* Glow Effect Background */}
                                    <div
                                        className="absolute -inset-20 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: site.color }}
                                    />

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

            {/* Strategy Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="absolute -inset-10 bg-organic-purple/20 blur-[100px] rounded-full opacity-30 pointer-events-none"></div>
                            <div className="relative aspect-square rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center group overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-organic-black to-transparent">
                                    <p className="font-display text-5xl font-bold uppercase">DNA <br />Estratégico</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase leading-none">Design que gera <span className="text-organic-cyan">valor real</span></h2>
                                <p className="text-organic-white/60 mb-12 text-lg font-sans max-w-xl">
                                    Através do Branding, transformamos a percepção do seu negócio. Saia da guerra de preços e entre no campo do valor percebido.
                                </p>
                            </div>
                            <div className="space-y-8">
                                {[
                                    { t: "Naming e Logomarca", d: "Criação de nomes e símbolos que ficam na memória." },
                                    { t: "Manual da Marca", d: "Regras claras para manter sua identidade sempre impecável." },
                                    { t: "Papelaria e Social Kit", d: "Tudo o que você precisa para começar a rodar amanhã." }
                                ].map((item, i) => (
                                    <div key={i} className="flex space-x-6 p-6 rounded-full border border-white/5 hover:bg-white/5 transition-colors">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-organic-cyan text-organic-black flex items-center justify-center font-bold font-display">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl uppercase tracking-wide mb-1">{item.t}</h4>
                                            <p className="text-organic-white/40 text-sm font-sans">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
