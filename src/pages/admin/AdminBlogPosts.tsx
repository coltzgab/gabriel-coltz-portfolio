import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost, type BlogPost } from '../../services/blogService';
import {
    Plus, Edit, Trash2, Search, Filter,
    ExternalLink, CheckCircle2, Circle, Loader2, Image as LucideImage
} from 'lucide-react';

const ImageIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
);

export const AdminBlogPosts: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
            try {
                await deletePost(id);
                setPosts(posts.filter(p => p.id !== id));
            } catch (error) {
                alert('Erro ao excluir post.');
            }
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === 'all' ||
            (filter === 'published' && post.is_published) ||
            (filter === 'draft' && !post.is_published);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-organic-white uppercase tracking-tight">
                        Posts do <span className="text-organic-cyan">Blog</span>
                    </h1>
                    <p className="text-organic-white/50 font-sans mt-1">
                        Gerencie o conteúdo do seu site.
                    </p>
                </div>
                <Link
                    to="/adminorg/blog/novo"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 font-display uppercase text-sm tracking-wide"
                >
                    <Plus size={18} />
                    Novo Post
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-organic-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-organic-gray/20 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-organic-white focus:outline-none focus:border-organic-cyan/50 transition-colors font-sans"
                    />
                </div>
                <div className="flex bg-organic-gray/20 border border-white/5 rounded-2xl p-1">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all' ? 'bg-organic-cyan/10 text-organic-cyan' : 'text-organic-white/40 hover:text-organic-white'}`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('published')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'published' ? 'bg-organic-cyan/10 text-organic-cyan' : 'text-organic-white/40 hover:text-organic-white'}`}
                    >
                        Publicados
                    </button>
                    <button
                        onClick={() => setFilter('draft')}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'draft' ? 'bg-organic-cyan/10 text-organic-cyan' : 'text-organic-white/40 hover:text-organic-white'}`}
                    >
                        Rascunhos
                    </button>
                </div>
            </div>

            {/* Posts List */}
            <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-organic-cyan" size={32} />
                        <p className="text-organic-white/40 font-sans text-sm">Carregando posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="p-20 text-center">
                        <p className="text-organic-white/40 font-sans">Nenhum post encontrado.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-organic-white/40 font-bold">
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Post</th>
                                    <th className="px-6 py-4">Categoria</th>
                                    <th className="px-6 py-4">Data</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            {post.is_published ? (
                                                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                                    <CheckCircle2 size={14} />
                                                    Publicado
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs text-organic-white/30 font-medium">
                                                    <Circle size={14} />
                                                    Rascunho
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/10">
                                                    {post.cover_image ? (
                                                        <img src={post.cover_image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-organic-white/20">
                                                            <ImageIcon size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-organic-white font-medium truncate">{post.title}</p>
                                                    <p className="text-[10px] text-organic-white/30 truncate">/{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-organic-white/60">
                                                {post.category?.name || '—'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-organic-white/40">
                                                {new Date(post.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-xl text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                                    title="Visualizar"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                                <Link
                                                    to={`/adminorg/blog/editar/${post.id}`}
                                                    className="p-2 rounded-xl text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    className="p-2 rounded-xl text-organic-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

