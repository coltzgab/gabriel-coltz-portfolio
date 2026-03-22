import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProposals, deleteProposal, type Proposal } from '../../services/proposalService';
import {
    Plus, Edit, Trash2, Search, ExternalLink,
    CheckCircle2, Circle, Loader2, FileText
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminProposals: React.FC = () => {
    const { isOwner } = useAuth();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        setIsLoading(true);
        try {
            const data = await getProposals();
            setProposals(data);
        } catch (error) {
            console.error('Error fetching proposals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!isOwner) {
            alert('Apenas o owner pode excluir propostas.');
            return;
        }

        if (window.confirm(`Tem certeza que deseja excluir a proposta de "${name}"?`)) {
            try {
                await deleteProposal(id);
                setProposals(proposals.filter(p => p.id !== id));
            } catch (error) {
                alert('Erro ao excluir proposta.');
            }
        }
    };

    const filteredProposals = proposals.filter(proposal =>
        proposal.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold text-organic-white uppercase tracking-tight">
                        Propostas <span className="text-organic-cyan">Comerciais</span>
                    </h1>
                    <p className="text-organic-white/50 font-sans mt-1">
                        Gerencie propostas enviadas aos clientes.
                    </p>
                </div>
                <Link
                    to="/adminorg/propostas/nova"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 font-display uppercase text-sm tracking-wide"
                >
                    <Plus size={18} />
                    Nova Proposta
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-organic-white/30" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-organic-gray/20 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-organic-white focus:outline-none focus:border-organic-cyan/50 transition-colors font-sans"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-organic-cyan" size={32} />
                        <p className="text-organic-white/40 font-sans text-sm">Carregando propostas...</p>
                    </div>
                ) : filteredProposals.length === 0 ? (
                    <div className="p-20 text-center">
                        <p className="text-organic-white/40 font-sans">Nenhuma proposta encontrada.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans">
                            <thead>
                                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-organic-white/40 font-bold">
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Valor</th>
                                    <th className="px-6 py-4">Data</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProposals.map((proposal) => (
                                    <tr key={proposal.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4">
                                            {proposal.is_active ? (
                                                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                                                    <CheckCircle2 size={14} />
                                                    Ativa
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1.5 text-xs text-organic-white/30 font-medium">
                                                    <Circle size={14} />
                                                    Desativada
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-organic-white/40 flex-shrink-0">
                                                    <FileText size={18} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-organic-white font-medium truncate">{proposal.client_name}</p>
                                                    <p className="text-[10px] text-organic-white/30 truncate">/proposta/{proposal.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-organic-cyan/80">
                                                {proposal.total_value
                                                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(proposal.total_value)
                                                    : 'A Definir'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-organic-white/40">
                                                {new Date(proposal.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/proposta/${proposal.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-xl text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                                    title="Visualizar URL Pública"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                                <Link
                                                    to={`/adminorg/propostas/editar/${proposal.id}`}
                                                    className="p-2 rounded-xl text-organic-white/40 hover:text-organic-cyan hover:bg-organic-cyan/10 transition-all"
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                {isOwner && (
                                                    <button
                                                        onClick={() => handleDelete(proposal.id, proposal.client_name)}
                                                        className="p-2 rounded-xl text-organic-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
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
