import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, type BlogPost } from '../services/blogService';
import {
    Calendar, Tag, ArrowLeft, Share2,
    Clock, Facebook, Twitter, Link as LinkIcon, Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const BlogPostPage: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchPost(slug);
        }
    }, [slug]);

    const fetchPost = async (postSlug: string) => {
        setIsLoading(true);
        try {
            const data = await getPostBySlug(postSlug);
            setPost(data);

            // Basic SEO update
            document.title = `${data.seo_title || data.title} | Organic Assessoria`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', data.seo_description || data.excerpt);

        } catch (error) {
            console.error('Error fetching post:', error);
            navigate('/blog');
        } finally {
            setIsLoading(false);
        }
    };

    const sharePost = () => {
        if (navigator.share) {
            navigator.share({
                title: post?.title,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4 bg-organic-black">
                <Loader2 className="animate-spin text-organic-cyan" size={40} />
                <p className="text-organic-white/40 font-display uppercase tracking-widest text-sm">Preparando conteúdo...</p>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="pt-48 pb-20 px-6 bg-organic-black relative">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(71,228,190,0.15)_0%,rgba(0,0,0,0)_70%)]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Navigation / Back */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-organic-white/40 hover:text-organic-cyan transition-colors group text-sm uppercase tracking-widest font-bold font-display"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Voltar ao Blog
                    </Link>
                </motion.div>

                {/* Article Header */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6 text-[10px] uppercase tracking-widest font-bold">
                            <span className="text-organic-cyan">{post.category?.name || 'Artigo'}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-organic-white/40">{new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-display font-bold text-organic-white uppercase leading-tight tracking-tighter mb-8">
                            {post.title}
                        </h1>

                        <p className="text-xl text-organic-white/60 font-sans leading-relaxed mb-10 border-l-2 border-organic-cyan/30 pl-6 italic">
                            {post.excerpt}
                        </p>

                        {/* Post Meta Info */}
                        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-organic-cyan/10 flex items-center justify-center text-organic-cyan font-display font-bold text-xs border border-organic-cyan/20">
                                    O
                                </div>
                                <div>
                                    <p className="text-[10px] text-organic-white/40 uppercase tracking-widest font-bold">Escrito por</p>
                                    <p className="text-sm text-organic-white font-medium">Organic Equipe</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-organic-white/20">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-organic-white/40 uppercase tracking-widest font-bold">Leitura</p>
                                    <p className="text-sm text-organic-white font-medium">5 min aprox.</p>
                                </div>
                            </div>

                            <button
                                onClick={sharePost}
                                className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-organic-cyan/10 text-organic-white/60 hover:text-organic-cyan transition-all border border-white/5 text-xs font-bold uppercase tracking-widest"
                            >
                                <Share2 size={14} />
                                Compartilhar
                            </button>
                        </div>
                    </motion.div>
                </header>

                {/* Cover Image */}
                {post.cover_image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 aspect-[21/9] rounded-[40px] overflow-hidden border border-white/5"
                    >
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                )}

                {/* Article Body */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert prose-organic max-w-none"
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
                        className="font-sans text-lg text-organic-white/80 leading-[1.8] post-content"
                    />
                </motion.div>

                {/* Tags / Keywords */}
                {post.seo_keywords && post.seo_keywords.length > 0 && (
                    <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-3">
                        {post.seo_keywords.map(tag => (
                            <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 text-xs text-organic-white/40 font-medium hover:bg-white/10 transition-colors">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="mt-20 p-12 bg-organic-gray/20 border border-white/5 rounded-[50px] text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-organic-cyan/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150" />
                    <h3 className="font-display text-3xl font-bold text-organic-white uppercase mb-6 relative z-10">
                        Pronto para elevar sua <span className="text-organic-cyan">Marca</span>?
                    </h3>
                    <p className="text-organic-white/50 mb-10 max-w-lg mx-auto relative z-10">
                        Não deixe sua expertise passar despercebida. Vamos criar uma presença digital tão poderosa quanto sua voz.
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="px-10 py-5 bg-organic-cyan text-organic-black font-bold rounded-full hover:scale-105 transition-all font-display uppercase text-sm tracking-widest relative z-10 shadow-[0_0_40px_rgba(71,228,190,0.2)]"
                    >
                        Falar com Consultor
                    </button>
                </div>
            </div>
        </div>
    );
};
