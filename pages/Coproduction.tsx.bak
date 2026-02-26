import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, TrendingUp, BarChart3, ShieldCheck, ArrowRight, MessageCircle, Star } from 'lucide-react';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const Coproduction: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const features = [
        {
            icon: <Target className="text-organic-cyan" />,
            title: "Expertise em Lançamentos",
            description: "Dominamos as principais estratégias do mercado para escalar seu conhecimento e transformá-lo em lucro."
        },
        {
            icon: <Users className="text-organic-cyan" />,
            title: "Tráfego Orgânico & Pago",
            description: "Unimos nossa especialidade em orgânico com gestão de tráfego de alta performance."
        },
        {
            icon: <TrendingUp className="text-organic-cyan" />,
            title: "Escalabilidade Real",
            description: "Criamos funis de vendas preparados para suportar o crescimento do seu produto digital."
        },
        {
            icon: <ShieldCheck className="text-organic-cyan" />,
            title: "Parceria de Resultado",
            description: "Não somos apenas prestadores de serviço, somos sócios do seu sucesso. Ganhamos quando você ganha."
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Diagnóstico do Expert",
            description: "Analisamos sua audiência, autoridade e o potencial do seu infoproduto."
        },
        {
            step: "02",
            title: "Criação da Oferta",
            description: "Desenvolvemos uma oferta irresistível e o posicionamento único no mercado."
        },
        {
            step: "03",
            title: "Estruturação de Funil",
            description: "Website, checkout, automações e toda a parte técnica necessária para o lançamento."
        },
        {
            step: "04",
            title: "Execução e Escala",
            description: "Gestão do lançamento e otimização contínua para maximizar o ROI."
        }
    ];

    return (
        <div className="pt-24 font-sans text-organic-white">
            {/* Hero Section */}
            <section className="py-20 px-6 lg:px-24">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-organic-cyan font-display text-xl tracking-widest uppercase mb-4 block underline decoration-organic-purple decoration-4 underline-offset-8">Coprodução</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                                Você entra com o <span className="text-organic-cyan italic">Expertise</span>, nós com a <span className="text-organic-cyan italic">Estratégia</span>
                            </h1>
                            <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans font-medium">
                                Transformamos o seu conhecimento em um negócio digital lucrativo e escalável.
                                Na Organic, cuidamos de toda a estratégia e bastidores para você focar no que faz de melhor: ensinar.
                            </p>
                            <a
                                href="https://wa.me/5551993909150?text=Olá! Tenho interesse na coprodução da Organic para o meu projeto."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full items-center space-x-2 hover:scale-105 transition-transform"
                            >
                                <span className="font-display text-lg uppercase">Quero ser um Expert</span>
                                <ArrowRight size={20} />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            <NeonCarousel
                items={[
                    { text: "LANÇAMENTOS DIGITAIS", icon: Rocket },
                    { text: "INFOPRODUTOS", icon: Target },
                    { text: "ESTRATÉGIA DE VENDAS", icon: TrendingUp },
                    { text: "FUNIS DE CONVERSÃO", icon: BarChart3 },
                    { text: "GESTÃO DE TRÁFEGO", icon: Users },
                    { text: "PARCERIA DE RESULTADO", icon: ShieldCheck }
                ]}
            />

            {/* Stats/Highlight Section */}
            <section className="py-12 bg-organic-cyan/5 border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between items-center gap-8">
                        <div className="flex items-center space-x-4">
                            <span className="text-5xl font-display font-bold text-organic-cyan">+5</span>
                            <span className="text-sm uppercase tracking-widest font-bold text-white/60">Anos de<br />Experiência</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-5xl font-display font-bold text-organic-cyan">+100</span>
                            <span className="text-sm uppercase tracking-widest font-bold text-white/60">Estratégias<br />Validadas</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-5xl font-display font-bold text-organic-cyan">Focus</span>
                            <span className="text-sm uppercase tracking-widest font-bold text-white/60">Tráfego<br />Orgânico</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-5xl font-display font-bold text-organic-cyan">Scale</span>
                            <span className="text-sm uppercase tracking-widest font-bold text-white/60">Lançamentos<br />Digitais</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 border border-white/5 rounded-[40px] bg-organic-gray/20 hover:border-organic-cyan/30 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(feature.icon as React.ReactElement, { size: 100 })}
                                </div>
                                <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl">
                                    {React.cloneElement(feature.icon as React.ReactElement, { size: 32 })}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-organic-white/60 text-sm leading-relaxed font-sans font-medium">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology / Process */}
            <section className="py-24 bg-organic-gray/30 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase leading-none">
                            Nosso Caminho para o <span className="text-organic-cyan italic">RREU</span>
                        </h2>
                        <p className="text-organic-white/60 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold font-sans">
                            Resultados Reais de Especialistas Únicos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10" />

                        {methodology.map((m, idx) => (
                            <div key={idx} className="relative group text-center">
                                <div className="w-20 h-20 bg-organic-black border-4 border-organic-cyan/20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:border-organic-cyan transition-colors shadow-2xl">
                                    <span className="font-display text-3xl font-bold">{m.step}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 uppercase">{m.title}</h3>
                                <p className="text-organic-white/60 text-sm font-sans">{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="relative p-12 md:p-24 rounded-[60px] overflow-hidden bg-gradient-to-br from-organic-black via-organic-gray/50 to-organic-purple/20 border border-white/10 text-center">
                        <div className="absolute inset-0 bg-organic-cyan/5 opacity-5 pointer-events-none" />

                        <div className="relative z-10">
                            <Star className="text-organic-cyan mx-auto mb-8 animate-pulse" size={48} />
                            <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 uppercase leading-none">
                                Pronto para ser o próximo <span className="text-organic-cyan italic">Sucesso?</span>
                            </h2>
                            <p className="text-xl text-organic-white/70 mb-12 max-w-2xl mx-auto font-sans">
                                Se você tem o conhecimento e a audiência, nós temos o motor para fazer você voar. Vamos conversar sobre como levar seu projeto ao próximo nível.
                            </p>
                            <a
                                href="https://wa.me/5551993909150?text=Olá! Quero falar sobre coprodução."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex px-12 py-5 bg-white text-organic-black font-bold rounded-full items-center space-x-3 hover:scale-110 transition-transform font-display text-2xl uppercase tracking-tighter"
                            >
                                <MessageCircle size={28} />
                                <span>Me Chamar no WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
