import React, { useEffect, useState } from 'react';
import {
    getCategories, createCategory, updateCategory,
    deleteCategory, slugify, type BlogCategory
} from '../../services/blogService';
import {
    Plus, Edit, Trash2, Save, X,
    Loader2, FolderPlus, FolderOpen, ChevronRight
} from 'lucide-react';

export const AdminBlogCategories: React.FC = () => {
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modal/Form State
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (category: BlogCategory) => {
        setEditingId(category.id);
        setName(category.name);
        setSlug(category.slug);
        setDescription(category.description || '');
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
        setEditingId(null);
        setName('');
        setSlug('');
        setDescription('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const catData = { name, slug, description };
            if (editingId) {
                await updateCategory(editingId, catData);
            } else {
                await createCategory(catData);
            }
            fetchCategories();
            handleClose();
        } catch (error: any) {
            alert(`Erro ao salvar categoria: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir a categoria "${name}"?`)) {
            try {
                await deleteCategory(id);
                setCategories(categories.filter(c => c.id !== id));
            } catch (error) {
                alert('Erro ao excluir categoria. Verifique se existem posts vinculados a ela.');
            }
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-organic-white uppercase tracking-tight">
                        Categorias do <span className="text-organic-cyan">Blog</span>
                    </h1>
                    <p className="text-organic-white/50 font-sans mt-1">
                        Organize seus posts por temas.
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 font-display uppercase text-sm"
                    >
                        <Plus size={18} />
                        Nova Categoria
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Overlay/Side */}
                {showForm && (
                    <div className="lg:col-span-1 space-y-4 animate-in fade-in slide-in-from-left duration-300">
                        <div className="bg-organic-gray/20 border border-organic-cyan/20 rounded-[32px] p-6 space-y-6">
                            <div className="flex items-center justify-between pointer-events-none">
                                <div className="flex items-center gap-2 text-organic-cyan">
                                    <FolderPlus size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest font-display">
                                        {editingId ? 'Editar Categoria' : 'Nova Categoria'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-1 rounded-full hover:bg-white/5 text-organic-white/30 pointer-events-auto"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">Nome</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => (setName(e.target.value), !editingId && setSlug(slugify(e.target.value)))}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors font-sans"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">Link (slug)</label>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(slugify(e.target.value))}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-cyan focus:outline-none focus:border-organic-cyan/50 transition-colors font-sans text-xs"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">Descrição</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white/80 focus:outline-none focus:border-organic-cyan transition-colors font-sans text-sm"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 py-3 bg-organic-cyan text-organic-black font-bold rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 disabled:opacity-50 font-display uppercase text-xs tracking-wider flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                        {editingId ? 'Atualizar' : 'Criar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className={`lg:col-span-${showForm ? '2' : '3'} space-y-4`}>
                    {isLoading ? (
                        <div className="p-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-organic-cyan" size={32} />
                            <p className="text-organic-white/40 font-sans text-sm">Carregando categorias...</p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="p-20 bg-organic-gray/10 border border-white/5 rounded-[32px] text-center">
                            <p className="text-organic-white/40 font-sans">Nenhuma categoria cadastrada.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`bg-organic-gray/20 border rounded-[28px] p-5 flex items-start justify-between group transition-all ${editingId === cat.id ? 'border-organic-cyan/40 bg-organic-cyan/5' : 'border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-organic-white/30 group-hover:text-organic-cyan group-hover:bg-organic-cyan/10 transition-all">
                                            <FolderOpen size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-organic-white font-medium flex items-center gap-2">
                                                {cat.name}
                                                <ChevronRight size={14} className="text-organic-white/20" />
                                            </h3>
                                            <p className="text-[10px] text-organic-white/30 font-bold uppercase tracking-widest mt-0.5 group-hover:text-organic-cyan/60 transition-colors">
                                                /{cat.slug}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="p-2 rounded-lg text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id, cat.name)}
                                            className="p-2 rounded-lg text-organic-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
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
