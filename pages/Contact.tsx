import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Phone, Instagram, Send, ArrowRight } from 'lucide-react';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const Contact: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Olá! Meu nome é ${formData.name}. Gostaria de falar sobre ${formData.service}.%0A%0A*Mensagem:* ${formData.message}%0A%0A*E-mail:* ${formData.email}`;
        window.open(`https://wa.me/5551993909150?text=${text}`, '_blank');
    };

    const contactInfo = [
        {
            icon: <Phone className="text-organic-cyan" />,
            title: "Telefone / WhatsApp",
            value: "(51) 99390-9150",
            link: "https://wa.me/5551993909150"
        },
        {
            icon: <Mail className="text-organic-cyan" />,
            title: "E-mail",
            value: "contato@organic-mkt.com.br",
            link: "mailto:contato@organic-mkt.com.br"
        },
        {
            icon: <Instagram className="text-organic-cyan" />,
            title: "Instagram",
            value: "@organic_assessoria",
            link: "https://instagram.com/organic_assessoria"
        },
        {
            icon: <MapPin className="text-organic-cyan" />,
            title: "Onde Estamos",
            value: "Atendimento Nacional • Base em RS",
            link: "#"
        }
    ];

    return (
        <div className="pt-24 font-sans text-organic-white min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-6 lg:px-24">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-organic-cyan font-display text-xl tracking-widest uppercase mb-4 block underline decoration-organic-purple decoration-4 underline-offset-8">Vamos Conversar?</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                                Tire sua ideia do <span className="text-organic-cyan italic">papel</span>
                            </h1>
                            <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans">
                                Seja para um projeto de Web Design, Social Media ou Branding, nossa equipe está pronta para transformar seu negócio.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="pb-24 px-6">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">

                        {/* Info Column */}
                        <div className="space-y-12">
                            <div className="grid sm:grid-cols-2 gap-8">
                                {contactInfo.map((info, idx) => (
                                    <motion.a
                                        href={info.link}
                                        target={info.link !== "#" ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-8 border border-white/5 rounded-3xl bg-white/5 hover:border-organic-cyan/30 transition-all group"
                                    >
                                        <div className="mb-4 p-3 bg-white/5 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                                            {React.cloneElement(info.icon as React.ReactElement, { size: 24 })}
                                        </div>
                                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">{info.title}</h3>
                                        <p className="font-display text-2xl group-hover:text-organic-cyan transition-colors">{info.value}</p>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="p-10 rounded-[40px] bg-gradient-to-br from-organic-purple/30 to-transparent border border-white/5">
                                <h3 className="text-3xl font-display font-bold mb-4 uppercase">Horário de Atendimento</h3>
                                <p className="text-organic-white/60 mb-6 font-sans">
                                    Estamos disponíveis para transformar sua marca durante toda a semana útil.
                                </p>
                                <div className="space-y-2 font-display text-xl uppercase tracking-tight">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span>Segunda - Sexta</span>
                                        <span className="text-organic-cyan">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2 opacity-50">
                                        <span>Sábado</span>
                                        <span>Fechado</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-organic-black border border-white/10 p-8 md:p-12 rounded-[40px] shadow-2xl relative"
                        >
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-organic-cyan/10 blur-3xl rounded-full" />

                            <h2 className="text-4xl font-display font-bold mb-8 uppercase tracking-tight">Envie uma <span className="text-organic-cyan italic">Mensagem</span></h2>

                            <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1 font-bold">Nome Completo</label>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-organic-cyan transition-colors font-sans"
                                            placeholder="Ex: Gabriel"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1 font-bold">E-mail Corporativo</label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-organic-cyan transition-colors font-sans"
                                            placeholder="seu@contato.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1 font-bold">Assunto de interesse</label>
                                    <select
                                        required
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-organic-cyan transition-colors font-sans appearance-none"
                                    >
                                        <option value="" disabled className="bg-organic-black">Selecione o serviço...</option>
                                        <option value="Web Design" className="bg-organic-black">Web Design / Sites</option>
                                        <option value="Social Media" className="bg-organic-black">Social Media / Orgânico</option>
                                        <option value="Branding" className="bg-organic-black">Branding / Identidade</option>
                                        <option value="Outros" className="bg-organic-black">Outros Assuntos</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 ml-1 font-bold">Como podemos te ajudar?</label>
                                    <textarea
                                        required
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl px-5 py-4 outline-none focus:border-organic-cyan transition-colors font-sans resize-none"
                                        placeholder="Conte brevemente sobre seu projeto..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-organic-cyan text-organic-black font-bold rounded-3xl flex items-center justify-center space-x-3 hover:bg-white transition-all transform hover:-translate-y-1 group"
                                >
                                    <MessageCircle size={22} />
                                    <span className="font-display text-2xl uppercase tracking-tighter">Mandar para o WhatsApp</span>
                                </button>

                                <p className="text-[10px] text-center text-white/30 uppercase tracking-widest font-bold font-sans">Garantimos resposta rápida em horário comercial</p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <NeonCarousel
                items={[
                    { text: "WHATSAPP", icon: Phone },
                    { text: "EMAIL", icon: Mail },
                    { text: "INSTAGRAM", icon: Instagram },
                    { text: "FALE CONOSCO", icon: MessageCircle },
                    { text: "SUL DO BRASIL", icon: MapPin },
                    { text: "ATENDIMENTO NACIONAL", icon: Send }
                ]}
            />

            {/* Minimalist Map / Base Area Section */}
            <section className="py-24 bg-organic-gray/20 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="font-display text-4xl mb-6 uppercase tracking-tight">Atendimento sem <span className="text-organic-cyan italic">fronteiras</span></h2>
                    <p className="text-organic-white/60 max-w-2xl mx-auto font-sans">
                        Embora nossa base técnica esteja no Rio Grande do Sul, o digital nos permite atender empresas de todo o Brasil e do mundo com a mesma excelência.
                    </p>
                </div>
            </section>
        </div>
    );
};
