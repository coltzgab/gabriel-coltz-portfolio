import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Globe, Users, Palette, Rocket, FileText, ChevronRight } from 'lucide-react';

export const Bio: React.FC = () => {
    const links = [
        {
            title: "Falar no WhatsApp",
            subtitle: "Atendimento direto e personalizado",
            url: "https://wa.me/5551981240660", // Replace with actual number if different
            icon: <MessageSquare className="w-6 h-6" />,
            color: "from-green-400 to-emerald-600",
            image: "/astronaut-working.png" // Placeholder, will use actual assets if found
        },
        {
            title: "Web Design",
            subtitle: "Sites que convertem e encantam",
            url: "/web-design",
            icon: <Globe className="w-6 h-6" />,
            color: "from-organic-cyan to-blue-500",
            image: "/character-hero-no-bg.png"
        },
        {
            title: "Social Media",
            subtitle: "Gestão estratégica de redes",
            url: "/social-media",
            icon: <Users className="w-6 h-6" />,
            color: "from-purple-500 to-indigo-600",
            image: "/character-hero-no-bg.png" // Using available assets
        },
        {
            title: "Branding",
            subtitle: "Identidade visual de impacto",
            url: "/branding",
            icon: <Palette className="w-6 h-6" />,
            color: "from-pink-500 to-rose-600",
            image: "/character-hero-no-bg.png"
        },
        {
            title: "Coprodução",
            subtitle: "Lançamentos e infoprodutos",
            url: "/coproduction",
            icon: <Rocket className="w-6 h-6" />,
            color: "from-orange-500 to-red-600",
            image: "/character-hero-no-bg.png"
        },
        {
            title: "Nosso Blog",
            subtitle: "Dicas de marketing e tendências 2026",
            url: "/blog",
            icon: <FileText className="w-6 h-6" />,
            color: "from-gray-700 to-gray-900",
            image: "/character-hero-no-bg.png"
        }
    ];

    return (
        <div className="min-h-screen bg-organic-black text-organic-white font-sans selection:bg-organic-cyan selection:text-organic-black overflow-x-hidden">
            {/* Background Decoration */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-organic-cyan/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
                {/* Header */}
                <header className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative inline-block mb-6"
                    >
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-organic-cyan to-purple-500">
                            <div className="w-full h-full rounded-full bg-organic-black overflow-hidden flex items-center justify-center border-4 border-organic-black">
                                <img src="/logo.png" alt="Organic" className="w-16 h-auto" />
                            </div>
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-display font-bold uppercase tracking-widest mb-2"
                    >
                        Organic Assessoria
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-organic-white/60 font-medium"
                    >
                        Marketing Digital de Alto Impacto
                    </motion.p>
                </header>

                {/* Links */}
                <nav className="space-y-6">
                    {links.map((link, index) => (
                        <motion.a
                            key={link.title}
                            href={link.url}
                            target={link.url.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group block relative"
                        >
                            <div className="relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-[2rem] p-6 flex items-center justify-between backdrop-blur-md">
                                <div className="flex items-center gap-6 relative z-10">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg`}>
                                        {link.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-bold uppercase tracking-tight">{link.title}</h3>
                                        <p className="text-sm text-organic-white/50 font-medium">{link.subtitle}</p>
                                    </div>
                                </div>

                                <div className="flex items-center relative z-10">
                                    <ChevronRight className="w-5 h-5 text-organic-white/30 group-hover:text-organic-cyan transition-colors group-hover:translate-x-1" />
                                </div>

                                {/* Floating Illustration (Side of the block) */}
                                <div className="absolute right-[-10px] bottom-[-20px] w-32 opacity-20 filter grayscale blur-[1px] group-hover:opacity-40 group-hover:filter-none group-hover:blur-0 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                                    <img src={link.image} alt="" className="w-full h-auto object-contain" />
                                </div>

                                {/* Hover background shift */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`} />
                            </div>
                        </motion.a>
                    ))}
                </nav>

                {/* Social Icons Footer */}
                <footer className="mt-16 text-center">
                    <div className="flex justify-center gap-6 mb-8">
                        {['Instagram', 'Linkedin', 'Behance'].map((social) => (
                            <a key={social} href="#" className="text-organic-white/40 hover:text-organic-cyan transition-colors uppercase text-[10px] font-bold tracking-[0.2em]">
                                {social}
                            </a>
                        ))}
                    </div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
                        &copy; 2026 Organic Assessoria
                    </p>
                </footer>
            </div>
        </div>
    );
};
