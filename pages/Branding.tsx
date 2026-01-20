import React, { useEffect } from 'react';
import { Palette, Diamond, Layout, PenTool, CheckCircle2, ArrowRight, Eye, Star } from 'lucide-react';
import { NeonCarousel } from '../components/ui/NeonCarousel';

export const Branding: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const brandingFeatures = [
        {
            icon: <Star className="text-organic-cyan" />,
            title: "Símbolos Vivos",
            description: "Não criamos apenas logos. Criamos identidades que contam histórias e emocionam."
        },
        {
            icon: <Layout className="text-organic-cyan" />,
            title: "Sistemas Visuais",
            description: "Identidades flexíveis que funcionam do mobile ao outdoor com consistência total."
        },
        {
            icon: <PenTool className="text-organic-cyan" />,
            title: "Posicionamento",
            description: "Design que comunica profissionalismo, autoridade e a alma do seu negócio."
        }
    ];

    return (
        <div className="pt-24">
            {/* Hero Section */}
            <section className="py-20 px-6 lg:px-24">
                <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight uppercase">
                            Identidade visual com <span className="text-organic-cyan">alma</span>
                        </h1>
                        <p className="text-lg text-organic-white/70 mb-10 max-w-xl font-sans">
                            Transformamos identidade em estratégia e estética em conversão. Criamos marcas que conversam, não que apenas aparecem.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-organic-cyan text-organic-black font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center space-x-2">
                                <span className="font-display text-lg uppercase">Criar minha marca</span>
                            </button>
                            <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors flex items-center justify-center space-x-2">
                                <span className="font-display text-lg uppercase tracking-wider">Ver Portfólio</span>
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

            {/* Branding Excellence */}
            <section className="py-24 bg-organic-gray/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {brandingFeatures.map((feature, idx) => (
                            <div key={idx} className="text-center group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-organic-cyan/10 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-organic-white/60 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Double Column Section */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-organic-cyan/20 blur-3xl rounded-full opacity-30"></div>
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
                                <Palette size={120} className="text-organic-white/20" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-display font-bold mb-8">Design que gera valor de verdade</h2>
                            <p className="text-organic-white/70 mb-8 text-lg">
                                Design bonito é só metade do caminho. A outra metade é o que ele comunica e como ele posiciona sua empresa no mercado.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { t: "Naming e Logomarca", d: "Criação de nomes e símbolos que ficam na memória." },
                                    { t: "Manual da Marca", d: "Regras claras para manter sua identidade sempre impecável." },
                                    { t: "Papelaria e Social Kit", d: "Tudo o que você precisa para começar a rodar amanhã." }
                                ].map((item, i) => (
                                    <div key={i} className="flex space-x-4">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-organic-cyan/20 flex items-center justify-center mt-1">
                                            <div className="w-2 h-2 rounded-full bg-organic-cyan"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{item.t}</h4>
                                            <p className="text-organic-white/50 text-sm">{item.d}</p>
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
