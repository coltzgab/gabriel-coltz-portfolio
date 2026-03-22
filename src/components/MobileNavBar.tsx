import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItem {
    name: string;
    url: string;
    icon: any;
    children?: NavItem[];
}

interface MobileNavBarProps {
    items: NavItem[];
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const location = useLocation();

    // Fechar menu quando mudar de página
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Bloquear scroll do body quando menu aberto
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleExpand = (name: string) => {
        setExpandedItem(expandedItem === name ? null : name);
    };

    return (
        <div className="md:hidden">
            {/* Header Flutuante (Capsule style) */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] h-16 bg-black/40 border border-white/10 backdrop-blur-xl rounded-full z-[100] flex items-center justify-between px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <img
                        src="/logo.png"
                        alt="Organic"
                        className="h-4 w-auto object-contain hover:scale-105 transition-transform"
                    />
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 hover:bg-white/10"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Overlay do Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
                        />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-organic-black border-l border-white/10 z-[101] shadow-2xl flex flex-col pt-24 px-6 pb-10"
                        >
                            <div className="flex-grow overflow-y-auto py-6 space-y-4 scrollbar-hide">
                                {items.map((item) => {
                                    const Icon = item.icon;
                                    const hasChildren = item.children && item.children.length > 0;
                                    const isActive = location.pathname === item.url || (item.children?.some(c => c.url === location.pathname));

                                    return (
                                        <div key={item.name} className="space-y-2">
                                            {hasChildren ? (
                                                <button
                                                    onClick={() => toggleExpand(item.name)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                                                        isActive ? "bg-organic-cyan/10 text-organic-cyan" : "text-white/60 hover:bg-white/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Icon size={18} />
                                                        <span className="font-display text-lg font-bold tracking-wider uppercase">{item.name}</span>
                                                    </div>
                                                    <ChevronDown
                                                        size={18}
                                                        className={cn("transition-transform duration-300", expandedItem === item.name && "rotate-180")}
                                                    />
                                                </button>
                                            ) : (
                                                <Link
                                                    to={item.url}
                                                    className={cn(
                                                        "flex items-center gap-3 p-4 rounded-2xl transition-all duration-300",
                                                        isActive ? "bg-organic-cyan/10 text-organic-cyan shadow-[inset_0_0_15px_rgba(71,228,190,0.05)]" : "text-white/60 hover:bg-white/5"
                                                    )}
                                                >
                                                    <Icon size={18} />
                                                    <span className="font-display text-lg font-bold tracking-wider uppercase">{item.name}</span>
                                                </Link>
                                            )}

                                            {/* Submenu */}
                                            <AnimatePresence>
                                                {hasChildren && expandedItem === item.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden pl-6 space-y-1"
                                                    >
                                                        {item.children!.map((child) => {
                                                            const ChildIcon = child.icon;
                                                            const isChildActive = location.pathname === child.url;
                                                            return (
                                                                <Link
                                                                    key={child.name}
                                                                    to={child.url}
                                                                    className={cn(
                                                                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                                                                        isChildActive ? "text-organic-cyan" : "text-white/40 hover:text-white"
                                                                    )}
                                                                >
                                                                    <ChildIcon size={16} />
                                                                    <span className="font-sans text-sm font-semibold uppercase tracking-widest">{child.name}</span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Rodapé do Menu */}
                            <div className="mt-auto pt-6 border-t border-white/5 space-y-6">
                                <div className="flex justify-around">
                                    <div className="text-center">
                                        <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Acompanhe</p>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60">IG</div>
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60">LK</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        document.getElementById('ai-audit')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="w-full py-4 bg-gradient-to-r from-organic-cyan to-teal-400 text-black font-bold uppercase tracking-widest rounded-2xl shadow-lg shadow-organic-cyan/20 active:scale-95 transition-all text-sm"
                                >
                                    Diagnóstico Grátis
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
