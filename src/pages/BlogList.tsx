import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts, getCategories, type BlogPost, type BlogCategory } from '../services/blogService';
import {
    ArrowRight, Calendar, Tag, ChevronLeft,
    ChevronRight, Search, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 9;

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [{ posts: postsData, total }, categoriesData] = await Promise.all([
                getPublishedPosts(page, postsPerPage),
                getCategories()
            ]);
            setPosts(postsData);
            setTotalPosts(total);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return (
        <div className="pt-48 pb-20 px-6 relative">
            {/* Header Section */}
            <section className="max-w-7xl mx-auto mb-20 text-center relative z-10 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-organic-cyan font-display text-sm tracking-[0.2em] uppercase font-bold mb-4 block">
                        Nossa Visão & Expertise
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-organic-white uppercase tracking-tighter mb-6">
                        Insights da <span className="text-organic-cyan">Organic</span>
                    </h1>
                    <p className="text-organic-white/60 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
                        Estratégias de Branding, Web Design e Inteligência Artificial para elevar o posicionamento da sua marca.
                    </p>
                </motion.div>
            </section>

            {/* Featured Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(71,228,190,0.15)_0%,rgba(0,0,0,0)_70%)]" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
                {/* Main Feed */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="animate-spin text-organic-cyan" size={40} />
                            <p className="text-organic-white/40 font-display uppercase tracking-widest text-sm">Carregando conteúdos...</p>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-40 bg-white/5 border border-dashed border-white/10 rounded-[40px]">
                            <p className="text-organic-white/40 font-sans">Ainda não temos posts publicados.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {posts.map((post, idx) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx % 2 * 0.1 }}
                                    className="bg-organic-gray/20 border border-white/5 rounded-[40px] overflow-hidden group hover:border-organic-cyan/30 transition-all duration-500 flex flex-col"
                                >
                                    {/* Card Image */}
                                    <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden relative">
                                        {post.cover_image ? (
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-organic-cyan/5 flex items-center justify-center">
                                                <Tag className="text-organic-cyan/20" size={60} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-organic-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </Link>

                                    {/* Card Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest font-bold">
                                            <span className="text-organic-cyan">{post.category?.name || 'Artigo'}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20" />
                                            <span className="text-organic-white/40">{new Date(post.published_at || '').toLocaleDateString('pt-BR')}</span>
                                        </div>

                                        <Link to={`/blog/${post.slug}`} className="block mb-4">
                                            <h2 className="text-2xl font-display font-bold text-organic-white leading-tight group-hover:text-organic-cyan transition-colors">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="text-organic-white/50 text-sm font-sans line-clamp-3 mb-8 flex-1 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-organic-white font-display text-xs uppercase tracking-widest font-bold group/link"
                                        >
                                            Ler Artigo
                                            <ArrowRight size={14} className="text-organic-cyan transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 py-8">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-organic-white hover:bg-white/10 disabled:opacity-30 transition-all"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="font-display text-sm tracking-widest text-organic-white/40">
                                PÁGINA <span className="text-organic-cyan font-bold">{page}</span> DE {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                className="p-3 rounded-2xl bg-white/5 border border-white/10 text-organic-white hover:bg-white/10 disabled:opacity-30 transition-all"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-80 space-y-12">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-organic-white/20 group-focus-within:text-organic-cyan transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="w-full bg-white/5 border border-white/10 rounded-full pl-14 pr-6 py-4 text-sm text-organic-white focus:outline-none focus:border-organic-cyan/50 transition-all"
                        />
                    </div>

                    {/* Categories */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[40px] p-8">
                        <h3 className="font-display text-xs uppercase tracking-[0.2em] font-bold text-organic-white/40 mb-8 pb-4 border-b border-white/5">
                            Categorias
                        </h3>
                        <div className="space-y-4">
                            {categories.map(cat => (
                                <Link
                                    key={cat.id}
                                    to={`/blog/categoria/${cat.slug}`}
                                    className="flex items-center justify-between text-sm font-sans text-organic-white/60 hover:text-organic-cyan transition-colors py-1 group"
                                >
                                    <span>{cat.name}</span>
                                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter / CTA */}
                    <div className="bg-organic-cyan border border-organic-cyan/20 rounded-[40px] p-8 text-organic-black relative overflow-hidden group">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        <h3 className="font-display text-2xl font-bold uppercase leading-tight mb-4 relative z-10">
                            Transforme sua marca
                        </h3>
                        <p className="text-sm font-semibold opacity-70 mb-8 relative z-10">
                            Receba insights exclusivos sobre estratégia e design.
                        </p>
                        <button className="w-full py-4 bg-organic-black text-organic-cyan font-bold rounded-full hover:scale-105 transition-all font-display uppercase text-xs tracking-widest relative z-10">
                            Assinar Newsletter
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};
