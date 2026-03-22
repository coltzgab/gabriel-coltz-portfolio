import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getProposalById, createProposal, updateProposal,
    slugify, type Proposal
} from '../../services/proposalService';
import { getTemplates, uploadProposalAsset, type ProposalTemplate } from '../../services/templateService';
import { generateProposalHTML, refineProposalHTML } from '../../services/aiService';
import { useAuth } from '../../contexts/AuthContext';
import {
    ArrowLeft, Save, Globe, Loader2,
    Wand2, Settings, Code, Eye, Upload, X, ImagePlus, Palette, Sparkles,
    MessageSquare, Paperclip, Undo2
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

interface VibeCommand {
    role: 'user' | 'assistant';
    text: string;
    image?: string;
    htmlState?: string;
}

export const AdminProposalForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const isEditing = Boolean(id);

    const [isLoading, setIsLoading] = useState(isEditing);
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefining, setIsRefining] = useState(false);
    const [isUploadingLogo, setIsUploadingLogo] = useState(false);
    const [isUploadingProof, setIsUploadingProof] = useState(false);
    const [isUploadingRef, setIsUploadingRef] = useState(false);
    const [templates, setTemplates] = useState<ProposalTemplate[]>([]);

    // Form State
    const [clientName, setClientName] = useState('');
    const [slug, setSlug] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [servicesInput, setServicesInput] = useState('');
    const [totalValue, setTotalValue] = useState<number | ''>('');
    const [isActive, setIsActive] = useState(true);
    const [aiNotes, setAiNotes] = useState('');
    const [aiRefinement, setAiRefinement] = useState('');
    const [clientLogo, setClientLogo] = useState('');
    const [socialProofImages, setSocialProofImages] = useState<string[]>([]);
    const [referenceImages, setReferenceImages] = useState<string[]>([]);
    const [templateId, setTemplateId] = useState('');

    // View mode
    const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');

    const [vibeHistory, setVibeHistory] = useState<VibeCommand[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const revertToState = (idx: number) => {
        const state = vibeHistory[idx];
        if (state && state.htmlState) {
            setHtmlContent(state.htmlState);
            setVibeHistory(vibeHistory.slice(0, idx + 1));
        }
    };

    useEffect(() => {
        fetchTemplates();
        if (isEditing && id) {
            fetchProposal(id);
        }
    }, [id, isEditing]);

    const fetchTemplates = async () => {
        try {
            const data = await getTemplates();
            setTemplates(data);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    const fetchProposal = async (proposalId: string) => {
        try {
            const proposal = await getProposalById(proposalId);
            setClientName(proposal.client_name);
            setSlug(proposal.slug);
            setHtmlContent(proposal.html_content || '');
            setServicesInput(proposal.services ? proposal.services.join(', ') : '');
            setTotalValue(proposal.total_value !== null ? proposal.total_value : '');
            setIsActive(proposal.is_active);
            setClientLogo(proposal.client_logo || '');
            setSocialProofImages(proposal.social_proof_images || []);
            setReferenceImages(proposal.reference_images || []);
            setTemplateId(proposal.template_id || '');
            setAiNotes(proposal.ai_notes || '');
            setVibeHistory(proposal.vibe_history || []);
        } catch (error) {
            console.error('Error fetching proposal:', error);
            navigate('/adminorg/propostas');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientName(value);
        if (!isEditing) {
            setSlug(slugify(value));
        }
    };

    // Upload handlers
    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setIsUploadingLogo(true);
        try {
            const url = await uploadProposalAsset(e.target.files[0], 'logos');
            setClientLogo(url);
        } catch (error) {
            alert('Erro ao enviar logo.');
        } finally {
            setIsUploadingLogo(false);
        }
    };

    const handleSocialProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setIsUploadingProof(true);
        try {
            const urls: string[] = [];
            for (const file of Array.from(e.target.files)) {
                const url = await uploadProposalAsset(file, 'social-proof');
                urls.push(url);
            }
            setSocialProofImages([...socialProofImages, ...urls]);
        } catch (error) {
            alert('Erro ao enviar imagens.');
        } finally {
            setIsUploadingProof(false);
        }
    };

    const handleReferenceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setIsUploadingRef(true);
        try {
            const urls: string[] = [];
            for (const file of Array.from(e.target.files)) {
                const url = await uploadProposalAsset(file, 'references');
                urls.push(url);
            }
            setReferenceImages([...referenceImages, ...urls]);
        } catch (error) {
            alert('Erro ao enviar referências.');
        } finally {
            setIsUploadingRef(false);
        }
    };

    const removeSocialProof = (idx: number) => {
        setSocialProofImages(socialProofImages.filter((_, i) => i !== idx));
    };

    const removeReference = (idx: number) => {
        setReferenceImages(referenceImages.filter((_, i) => i !== idx));
    };

    const handleGenerateAI = async () => {
        if (!clientName && !aiNotes) {
            alert('Por favor, informe o nome do cliente ou o briefing antes de gerar a proposta.');
            return;
        }
        setIsGenerating(true);
        try {
            // Fetch template HTML if selected
            let templateHtml: string | undefined;
            if (templateId) {
                const tpl = templates.find(t => t.id === templateId);
                templateHtml = tpl?.html_content;
            }

            const { content, error } = await generateProposalHTML(clientName, aiNotes, {
                templateHtml,
                clientLogoUrl: clientLogo || undefined,
                socialProofUrls: socialProofImages.length ? socialProofImages : undefined,
            });

            if (error) {
                alert(`Erro da IA: ${error}`);
            } else if (content) {
                setHtmlContent(content);
                setViewMode('preview');
            }
        } catch (error) {
            alert('Erro crítico ao comunicar com a IA.');
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRefineAI = async () => {
        if (!htmlContent) {
            alert('Você precisa gerar ou colar um HTML primeiro antes de refiná-lo.');
            return;
        }
        if (!aiRefinement) {
            alert('Por favor, descreva o que deseja melhorar esteticamente.');
            return;
        }
        setIsRefining(true);
        const thisHtmlState = htmlContent;
        const currentRefinement = aiRefinement;
        const currentImage = selectedImage;

        const userMsg: VibeCommand = { role: 'user', text: currentRefinement, image: currentImage || undefined, htmlState: thisHtmlState };
        setVibeHistory(prev => [...prev, userMsg]);
        setAiRefinement('');
        setSelectedImage(null);

        try {
            const { content, error } = await refineProposalHTML(thisHtmlState, currentRefinement, aiNotes, currentImage || undefined);
            if (error) {
                alert(`Erro da IA: ${error}`);
                setVibeHistory(prev => [...prev, { role: 'assistant', text: `Erro: ${error}` }]);
            } else if (content) {
                setHtmlContent(content);
                setVibeHistory(prev => [...prev, { role: 'assistant', text: 'Design refinado com sucesso!', htmlState: content }]);
                setViewMode('preview');
            }
        } catch (error) {
            alert('Erro crítico ao comunicar com a IA (Refino).');
            console.error(error);
        } finally {
            setIsRefining(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const servicesArray = servicesInput
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        const proposalData: Partial<Proposal> = {
            client_name: clientName,
            slug,
            html_content: htmlContent,
            services: servicesArray,
            total_value: totalValue === '' ? null : Number(totalValue),
            is_active: isActive,
            client_logo: clientLogo,
            social_proof_images: socialProofImages,
            reference_images: referenceImages,
            template_id: templateId || null,
            ai_notes: aiNotes,
            vibe_history: vibeHistory,
        };

        try {
            if (isEditing && id) {
                await updateProposal(id, proposalData);
            } else {
                if (user?.id) {
                    proposalData.created_by = user.id;
                }
                await createProposal(proposalData);
            }
            navigate('/adminorg/propostas');
        } catch (error: any) {
            alert(`Erro ao salvar proposta: ${error.message}`);
        } finally {
            setIsSaving(false);
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
                        onClick={() => navigate('/adminorg/propostas')}
                        className="p-2 rounded-full hover:bg-white/5 text-organic-white/60 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="font-display text-2xl font-bold text-organic-white uppercase tracking-tight">
                            {isEditing ? 'Editar' : 'Nova'} <span className="text-organic-cyan">Proposta</span>
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all text-xs font-bold uppercase tracking-wider ${isActive
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 border-white/10 text-organic-white/40'
                            }`}
                    >
                        {isActive ? <CheckCircleIcon size={14} /> : <CircleIcon size={14} />}
                        {isActive ? 'Ativa' : 'Desativada'}
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
                    {/* Client & Slug */}
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Nome do Cliente"
                                value={clientName}
                                onChange={handleClientNameChange}
                                className="w-full bg-transparent border-none text-4xl md:text-5xl font-display font-bold text-organic-white placeholder:text-organic-white/10 focus:outline-none focus:ring-0 p-0"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2 text-organic-white/30 text-sm font-sans">
                            <Globe size={14} />
                            <span>organic.com.br/proposta/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(slugify(e.target.value))}
                                className="bg-transparent border-none p-0 text-organic-cyan focus:outline-none focus:ring-0 flex-1"
                                required
                            />
                        </div>
                    </div>

                    {/* Editor HTML */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] uppercase tracking-widest text-organic-white/40 font-bold ml-4">
                                Código da Proposta (HTML)
                            </label>

                            <div className="flex bg-organic-gray/20 border border-white/5 rounded-2xl p-1">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('code')}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'code' ? 'bg-organic-cyan/10 text-organic-cyan' : 'text-organic-white/40 hover:text-organic-white'}`}
                                >
                                    <Code size={14} />
                                    Código
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('preview')}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'preview' ? 'bg-organic-cyan/10 text-organic-cyan' : 'text-organic-white/40 hover:text-organic-white'}`}
                                >
                                    <Eye size={14} />
                                    Preview
                                </button>
                            </div>
                        </div>

                        {viewMode === 'code' ? (
                            <textarea
                                value={htmlContent}
                                onChange={(e) => setHtmlContent(e.target.value)}
                                placeholder="Insira o código HTML da landing page aqui..."
                                className="w-full h-[600px] bg-[#0d1117] border border-white/10 rounded-3xl p-6 text-emerald-400 font-mono text-sm leading-relaxed focus:outline-none focus:border-organic-cyan/50 resize-y"
                                spellCheck={false}
                            />
                        ) : (
                            <div className="w-full h-[800px] border border-white/10 rounded-3xl overflow-hidden bg-white">
                                {htmlContent ? (
                                    <iframe
                                        srcDoc={htmlContent}
                                        title="Preview"
                                        className="w-full h-full border-none"
                                        sandbox="allow-scripts"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                                        <Eye size={48} className="mb-4 opacity-20" />
                                        <p>Nenhum conteúdo HTML para visualizar.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Settings Area */}
                <div className="space-y-6">
                    {/* AI Generator */}
                    <div className="bg-organic-cyan/5 border border-organic-cyan/20 rounded-[32px] p-6 space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500 pointer-events-none">
                            <Wand2 size={60} className="text-organic-cyan" />
                        </div>

                        <div className="flex items-center gap-2 text-organic-cyan font-bold relative z-10">
                            <Wand2 size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Gerar com IA</span>
                        </div>

                        <p className="text-xs text-organic-white/60 font-sans leading-relaxed relative z-10">
                            A IA usará o briefing, template de base, logo e prova social para gerar a proposta.
                        </p>

                        <div className="space-y-1 relative z-10">
                            <label className="text-[10px] uppercase tracking-widest text-organic-cyan/70 font-bold ml-2">
                                Briefing / Notas
                            </label>
                            <textarea
                                value={aiNotes}
                                onChange={(e) => setAiNotes(e.target.value)}
                                placeholder="Ex: Site institucional para advogado, valores 5k, cores preto e dourado..."
                                rows={4}
                                className="w-full bg-black/40 border border-organic-cyan/20 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans text-sm resize-none"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleGenerateAI}
                            disabled={isGenerating || (!clientName && !aiNotes)}
                            className="w-full relative z-10 flex justify-center items-center gap-2 bg-organic-cyan text-organic-black font-bold py-3 rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 disabled:opacity-50 font-display uppercase text-xs tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                            {isGenerating ? 'Criando Proposta...' : 'Gerar HTML Final'}
                        </button>

                        {htmlContent && (
                            <div className="pt-4 border-t border-organic-cyan/20 space-y-4 relative z-10 mt-2">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] uppercase tracking-widest text-organic-purple font-bold ml-2 flex items-center gap-2">
                                        <MessageSquare size={12} />
                                        Vibe Chat (Edição Estética)
                                    </h3>

                                    {/* Chat History */}
                                    {vibeHistory.length > 0 && (
                                        <div className="bg-black/20 border border-organic-purple/10 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-3 font-sans text-sm">
                                            {vibeHistory.map((msg, idx) => (
                                                <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                                    <div className={`p-2.5 rounded-2xl max-w-[90%] text-xs ${msg.role === 'user' ? 'bg-organic-purple/20 text-organic-white border border-organic-purple/30' : 'bg-white/5 text-organic-white/80 border border-white/10'}`}>
                                                        {msg.image && <img src={msg.image} alt="Ref" className="w-full mb-2 rounded-lg object-cover" />}
                                                        {msg.text}
                                                    </div>
                                                    {msg.role === 'user' && msg.htmlState && (
                                                        <button
                                                            type="button"
                                                            onClick={() => revertToState(idx)}
                                                            className="text-[9px] text-organic-cyan/60 hover:text-organic-cyan flex items-center gap-1 uppercase tracking-wider mt-1"
                                                        >
                                                            <Undo2 size={10} /> Reverter para este ponto
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {isRefining && (
                                                <div className="flex justify-start">
                                                    <div className="p-2.5 rounded-2xl bg-white/5 text-organic-white/80 border border-white/10 text-xs flex items-center gap-2">
                                                        <Loader2 size={12} className="animate-spin text-organic-cyan" /> Analisando Vibe...
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Input Area */}
                                    <div className="relative">
                                        {selectedImage && (
                                            <div className="absolute -top-12 left-0 w-10 h-10 rounded-lg border border-organic-purple/30 overflow-hidden bg-black z-20">
                                                <img src={selectedImage} className="w-full h-full object-cover" alt="Selected" />
                                                <button onClick={() => setSelectedImage(null)} type="button" className="absolute top-0 right-0 bg-red-500 text-white p-0.5"><X size={10} /></button>
                                            </div>
                                        )}
                                        <textarea
                                            value={aiRefinement}
                                            onChange={(e) => setAiRefinement(e.target.value)}
                                            placeholder="Ex: Deixe os botões arredondados, adicione fade-in nos textos..."
                                            rows={2}
                                            className="w-full bg-black/40 border border-organic-purple/30 rounded-2xl px-4 py-3 pl-10 text-organic-white focus:outline-none focus:border-organic-purple font-sans text-sm resize-none transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute left-3 top-3.5 text-organic-white/40 hover:text-organic-purple transition-colors"
                                            title="Anexar Imagem"
                                        >
                                            <Paperclip size={16} />
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleImageSelect}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRefineAI}
                                    disabled={isRefining || !aiRefinement}
                                    className="w-full flex justify-center items-center gap-2 bg-transparent border border-organic-cyan/50 text-organic-cyan font-bold py-2 rounded-2xl hover:bg-organic-cyan/10 transition-all disabled:opacity-50 font-display uppercase text-xs tracking-wider"
                                >
                                    {isRefining ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                                    {isRefining ? 'Aplicando Refino...' : 'Aplicar Estética com IA'}
                                </button>
                                <p className="text-[10px] text-organic-white/40 text-center leading-tight">
                                    Esta ação <strong>NÃO altera a copy</strong>! Apenas injeta estilos, classes e animações no HTML atual.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Template Selection */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Palette size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Template Base</span>
                        </div>
                        <select
                            value={templateId}
                            onChange={(e) => setTemplateId(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans appearance-none text-sm"
                        >
                            <option value="">Sem template (IA cria do zero)</option>
                            {templates.map(tpl => (
                                <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                            ))}
                        </select>
                        <p className="text-[10px] text-organic-white/30 ml-2">
                            Selecione um template para a IA usar como base de layout.
                        </p>
                    </div>

                    {/* Client Logo */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Upload size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Logo do Cliente</span>
                        </div>
                        <div className="aspect-[3/1] rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center overflow-hidden relative group/logo">
                            {clientLogo ? (
                                <>
                                    <img src={clientLogo} alt="Logo" className="max-h-full max-w-full object-contain p-4" />
                                    <button
                                        type="button"
                                        onClick={() => setClientLogo('')}
                                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    {isUploadingLogo ? (
                                        <Loader2 className="animate-spin text-organic-cyan mx-auto" size={24} />
                                    ) : (
                                        <>
                                            <Upload size={20} className="text-organic-white/30 mx-auto mb-1" />
                                            <p className="text-[10px] text-organic-white/30">Upload logo</p>
                                        </>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Social Proof */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <ImagePlus size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Prova Social</span>
                        </div>
                        <p className="text-[10px] text-organic-white/30 ml-2">
                            Prints de conversa, projetos, depoimentos — serão incluídos na proposta.
                        </p>

                        {socialProofImages.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                                {socialProofImages.map((url, i) => (
                                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative group/proof border border-white/10">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeSocialProof(i)}
                                            className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover/proof:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <label className="flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-organic-cyan/30 transition-colors text-xs text-organic-white/40 hover:text-organic-cyan">
                            {isUploadingProof ? <Loader2 className="animate-spin" size={14} /> : <ImagePlus size={14} />}
                            {isUploadingProof ? 'Enviando...' : 'Adicionar Imagens'}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleSocialProofUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Reference Images */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Eye size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Referências Visuais</span>
                        </div>
                        <p className="text-[10px] text-organic-white/30 ml-2">
                            Imagens de inspiração para a IA se basear no design.
                        </p>

                        {referenceImages.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                                {referenceImages.map((url, i) => (
                                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative group/ref border border-white/10">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeReference(i)}
                                            className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover/ref:opacity-100 transition-opacity"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <label className="flex items-center justify-center gap-2 py-2.5 border border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-organic-cyan/30 transition-colors text-xs text-organic-white/40 hover:text-organic-cyan">
                            {isUploadingRef ? <Loader2 className="animate-spin" size={14} /> : <ImagePlus size={14} />}
                            {isUploadingRef ? 'Enviando...' : 'Adicionar Referências'}
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleReferenceUpload}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Commercial Details */}
                    <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-6 space-y-4">
                        <div className="flex items-center gap-2 text-organic-white/60 font-medium">
                            <Settings size={18} />
                            <span className="text-sm font-display uppercase tracking-wider">Detalhes Comerciais</span>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                Valor Total Estimado (R$)
                            </label>
                            <input
                                type="number"
                                value={totalValue}
                                onChange={(e) => setTotalValue(e.target.value ? Number(e.target.value) : '')}
                                placeholder="0.00"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold ml-2">
                                Serviços (separar por vírgula)
                            </label>
                            <input
                                type="text"
                                value={servicesInput}
                                onChange={(e) => setServicesInput(e.target.value)}
                                placeholder="Web Design, Tráfego Pago, SEO..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-organic-white focus:outline-none focus:border-organic-cyan font-sans text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
