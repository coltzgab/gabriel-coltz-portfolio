import React, { useEffect, useState } from 'react';
import {
    getTopics, createTopic, updateTopic, deleteTopic,
    scrapeMultipleSubreddits, type BlogTopic
} from '../../services/topicService';
import { generateRichBlogFromReddit } from '../../services/aiService';
import { createPost, slugify as blogSlugify } from '../../services/blogService';
import {
    Plus, Edit, Trash2, Save, X, Loader2, Zap, Globe,
    TrendingUp, Play, ChevronRight, Sparkles, Clock
} from 'lucide-react';

export const AdminBlogTopics: React.FC = () => {
    const [topics, setTopics] = useState<BlogTopic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [generatingId, setGeneratingId] = useState<string | null>(null);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [subreddits, setSubreddits] = useState('');
    const [keywords, setKeywords] = useState('');

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        setIsLoading(true);
        try {
            const data = await getTopics();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (topic: BlogTopic) => {
        setEditingId(topic.id);
        setName(topic.name);
        setSubreddits(topic.subreddits.join(', '));
        setKeywords(topic.keywords.join(', '));
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
        setSubreddits('');
        setKeywords('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const topicData = {
                name,
                subreddits: subreddits.split(',').map(s => s.trim()).filter(Boolean),
                keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
            };
            if (editingId) {
                await updateTopic(editingId, topicData);
            } else {
                await createTopic(topicData);
            }
            fetchTopics();
            handleClose();
        } catch (error: any) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, topicName: string) => {
        if (window.confirm(`Excluir o tópico "${topicName}"?`)) {
            try {
                await deleteTopic(id);
                setTopics(topics.filter(t => t.id !== id));
            } catch (error) {
                alert('Erro ao excluir tópico.');
            }
        }
    };

    const handleToggleActive = async (topic: BlogTopic) => {
        try {
            await updateTopic(topic.id, { is_active: !topic.is_active });
            setTopics(topics.map(t =>
                t.id === topic.id ? { ...t, is_active: !t.is_active } : t
            ));
        } catch (error) {
            console.error('Error toggling topic:', error);
        }
    };

    const handleGenerateNow = async (topic: BlogTopic) => {
        setGeneratingId(topic.id);
        try {
            // Step 1: Scrape Reddit (Might fail due to CORS or empty subreddits)
            const trending = await scrapeMultipleSubreddits(topic.subreddits);

            if (trending.length === 0) {
                console.warn('Nenhum post encontrado no Reddit (possível bloqueio CORS). A IA vai gerar o post do zero sem a inspiração do Reddit.');
            }

            // Step 2: Generate rich blog post via AI
            const result = await generateRichBlogFromReddit(
                topic.name,
                topic.keywords,
                trending.map(t => ({ title: t.title, selftext: t.selftext, subreddit: t.subreddit }))
            );

            if (result.error) {
                alert(`Erro da IA: ${result.error}`);
                setGeneratingId(null);
                return;
            }

            // Step 3: Save post to Supabase
            const slug = blogSlugify(result.generatedTitle);

            await createPost({
                title: result.generatedTitle,
                slug: slug || blogSlugify(topic.name + '-' + Date.now()),
                content_html: result.content,
                excerpt: result.generatedExcerpt,
                is_published: true,
                published_at: new Date().toISOString(),
                seo_title: result.generatedSeoTitle,
                seo_description: result.generatedSeoDescription,
                seo_keywords: result.generatedSeoKeywords,
            });

            // Step 4: Update last_generated_at
            await updateTopic(topic.id, { last_generated_at: new Date().toISOString() });
            setTopics(topics.map(t =>
                t.id === topic.id ? { ...t, last_generated_at: new Date().toISOString() } : t
            ));

            alert(`✅ Post "${result.generatedTitle}" gerado e publicado com sucesso!`);
        } catch (error: any) {
            alert(`Erro ao gerar: ${error.message}`);
            console.error(error);
        } finally {
            setGeneratingId(null);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-organic-white uppercase tracking-tight">
                        Tópicos <span className="text-organic-cyan">Auto Blog</span>
                    </h1>
                    <p className="text-organic-white/50 font-sans mt-1">
                        Configure temas para geração automática de conteúdo via Reddit + IA.
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 font-display uppercase text-sm"
                    >
                        <Plus size={18} />
                        Novo Tópico
                    </button>
                )}
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-organic-cyan/5 to-purple-500/5 border border-organic-cyan/10 rounded-[28px] p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-organic-cyan/10 flex items-center justify-center text-organic-cyan flex-shrink-0 mt-0.5">
                    <Sparkles size={20} />
                </div>
                <div>
                    <p className="text-sm text-organic-white/80 font-sans leading-relaxed">
                        <strong className="text-organic-cyan">Como funciona:</strong> A cada tópico, o sistema busca assuntos em alta no Reddit (sem API),
                        envia para o Gemini gerar um artigo completo com imagens, e publica direto no blog.
                    </p>
                    <p className="text-xs text-organic-white/40 mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        Cron automático: todos os dias às 08:00 e 18:00 (Brasília)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                {showForm && (
                    <div className="lg:col-span-1 animate-in fade-in slide-in-from-left duration-300">
                        <div className="bg-organic-gray/20 border border-organic-cyan/20 rounded-[32px] p-6 space-y-6 sticky top-24">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-organic-cyan">
                                    <TrendingUp size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest font-display">
                                        {editingId ? 'Editar Tópico' : 'Novo Tópico'}
                                    </span>
                                </div>
                                <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/5 text-organic-white/30">
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">Nome do Tema</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ex: Marketing Digital"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors font-sans"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                        Subreddits <span className="text-organic-cyan/60">(separar por vírgula)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={subreddits}
                                        onChange={(e) => setSubreddits(e.target.value)}
                                        placeholder="marketing, digitalmarketing, socialmedia"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-cyan font-sans text-sm focus:outline-none focus:border-organic-cyan"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                        Keywords SEO <span className="text-organic-cyan/60">(separar por vírgula)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={keywords}
                                        onChange={(e) => setKeywords(e.target.value)}
                                        placeholder="marketing digital, branding, estrategia"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white/80 font-sans text-sm focus:outline-none focus:border-organic-cyan"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-3 bg-organic-cyan text-organic-black font-bold rounded-2xl hover:bg-white transition-all disabled:opacity-50 font-display uppercase text-xs tracking-wider flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                    {editingId ? 'Atualizar' : 'Criar Tópico'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className={`lg:col-span-${showForm ? '2' : '3'} space-y-4`}>
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-organic-cyan" size={32} />
                            <p className="text-organic-white/40 font-sans text-sm">Carregando tópicos...</p>
                        </div>
                    ) : topics.length === 0 ? (
                        <div className="p-20 bg-organic-gray/10 border border-white/5 rounded-[32px] text-center">
                            <p className="text-organic-white/40 font-sans">Nenhum tópico cadastrado. Crie o primeiro!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {topics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className={`bg-organic-gray/20 border rounded-[28px] p-5 group transition-all ${topic.is_active ? 'border-organic-cyan/10 hover:border-organic-cyan/30' : 'border-white/5 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${topic.is_active ? 'bg-organic-cyan/10 text-organic-cyan' : 'bg-white/5 text-organic-white/30'
                                                }`}>
                                                <TrendingUp size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-organic-white font-medium flex items-center gap-2">
                                                    {topic.name}
                                                    <ChevronRight size={14} className="text-organic-white/20" />
                                                </h3>
                                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                    {topic.subreddits.map((sub) => (
                                                        <span key={sub} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-500/10 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                                                            <Globe size={10} />
                                                            r/{sub}
                                                        </span>
                                                    ))}
                                                </div>
                                                {topic.last_generated_at && (
                                                    <p className="text-[10px] text-organic-white/30 mt-1.5 flex items-center gap-1">
                                                        <Clock size={10} />
                                                        Último post: {new Date(topic.last_generated_at).toLocaleString('pt-BR')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* Generate Now Button */}
                                            <button
                                                onClick={() => handleGenerateNow(topic)}
                                                disabled={generatingId === topic.id}
                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${generatingId === topic.id
                                                    ? 'bg-organic-cyan/20 text-organic-cyan animate-pulse'
                                                    : 'bg-organic-cyan text-organic-black hover:bg-white'
                                                    }`}
                                                title="Gerar Post Agora"
                                            >
                                                {generatingId === topic.id ? (
                                                    <Loader2 className="animate-spin" size={14} />
                                                ) : (
                                                    <Play size={14} />
                                                )}
                                                {generatingId === topic.id ? 'Gerando...' : 'Gerar'}
                                            </button>

                                            {/* Toggle Active */}
                                            <button
                                                onClick={() => handleToggleActive(topic)}
                                                className={`p-2 rounded-xl transition-all ${topic.is_active
                                                    ? 'text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20'
                                                    : 'text-organic-white/30 bg-white/5 hover:bg-white/10'
                                                    }`}
                                                title={topic.is_active ? 'Desativar' : 'Ativar'}
                                            >
                                                <Zap size={16} />
                                            </button>

                                            <button
                                                onClick={() => handleEdit(topic)}
                                                className="p-2 rounded-xl text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                                title="Editar"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(topic.id, topic.name)}
                                                className="p-2 rounded-xl text-organic-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                title="Excluir"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
