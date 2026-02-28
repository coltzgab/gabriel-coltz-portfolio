import React, { useEffect, useState } from 'react';
import { getTemplates, createTemplate, updateTemplate, deleteTemplate, type ProposalTemplate } from '../../services/templateService';
import { Plus, Edit2, Trash2, Code, Eye, X, Loader2, Save } from 'lucide-react';

export const AdminProposalTemplates: React.FC = () => {
    const [templates, setTemplates] = useState<ProposalTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        setIsLoading(true);
        try {
            const data = await getTemplates();
            setTemplates(data);
        } catch (error) {
            console.error('Failed to load templates:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (template?: ProposalTemplate) => {
        if (template) {
            setEditingId(template.id);
            setName(template.name);
            setDescription(template.description || '');
            setHtmlContent(template.html_content);
        } else {
            setEditingId(null);
            setName('');
            setDescription('');
            setHtmlContent('');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setName('');
        setDescription('');
        setHtmlContent('');
    };

    const saveTemplate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !htmlContent) return;

        setIsSaving(true);
        try {
            if (editingId) {
                await updateTemplate(editingId, { name, description, html_content: htmlContent });
            } else {
                await createTemplate({ name, description, html_content: htmlContent });
            }
            await loadTemplates();
            closeModal();
        } catch (error: any) {
            alert('Erro ao salvar template: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar este template? Ele não poderá mais ser usado como base.')) {
            try {
                await deleteTemplate(id);
                setTemplates(templates.filter(t => t.id !== id));
            } catch (error: any) {
                alert('Erro ao excluir: ' + error.message);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-organic-white">
                        Templates de <span className="text-organic-cyan">Proposta</span>
                    </h1>
                    <p className="text-organic-white/40 text-sm mt-1">Gerencie os códigos HTML que servem de base para a IA gerar novas propostas</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-organic-cyan text-organic-black px-6 py-2 rounded-full font-bold uppercase font-display text-sm tracking-widest hover:bg-white transition-colors"
                >
                    <Plus size={16} /> Novo Template
                </button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-organic-cyan" size={40} />
                </div>
            ) : templates.length === 0 ? (
                <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-12 text-center">
                    <Code className="mx-auto text-organic-white/20 mb-4" size={48} />
                    <h3 className="text-xl font-display font-bold uppercase mb-2">Sem Templates</h3>
                    <p className="text-organic-white/40 text-sm max-w-sm mx-auto">
                        Adicione layouts HTML bonitos aqui. A IA usará eles como base estrutural e visual para as próximas propostas de clientes.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(tpl => (
                        <div key={tpl.id} className="bg-organic-gray/20 border border-white/5 rounded-[32px] overflow-hidden group hover:border-organic-cyan/30 transition-colors">
                            <div className="h-32 bg-[#0d1117] relative p-4 border-b border-white/5 overflow-hidden">
                                <Code className="absolute -right-4 -bottom-4 text-white/5" size={100} />
                                <div className="text-[10px] uppercase font-mono text-organic-cyan/60">
                                    {tpl.html_content.substring(0, 100)}...
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="font-display font-bold text-xl uppercase tracking-wider mb-2">{tpl.name}</h3>
                                <p className="text-organic-white/40 text-sm h-10 line-clamp-2">{tpl.description}</p>

                                <div className="mt-6 flex justify-end gap-2">
                                    <button
                                        onClick={() => openModal(tpl)}
                                        className="p-2 border border-white/10 rounded-xl text-organic-white/60 hover:text-white hover:border-white transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(tpl.id)}
                                        className="p-2 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
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

            {/* Modal Edit/Create */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <form onSubmit={saveTemplate} className="w-full max-w-4xl bg-organic-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-organic-gray/20">
                            <h2 className="font-display text-xl font-bold uppercase tracking-widest text-white">
                                {editingId ? 'Editar Template' : 'Novo Template'}
                            </h2>
                            <button type="button" onClick={closeModal} className="text-white/40 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-organic-white/60">Nome do Template</label>
                                    <input
                                        required
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-organic-cyan focus:outline-none"
                                        placeholder="Ex: Landing Page Tech"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest font-bold text-organic-white/60">Descrição (Opcional)</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-organic-cyan focus:outline-none"
                                        placeholder="Estilo dark focado em dados..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <label className="text-xs uppercase tracking-widest font-bold text-organic-white/60">Código HTML Base</label>
                                <textarea
                                    required
                                    value={htmlContent}
                                    onChange={e => setHtmlContent(e.target.value)}
                                    className="w-full h-[400px] bg-[#0d1117] border border-white/10 rounded-2xl px-4 py-4 text-emerald-400 font-mono text-sm focus:border-organic-cyan focus:outline-none resize-none"
                                    placeholder="<html...>"
                                    spellCheck={false}
                                />
                                <p className="text-[10px] text-white/40 mt-2">Dica: Cole o HTML completo da Landing Page, a IA irá ler este HTML e manter o layout exato, mas substituindo os textos/imagens/cores de acordo com o briefing.</p>
                            </div>
                        </div>

                        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-organic-gray/20">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-6 py-2 rounded-full font-bold uppercase text-xs tracking-wider text-white/60 hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2 bg-organic-cyan text-organic-black rounded-full font-bold uppercase text-xs tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                Salvar Template
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
