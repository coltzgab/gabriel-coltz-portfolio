import React, { useEffect, useRef } from 'react';
import { Palette, Layers, Smartphone, Search, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Globe, Zap, Shield, Cpu } from 'lucide-react';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const WebDesign: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon: <CheckCircle2 className="text-organic-cyan" />,
            title: "Sites com Foco em Conversão",
            description: "Cada elemento é estrategicamente posicionado para guiar o visitante até o objetivo final."
        },
        {
            icon: <Palette className="text-organic-cyan" />,
            title: "Design Exclusivo e Moderno",
            description: "Sua marca merece uma identidade única que transmita autoridade e profissionalismo."
        },
        {
            icon: <Smartphone className="text-organic-cyan" />,
            title: "Totalmente Responsivo",
            description: "Seu site terá uma performance impecável em computadores, tablets e smartphones."
        },
        {
            icon: <Search className="text-organic-cyan" />,
            title: "SEO Otimizado desde o Início",
            description: "Sua estrutura é pensada para ser amigável aos motores de busca como o Google."
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Diagnóstico e Estratégia",
            description: "Entendemos seu mercado e objetivos para criar uma solução personalizada."
        },
        {
            step: "02",
            title: "Design e Layout",
            description: "Criação da identidade visual e interface do usuário focada na experiência do cliente."
        },
        {
            step: "03",
            title: "Desenvolvimento",
            description: "Transformação do design em código sólido, rápido e seguro."
        },
        {
            step: "04",
            title: "Testes e Lançamento",
            description: "Revisão rigorosa e garantia de que tudo está perfeito para o lançamento."
        }
    ];

    const portfolio = [
        {
            title: "MP4 Contabil",
            category: "Contabilidade Digital",
            description: "Plataforma moderna para serviços contábeis com foco em conversão.",
            url: "https://mp4contabil.com.br/",
            image: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://mp4contabil.com.br/")}/large/`
        },
        {
            title: "Olivers",
            category: "Estúdio Criativo",
            description: "Landing page minimalista e sofisticada para serviços criativos.",
            url: "https://olivers-zeta.vercel.app/",
            image: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://olivers-zeta.vercel.app/")}/large/`
        },
        {
            title: "FinUp AI",
            category: "SaaS & Finanças",
            description: "Interface tecnológica para plataforma de inteligência financeira.",
            url: "https://finup-ai.vercel.app/",
            image: "/finup-hero.png"
        },
        {
            title: "ClipStorm",
            category: "SaaS & IA",
            description: "Plataforma avançada de automação de vídeos curtos com inteligência artificial e narrativas inteligentes.",
            url: "https://clipstorm-indol.vercel.app/",
            image: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://clipstorm-indol.vercel.app/")}/large/`
        },
        {
            title: "About Us Page",
            category: "Institucional",
            description: "Página institucional com design moderno e interativo.",
            url: "https://theme.creativemox.com/digimax/template-kit/homepage/?storefront=envato-elements",
            image: "https://organic-mkt.com.br/wp-content/uploads/2025/04/about-us.jpg"
        },
        {
            title: "Gislaine Coltz",
            category: "Landing Page & Mentoria",
            description: "Landing page de alta conversão para profissional de destaque no setor de estética avançada.",
            url: "https://gislaine-coltz.vercel.app/",
            image: `https://v1.screenshot.11ty.dev/${encodeURIComponent("https://gislaine-coltz.vercel.app/")}/large/`
        }
    ];

    const plans = [
        {
            name: "LP Vendedora",
            price: "Sob Consulta",
            features: [
                "Focada em conversão direta",
                "Layout Exclusivo",
                "Otimização para Dispositivos",
                "Suporte Domínio/Hospedagem"
            ]
        },
        {
            name: "Site Institucional",
            price: "Sob Consulta",
            highlight: true,
            features: [
                "Ideal para autoridade",
                "SEO Otimizado",
                "Copywriting Otimizado",
                "Blog Automático com IA (Postagens Semanais)",
                "Múltiplas páginas",
                "Suporte Total"
            ]
        }
    ];

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = window.innerWidth > 768 ? 600 : 300;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="pt-24 font-sans text-organic-white">
            {/* Hero Section */}
            <section className="pt-20 pb-0 px-6 lg:px-24 relative overflow-hidden h-[600px] flex items-center justify-center">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 h-full">
                    <div className="max-w-xl py-20 z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                            Web Design que vai além <br /> <span className="text-organic-cyan">da aparência</span>
                        </h1>
                        <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans mx-auto lg:mx-0">
                            Na Organic, não criamos apenas sites bonitos – desenvolvemos experiências de usuários que impulsionam resultados reais para sua marca.
                        </p>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full flex items-center space-x-2 hover:scale-105 transition-transform"
                        >
                            <span className="font-display text-lg uppercase">Falar com Especialista</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                    {/* Character Column */}
                    <div className="hidden lg:block relative h-full flex-shrink-0">
                        <img
                            src="/character-hero-no-bg.png"
                            alt="Character"
                            className="h-full w-auto object-contain object-bottom"
                        />
                    </div>
                </div>
            </section>

            <div className="relative z-30">
                <NeonCarousel
                    items={[
                        { text: "SITES PERSONALIZADOS", icon: Globe },
                        { text: "FOCO EM CONVERSÃO", icon: Zap },
                        { text: "SEO OTIMIZADO", icon: Search },
                        { text: "DESIGN EXCLUSIVO", icon: Palette },
                        { text: "PERFORMANCE MÁXIMA", icon: Cpu },
                        { text: "USER EXPERIENCE", icon: Layers }
                    ]}
                />
            </div>

            {/* Why Organic? */}
            <section className="py-24 bg-organic-gray/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-display font-bold mb-4">Por que escolher a Organic?</h2>
                        <div className="w-20 h-1 bg-organic-cyan mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-8 border border-white/5 rounded-[60px] hover:border-organic-cyan/30 transition-all bg-organic-black/40 text-center">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-display font-bold mb-3">{feature.title}</h3>
                                <p className="text-organic-white/60 text-sm leading-relaxed font-sans">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section - Redesigned as Horizontal Scroll */}
            <section className="py-24 bg-organic-black overflow-hidden relative group/portfolio">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                        <div className="text-center md:text-left">
                            <h2 className="text-5xl md:text-7xl font-display font-bold bg-gradient-to-r from-organic-cyan to-white bg-clip-text text-transparent">
                                Nosso Portfólio
                            </h2>
                            <div className="w-24 h-1 bg-organic-cyan mt-2 rounded-full hidden md:block"></div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-organic-cyan hover:text-organic-black hover:border-organic-cyan transition-all"
                                aria-label="Anterior"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-organic-cyan hover:text-organic-black hover:border-organic-cyan transition-all"
                                aria-label="Próximo"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide"
                    >
                        {portfolio.map((site, idx) => (
                            <a
                                key={idx}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-w-[280px] md:min-w-[600px] snap-center group bg-white/5 border border-white/10 rounded-[60px] overflow-hidden hover:border-organic-cyan transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                            >
                                <div className="aspect-[16/9] overflow-hidden relative">
                                    <img
                                        src={site.image}
                                        alt={site.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-organic-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                <div className="p-8">
                                    <span className="text-organic-cyan text-xs font-semibold uppercase tracking-widest mb-2 block font-sans">{site.category}</span>
                                    <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-organic-cyan transition-colors">{site.title}</h3>
                                    <p className="text-organic-white/60 text-sm leading-relaxed font-sans">
                                        {site.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 text-center md:text-left">
                        <div className="max-w-2xl mx-auto md:mx-0">
                            <h2 className="text-5xl font-display font-bold mb-4">Processo Transparente</h2>
                            <p className="text-organic-white/60 font-sans">Agilidade e transparência em cada etapa do seu projeto.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
                        {methodology.map((m, idx) => (
                            <div key={idx} className="relative p-8 border-l border-white/10 group hover:border-organic-cyan transition-colors">
                                <span className="text-5xl font-display font-bold text-white/10 group-hover:text-organic-cyan/20 transition-colors absolute top-4 right-4">{m.step}</span>
                                <h3 className="text-2xl font-display font-bold mb-4 relative z-10">{m.title}</h3>
                                <p className="text-organic-white/60 text-sm relative z-10 font-sans">{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section className="py-24 bg-organic-gray/20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-display font-bold mb-4">Nossos Planos</h2>
                        <p className="text-organic-white/60 font-sans">Soluções sob medida para o seu momento de negócio.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {plans.map((plan, idx) => (
                            <div key={idx} className={`p-8 rounded-[60px] border ${plan.highlight ? 'border-organic-cyan bg-organic-cyan/5 scale-105 relative z-10' : 'border-white/10 bg-organic-black'}`}>
                                {plan.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-organic-cyan text-organic-black text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full font-display">Mais Procurado</span>}
                                <div className="mb-8">
                                    <h3 className="text-3xl font-display font-bold mb-2">{plan.name}</h3>
                                    <p className="text-organic-white/50 text-sm font-sans">{plan.price}</p>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f, fidx) => (
                                        <li key={fidx} className="flex items-center space-x-3 text-sm text-organic-white/70 font-sans">
                                            <CheckCircle2 size={16} className="text-organic-cyan flex-shrink-0" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`w-full py-3 rounded-full font-display text-xl transition-all ${plan.highlight ? 'bg-organic-cyan text-organic-black hover:bg-white' : 'border border-white/20 hover:border-white'}`}
                                >
                                    Solicitar Proposta
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 text-center">
                <div className="container mx-auto max-w-4xl bg-gradient-to-br from-organic-purple/20 to-organic-cyan/10 p-16 rounded-[60px] border border-white/5">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Pronto para transformar sua presença digital?</h2>
                    <p className="text-organic-white/70 mb-10 text-lg font-sans">
                        Estamos prontos para criar um site que não apenas pareça bom, mas que venda.
                    </p>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-10 py-4 bg-white text-organic-black font-bold rounded-full hover:scale-105 transition-transform font-display text-2xl"
                    >
                        Quero meu site agora
                    </button>
                </div>
            </section>
        </div>
    );
};
