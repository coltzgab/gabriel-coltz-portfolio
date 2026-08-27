import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Flame, Hand, Star, ArrowRight, MessageCircle, Gem, Users, Award, ShieldCheck, Coffee, CheckCircle } from 'lucide-react';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const Relaxante: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const benefits = [
        {
            icon: <Hand className="text-organic-cyan" />,
            title: "Massagem Relaxante Terapeutica",
            description: "Tecnicas que reduzem tensoes musculares com eficiencia, proporcionando relaxamento profundo sem causar dor."
        },
        {
            icon: <Flame className="text-organic-cyan" />,
            title: "Pedras Quentes Estrategicas",
            description: "Aprenda a usar o calor para acessar musculaturas profundas com conforto e precisao, potencializando cada manobra."
        },
        {
            icon: <Sparkles className="text-organic-cyan" />,
            title: "Ritual Thai Spa Completo",
            description: "Da recepcao sensorial com cha ao spa dos pes e finalizacao, um protocolo que transforma cada atendimento em experiencia."
        },
        {
            icon: <Gem className="text-organic-cyan" />,
            title: "Posicionamento Premium",
            description: "Crie um ambiente de spa mesmo em espaco simples. Posicione-se como profissional diferenciada e cobre mais pelo seu trabalho."
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Recepcao Sensorial",
            description: "Cha de boas-vindas e ambiente preparado para encantar o cliente desde o primeiro segundo."
        },
        {
            step: "02",
            title: "Spa dos Pes",
            description: "Ritual de imersao que ativa o relaxamento antes mesmo da massagem comecar."
        },
        {
            step: "03",
            title: "Massagem + Pedras Quentes",
            description: "Protocolo completo com tecnicas relaxantes e aplicacao estrategica das pedras quentes."
        },
        {
            step: "04",
            title: "Finalizacao Thai",
            description: "Encerramento cuidadoso que deixa o cliente com vontade de voltar e indicar."
        }
    ];

    const forWho = [
        { text: "Iniciantes que querem comecar da forma certa", icon: Star },
        { text: "Massoterapeutas que querem se destacar no mercado", icon: Award },
        { text: "Profissionais que desejam aumentar o ticket dos atendimentos", icon: Gem },
        { text: "Quem quer oferecer uma experiencia premium sem complicacao", icon: Sparkles }
    ];

    const includes = [
        "Aulas completas e passo a passo em video",
        "Protocolo estruturado de atendimento do inicio ao fim",
        "Tecnicas detalhadas de massagem relaxante",
        "Aplicacao correta e segura das pedras quentes",
        "Ritual Thai Spa completo (recepcao + spa dos pes + finalizacao)",
        "Acesso imediato e vitalicio"
    ];

    return (
        <div className="pt-24 font-sans text-organic-white">
            {/* Hero Section */}
            <section className="pt-10 lg:pt-16 pb-0 px-6 lg:px-24 relative overflow-hidden h-[700px] lg:h-[700px] flex items-center justify-center">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 h-full max-w-7xl">
                    <div className="max-w-2xl flex-1 shrink-0 py-10 z-20 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-center lg:items-start"
                        >
                            <span className="text-organic-cyan font-display text-xl tracking-widest uppercase mb-4 block underline decoration-organic-purple decoration-4 underline-offset-8">Curso Online</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                                Transforme seu toque em uma <span className="text-organic-cyan italic">experiencia de alto valor</span>
                            </h1>
                            <p className="text-lg text-organic-white/70 mb-4 max-w-xl font-sans font-medium mx-auto lg:mx-0">
                                Massagem Relaxante + Pedras Quentes com Protocolo Thai Spa
                            </p>
                            <p className="text-base text-organic-white/50 mb-10 max-w-xl font-sans mx-auto lg:mx-0">
                                Um metodo completo que vai alem da massagem: um atendimento sensorial, terapeutico e memoravel capaz de fidelizar clientes e aumentar seu faturamento.
                            </p>
                            <a
                                href="https://wa.me/5551992592021?text=Olá! Quero saber mais sobre o curso de Massagem Relaxante com Pedras Quentes."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full items-center space-x-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
                            >
                                <span className="font-display text-lg uppercase">Garantir Minha Vaga</span>
                                <ArrowRight size={20} />
                            </a>
                        </motion.div>
                    </div>

                    <div className="hidden lg:flex relative h-full w-full max-w-[420px] flex-1 items-end justify-center">
                        <div className="relative w-full mt-auto -mb-8">
                            <motion.img
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                src="/character-hero-no-bg.png"
                                alt="Massagem Relaxante com Pedras Quentes"
                                className="relative z-10 w-full h-auto object-contain object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <NeonCarousel
                items={[
                    { text: "MASSAGEM RELAXANTE", icon: Hand },
                    { text: "PEDRAS QUENTES", icon: Flame },
                    { text: "PROTOCOLO THAI SPA", icon: Sparkles },
                    { text: "SPA DOS PES", icon: Heart },
                    { text: "RECEPCAO SENSORIAL", icon: Coffee },
                    { text: "EXPERIENCIA PREMIUM", icon: Gem }
                ]}
            />

            {/* Pain / Opening Section */}
            <section className="py-24 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 uppercase leading-tight">
                            Hoje nao basta <span className="text-organic-cyan italic">aplicar tecnica</span>
                        </h2>
                        <div className="space-y-4 text-lg text-organic-white/70 font-sans max-w-2xl mx-auto">
                            <p>Se voce ja trabalha com massagem ou quer comecar na area, sabe que o cliente mudou.</p>
                            <p>Ele nao busca apenas um servico. Ele busca <strong className="text-organic-white">experiencia</strong>. Busca <strong className="text-organic-white">cuidado</strong>. Busca algo que faca ele <strong className="text-organic-cyan">voltar</strong>.</p>
                            <p className="text-organic-white/50 text-base mt-6">E e exatamente isso que separa profissionais comuns de profissionais disputados.</p>
                        </div>
                    </motion.div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* Benefits / Features Cards */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase leading-none">
                            O que voce vai <span className="text-organic-cyan italic">dominar</span>
                        </h2>
                        <p className="text-organic-white/60 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold font-sans">
                            Um protocolo completo que cria uma jornada memoravel para o cliente
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((b, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 border border-white/5 rounded-[60px] bg-organic-gray/20 hover:border-organic-cyan/30 transition-all group relative overflow-hidden text-center"
                            >
                                <div className="mb-6 mx-auto p-4 bg-white/5 w-fit rounded-full">
                                    {React.cloneElement(b.icon as React.ReactElement<any>, { size: 32 } as any)}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tight">{b.title}</h3>
                                <p className="text-organic-white/60 text-sm leading-relaxed font-sans font-medium">
                                    {b.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Methodology / Ritual Steps */}
            <section className="py-24 bg-organic-gray/30 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase leading-none">
                            A Jornada do <span className="text-organic-cyan italic">Atendimento</span>
                        </h2>
                        <p className="text-organic-white/60 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold font-sans">
                            Do primeiro contato ate o pos-atendimento
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
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

            {/* For Who Section */}
            <section className="py-24 relative">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase leading-none">
                            Para quem e esse <span className="text-organic-cyan italic">curso?</span>
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {forWho.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-5 p-6 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl hover:border-organic-cyan/30 transition-all"
                            >
                                <div className="p-3 bg-organic-cyan/10 rounded-full shrink-0">
                                    <item.icon className="text-organic-cyan" size={24} />
                                </div>
                                <p className="text-organic-white/80 font-sans font-medium">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </section>

            {/* Objection Breaker */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ShieldCheck className="text-organic-cyan mx-auto mb-6" size={48} />
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 uppercase leading-tight">
                            Voce <span className="text-organic-cyan italic">nao precisa</span> ter experiencia avancada
                        </h2>
                        <p className="text-lg text-organic-white/70 font-sans max-w-2xl mx-auto">
                            O curso foi gravado de forma didatica, com explicacoes claras e demonstracoes completas para voce aprender com seguranca e confianca. Cada movimento e explicado em detalhes.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* What You Get */}
            <section className="py-24 bg-organic-gray/30 relative">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-4 uppercase leading-none">
                            O que voce <span className="text-organic-cyan italic">recebe</span>
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {includes.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-organic-cyan/20 transition-all"
                            >
                                <CheckCircle className="text-organic-cyan shrink-0" size={24} />
                                <span className="text-organic-white/80 font-sans font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation + CTA */}
            <section className="py-32 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="relative p-12 md:p-24 rounded-[60px] overflow-hidden bg-gradient-to-br from-organic-black via-organic-gray/50 to-organic-purple/20 border border-white/10 text-center">
                        <div className="absolute inset-0 bg-organic-cyan/5 opacity-5 pointer-events-none" />

                        <div className="relative z-10">
                            <Star className="text-organic-cyan mx-auto mb-8 animate-pulse" size={48} />
                            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 uppercase leading-none">
                                Nao seja apenas alguem que faz <span className="text-organic-cyan italic">massagem</span>
                            </h2>
                            <p className="text-xl text-organic-white/70 mb-12 max-w-2xl mx-auto font-sans">
                                Seja a profissional que entrega uma experiencia que o cliente lembra, indica e volta. Comece agora a transformar seu atendimento em algo premium.
                            </p>
                            <a
                                href="https://wa.me/5551992592021?text=Olá! Quero garantir minha vaga no curso de Massagem Relaxante com Pedras Quentes."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex px-12 py-5 bg-white text-organic-black font-bold rounded-full items-center space-x-3 hover:scale-110 transition-transform font-display text-2xl uppercase tracking-tighter"
                            >
                                <MessageCircle size={28} />
                                <span>Garantir Minha Vaga</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
