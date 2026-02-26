import React, { useEffect, useState } from 'react';
import { Target, Heart, Zap, Users, ArrowRight, MessageCircle, CheckCircle2, History, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const SocialMedia: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        instagram: '',
        objective: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Olá! Gostaria de um orçamento para Social Media.%0A%0A*Nome:* ${formData.name}%0A*Empresa:* ${formData.company}%0A*Instagram/Site:* ${formData.instagram}%0A*Objetivo:* ${formData.objective}`;
        window.open(`https://wa.me/5551993909150?text=${message}`, '_blank');
    };

    const steps = [
        {
            icon: <History className="text-organic-cyan" />,
            title: "5 Anos de Experiência",
            description: "Meia década aprimorando estratégias que realmente geram tração orgânica e autoridade."
        },
        {
            icon: <Target className="text-organic-cyan" />,
            title: "Estratégia First",
            description: "Não começamos postando. Começamos diagnosticando seu mercado para criar um plano de guerra."
        },
        {
            icon: <TrendingUp className="text-organic-cyan" />,
            title: "Foco em Orgânico",
            description: "Nossa especialidade é fazer sua marca crescer sem depender apenas de anúncios pagos."
        },
        {
            icon: <Users className="text-organic-cyan" />,
            title: "Gestão com Propósito",
            description: "A execução só acontece após a estratégia estar consolidada e alinhada ao seu objetivo."
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
                            <span className="text-organic-cyan font-display text-xl tracking-widest uppercase mb-4 block">Especialistas em Tráfego Orgânico</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                                Sua marca <span className="text-organic-cyan italic">viva</span> nas redes sociais
                            </h1>
                            <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans">
                                Criamos estratégias de conteúdo há mais de 5 anos. Na Organic, a gestão só começa depois que a estratégia está desenhada para vencer.
                            </p>
                            <button
                                onClick={() => document.getElementById('budget-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full flex items-center space-x-2 hover:scale-105 transition-transform"
                            >
                                <span className="font-display text-lg uppercase">Solicitar Orçamento</span>
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <NeonCarousel
                items={[
                    { text: "GESTÃO DE CONTEÚDO", icon: Zap },
                    { text: "ESTRATÉGIA ORGÂNICA", icon: Users },
                    { text: "TRAÇÃO E AUTORIDADE", icon: Target },
                    { text: "ENGAJAMENTO REAL", icon: Heart },
                    { text: "PLANOS DE GUERRA", icon: Sparkles },
                    { text: "MÉTRICAS QUE IMPORTAM", icon: TrendingUp }
                ]}
            />

            {/* Authority Section */}
            <section className="py-24 bg-organic-gray/30 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 border border-white/5 rounded-[60px] bg-organic-black/40 hover:border-organic-cyan/30 transition-all group text-center"
                            >
                                <div className="mb-6 mx-auto p-3 bg-white/5 w-fit rounded-full group-hover:scale-110 transition-transform">
                                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 } as any)}
                                </div>
                                <h3 className="text-2xl font-display font-bold mb-3 uppercase tracking-tight">{step.title}</h3>
                                <p className="text-organic-white/60 text-sm leading-relaxed font-sans">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-organic-purple/20 to-organic-cyan/10 p-12 md:p-20 rounded-[60px] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
                            <Sparkles size={200} className="text-organic-cyan" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-5xl font-display font-bold mb-8 uppercase leading-none">
                                    Por que não temos <span className="text-organic-cyan italic">planos definidos?</span>
                                </h2>
                                <p className="text-lg text-organic-white/80 mb-6 font-sans">
                                    Acreditamos que cada negócio é um organismo único. Uma academia tem necessidades diferentes de uma clínica ou de um e-commerce.
                                </p>
                                <p className="text-lg text-organic-white/80 mb-8 font-sans font-bold">
                                    Trabalhamos com base no seu objetivo e no seu orçamento disponível.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Diagnóstico profundo de marca",
                                        "Planejamento estratégico exclusivo",
                                        "Linha editorial baseada em dados",
                                        "Execução focada em autoridade orgânica"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3">
                                            <CheckCircle2 size={20} className="text-organic-cyan" />
                                            <span className="font-display text-xl uppercase tracking-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-organic-black/60 backdrop-blur-md p-8 rounded-[60px] border border-white/10" id="budget-form">
                                <h3 className="text-3xl font-display font-bold mb-6 text-center uppercase tracking-tight">Conte seu objetivo</h3>
                                <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1">Seu Nome</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 outline-none focus:border-organic-cyan transition-colors font-sans"
                                            placeholder="Ex: Gabriel Freitas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1">Sua Empresa</label>
                                        <input
                                            required
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 outline-none focus:border-organic-cyan transition-colors font-sans"
                                            placeholder="Ex: Minha Loja Ltda"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1">Instagram ou Site Atual</label>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={formData.instagram}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 outline-none focus:border-organic-cyan transition-colors font-sans"
                                            placeholder="Ex: @minhamarca"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1">Qual seu principal objetivo?</label>
                                        <select
                                            required
                                            name="objective"
                                            value={formData.objective}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/10 border border-white/10 rounded-full px-4 py-3 outline-none focus:border-organic-cyan transition-colors font-sans appearance-none"
                                        >
                                            <option value="" disabled className="bg-organic-black">Selecione...</option>
                                            <option value="Aumentar Vendas" className="bg-organic-black">Aumentar Vendas</option>
                                            <option value="Autoridade de Marca" className="bg-organic-black">Autoridade de Marca</option>
                                            <option value="Engajamento com Público" className="bg-organic-black">Engajamento com Público</option>
                                            <option value="Lançamento de Produto" className="bg-organic-black">Lançamento de Produto</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-organic-cyan text-organic-black font-bold rounded-full flex items-center justify-center space-x-2 hover:bg-white transition-all transform hover:-translate-y-1"
                                    >
                                        <MessageCircle size={20} />
                                        <span className="font-display text-xl uppercase">Enviar via WhatsApp</span>
                                    </button>
                                    <p className="text-[10px] text-center text-white/30 uppercase tracking-tighter">Retornamos em até 24 horas úteis</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
