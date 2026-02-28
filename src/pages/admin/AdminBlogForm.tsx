import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getPostById, createPost, updatePost, getCategories,
    uploadBlogImage, slugify, type BlogPost, type BlogCategory
} from '../../services/blogService';
import { generateBlogPost } from '../../services/aiService';
import { RichTextEditor } from '../../components/blog/RichTextEditor';
import {
    ArrowLeft, Save, Globe, Eye, Image as ImageIcon,
    X, Loader2, Wand2, Search, Settings, Plus
} from 'lucide-react';

const CheckCircleIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const CircleIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
    </svg>
);

export const AdminBlogForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [categories, setCategories] = useState<BlogCategory[]>([]);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [contentHtml, setContentHtml] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    // SEO State
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
    const [keywordInput, setKeywordInput] = useState('');

    useEffect(() => {
        fetchCategories();
        if (isEditing && id) {
            fetchPost(id);
        }
    }, [id, isEditing]);

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchPost = async (postId: string) => {
        try {
            const post = await getPostById(postId);
            setTitle(post.title);
            setSlug(post.slug);
            setContentHtml(post.content_html || '');
            setExcerpt(post.excerpt || '');
            setCoverImage(post.cover_image || '');
            setCategoryId(post.category_id || '');
            setIsPublished(post.is_published);
            setSeoTitle(post.seo_title || '');
            setSeoDescription(post.seo_description || '');
            setSeoKeywords(post.seo_keywords || []);
        } catch (error) {
            console.error('Error fetching post:', error);
            navigate('/adminorg/blog');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        if (!isEditing) {
            setSlug(slugify(value));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            try {
                const url = await uploadBlogImage(e.target.files[0]);
                setCoverImage(url);
            } catch (error) {
                alert('Erro ao enviar imagem.');
            }
        }
    };

    const handleAddKeyword = () => {
        if (keywordInput.trim() && !seoKeywords.includes(keywordInput.trim())) {
            setSeoKeywords([...seoKeywords, keywordInput.trim()]);
            setKeywordInput('');
        }
    };

    const removeKeyword = (tag: string) => {
        setSeoKeywords(seoKeywords.filter(t => t !== tag));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const postData: Partial<BlogPost> = {
            title,
            slug,
            content_html: contentHtml,
            excerpt,
            cover_image: coverImage,
            category_id: categoryId || null,
            is_published: isPublished,
            seo_title: seoTitle || title,
            seo_description: seoDescription || excerpt,
            seo_keywords: seoKeywords,
            published_at: isPublished && !isEditing ? new Date().toISOString() : undefined,
        };

        try {
            if (isEditing && id) {
                await updatePost(id, postData);
            } else {
                await createPost(postData);
            }
            navigate('/adminorg/blog');
        } catch (error: any) {
            alert(`Erro ao salvar post: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleGenerateAI = async () => {
        if (!title) {
            alert('Por favor, digite um título para a IA entender o assunto.');
            return;
        }
        setIsGenerating(true);
        try {
            const { content, error } = await generateBlogPost(title, seoKeywords);
            if (error) {
                alert(`Erro da IA: ${error}`);
            } else if (content) {
                setContentHtml(content);
            }
        } catch (error) {
            alert('Erro crítico ao comunicar com a IA.');
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="animate-spin text-organic-cyan" size={40} />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20 bg-organic-black/80 backdrop-blur-md py-4 -mx-4 px-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/adminorg/blog')}
                        className="p-2 rounded-full hover:bg-white/5 text-organic-white/60 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-organic-white uppercase tracking-tight">
                            {isEditing ? 'Editar' : 'Novo'} <span className="text-organic-cyan">Post</span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsPublished(!isPublished)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider ${isPublished
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 border-white/10 text-organic-white/40'
                            }`}
                    >
                        {isPublished ? <CheckCircleIcon size={14} /> : <CircleIcon size={14} />}
                        {isPublished ? 'Publicado' : 'Rascunho'}
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 disabled:opacity-50 font-display uppercase text-sm tracking-wide"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Salvar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Title & Slug */}
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Título do Post"
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full bg-transparent border-none text-4xl md:text-5xl font-display font-bold text-organic-white placeholder:text-organic-white/10 focus:outline-none focus:ring-0 p-0"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2 text-organic-white/30 text-sm font-sans">
                            <Globe size={14} />
                            <span>organic.com.br/blog/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(slugify(e.target.value))}
                                className="bg-transparent border-none p-0 text-organic-cyan focus:outline-none focus:ring-0"
                                required
                            />
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-organic-white/40 font-bold ml-4">
                            Conteúdo
                        </label>
                        <RichTextEditor
                            content={contentHtml}
                            onChange={setContentHtml}
                            onImageUpload={uploadBlogImage}
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-organic-white/40 font-bold ml-4">
                            Resumo (Excerpt)
                        </label>
                        <textarea
                            placeholder="Uma breve descrição que aparecerá na listagem do blog..."
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full bg-organic-gray/20 border border-white/5 rounded-3xl p-6 text-organic-white/80 focus:outline-none focus:border-organic-cyan/50 transition-colors font-sans"
                        />
                    </div>
                </div>

                {/* Sidebar Settings Area */}
                <div className="space-y-6">
                    {/* Cover Image */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <ImageIcon size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Imagem de Capa</span>
                        </div>
                        <div className="aspect-video rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center justify-center overflow-hidden relative group">
                            {coverImage ? (
                                <>
                                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('')}
                                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-10 h-10 rounded-full bg-organic-cyan/10 flex items-center justify-center text-organic-cyan mx-auto mb-2">
                                        <Plus size={20} />
                                    </div>
                                    <p className="text-xs text-organic-white/30 font-sans">
                                        Arraste ou clique para adicionar
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Settings size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Organização</span>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                Categoria
                            </label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors font-sans appearance-none"
                            >
                                <option value="">Sem categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-6">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Search size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">SEO & Meta</span>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                    Meta Titulo
                                </label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    placeholder={title || 'Título SEO...'}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans text-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                    Meta Descrição
                                </label>
                                <textarea
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    placeholder={excerpt || 'Descrição SEO...'}
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                    Keywords
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={keywordInput}
                                        onChange={(e) => setKeywordInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                                        className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-sm text-organic-white focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddKeyword}
                                        className="p-2 bg-organic-cyan/10 text-organic-cyan border border-organic-cyan/20 rounded-xl hover:bg-organic-cyan/20 transition-all"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {seoKeywords.map((tag) => (
                                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] text-organic-white/60">
                                            {tag}
                                            <button onClick={() => removeKeyword(tag)} className="hover:text-red-400">
                                                <X size={10} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Generation */}
                    <div className="bg-organic-gray/20 border border-organic-cyan/20 rounded-[32px] p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                            <Wand2 size={40} className="text-organic-cyan" />
                        </div>
                        <h4 className="font-display text-sm font-bold text-organic-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
                            <Wand2 size={16} />
                            Gerar com IA
                        </h4>
                        <p className="text-xs text-organic-white/60 font-sans leading-relaxed mb-4">
                            Utilize o Gemini para escrever este artigo. Ele será baseado no seu <strong>Título</strong> e nas suas <strong>Keywords de SEO</strong>.
                        </p>

                        <button
                            type="button"
                            onClick={handleGenerateAI}
                            disabled={isGenerating || !title}
                            className="w-full flex justify-center items-center gap-2 bg-organic-cyan text-organic-black font-bold py-3 rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 disabled:opacity-50 font-display uppercase text-xs"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                            {isGenerating ? 'Escrevendo artigo...' : 'Gerar Artigo'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

