import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    getTeamMembers, updateMemberRole, toggleMemberActive, deleteMember,
    type TeamMember
} from '../../services/teamService';
import {
    Users, Shield, ShieldCheck, UserPlus, Trash2, Loader2, ToggleLeft,
    ToggleRight, Mail, Clock, AlertTriangle
} from 'lucide-react';

export const AdminTeam: React.FC = () => {
    const { adminProfile } = useAuth();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Invite form
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteName, setInviteName] = useState('');
    const [inviteRole, setInviteRole] = useState<'editor' | 'owner'>('editor');
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setIsLoading(true);
        try {
            const data = await getTeamMembers();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching team:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (member: TeamMember) => {
        if (member.id === adminProfile?.id) {
            alert('Você não pode desativar seu próprio acesso.');
            return;
        }
        try {
            await toggleMemberActive(member.id, !member.is_active);
            setMembers(members.map(m => m.id === member.id ? { ...m, is_active: !m.is_active } : m));
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleRoleChange = async (member: TeamMember, newRole: 'owner' | 'editor') => {
        if (member.id === adminProfile?.id) {
            alert('Você não pode alterar seu próprio cargo.');
            return;
        }
        try {
            await updateMemberRole(member.id, newRole);
            setMembers(members.map(m => m.id === member.id ? { ...m, role: newRole } : m));
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDelete = async (member: TeamMember) => {
        if (member.id === adminProfile?.id) {
            alert('Você não pode excluir seu próprio acesso.');
            return;
        }
        if (!confirm(`Tem certeza que deseja remover ${member.name || member.email} da equipe? Essa ação é irreversível.`)) return;
        try {
            await deleteMember(member.id);
            setMembers(members.filter(m => m.id !== member.id));
        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail) return;
        setIsInviting(true);
        try {
            alert('⚠️ Recurso de convite por e-mail será implementado com Edge Function. Por enquanto, crie o membro diretamente no Supabase Auth e na tabela admin_users.');
            setShowInvite(false);
            setInviteEmail('');
            setInviteName('');
        } catch (error: any) {
            alert('Erro ao convidar: ' + error.message);
        } finally {
            setIsInviting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-organic-white">
                        Gestão de <span className="text-organic-cyan">Equipe</span>
                    </h1>
                    <p className="text-organic-white/40 text-sm mt-1">
                        Gerencie os membros que têm acesso ao painel administrativo
                    </p>
                </div>
                <button
                    onClick={() => setShowInvite(!showInvite)}
                    className="flex items-center gap-2 bg-organic-cyan text-organic-black px-6 py-2 rounded-full font-bold uppercase font-display text-sm tracking-widest hover:bg-white transition-colors"
                >
                    <UserPlus size={16} /> Convidar
                </button>
            </div>

            {/* Invite Form */}
            {showInvite && (
                <form onSubmit={handleInvite} className="bg-organic-gray/20 border border-organic-cyan/20 rounded-[32px] p-6 space-y-4">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-organic-cyan flex items-center gap-2">
                        <UserPlus size={18} /> Convidar Novo Membro
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-organic-white/60">Nome</label>
                            <input
                                type="text"
                                value={inviteName}
                                onChange={e => setInviteName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-organic-cyan focus:outline-none"
                                placeholder="Nome do membro"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-organic-white/60">E-mail</label>
                            <input
                                required
                                type="email"
                                value={inviteEmail}
                                onChange={e => setInviteEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-organic-cyan focus:outline-none"
                                placeholder="email@exemplo.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-organic-white/60">Cargo</label>
                            <select
                                value={inviteRole}
                                onChange={e => setInviteRole(e.target.value as 'editor' | 'owner')}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-organic-cyan focus:outline-none appearance-none"
                            >
                                <option value="editor">Editor</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setShowInvite(false)}
                            className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isInviting}
                            className="flex items-center gap-2 px-5 py-2 bg-organic-cyan text-organic-black rounded-full font-bold uppercase text-xs tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                        >
                            {isInviting ? <Loader2 className="animate-spin" size={14} /> : <Mail size={14} />}
                            Enviar Convite
                        </button>
                    </div>
                </form>
            )}

            {/* Members List */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-organic-cyan" size={40} />
                </div>
            ) : members.length === 0 ? (
                <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] p-12 text-center">
                    <Users className="mx-auto text-organic-white/20 mb-4" size={48} />
                    <h3 className="text-xl font-display font-bold uppercase mb-2">Nenhum membro</h3>
                    <p className="text-organic-white/40 text-sm max-w-sm mx-auto">
                        Convide seu primeiro membro para a equipe.
                    </p>
                </div>
            ) : (
                <div className="bg-organic-gray/20 border border-white/5 rounded-[32px] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-organic-white/40">Membro</th>
                                    <th className="text-left px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-organic-white/40">Cargo</th>
                                    <th className="text-center px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-organic-white/40">Status</th>
                                    <th className="text-center px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-organic-white/40">Membro Desde</th>
                                    <th className="text-right px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-organic-white/40">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => {
                                    const isCurrentUser = member.id === adminProfile?.id;
                                    return (
                                        <tr key={member.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-display ${member.is_active ? 'bg-organic-cyan/20 text-organic-cyan' : 'bg-red-500/10 text-red-400'}`}>
                                                        {member.name?.charAt(0) || member.email?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-organic-white text-sm font-sans flex items-center gap-2">
                                                            {member.name || 'Sem nome'}
                                                            {isCurrentUser && (
                                                                <span className="text-[9px] uppercase tracking-widest bg-organic-cyan/10 text-organic-cyan px-2 py-0.5 rounded-full font-bold">
                                                                    Você
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-organic-white/40 font-sans">{member.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {isCurrentUser ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-organic-cyan">
                                                        <ShieldCheck size={14} />
                                                        {member.role}
                                                    </span>
                                                ) : (
                                                    <select
                                                        value={member.role}
                                                        onChange={e => handleRoleChange(member, e.target.value as 'owner' | 'editor')}
                                                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-organic-white focus:border-organic-cyan focus:outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="editor">Editor</option>
                                                        <option value="owner">Owner</option>
                                                    </select>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleToggleActive(member)}
                                                    disabled={isCurrentUser}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isCurrentUser ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'} ${member.is_active
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                        }`}
                                                >
                                                    {member.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                                                    {member.is_active ? 'Ativo' : 'Inativo'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-xs text-organic-white/40 font-sans flex items-center justify-center gap-1.5">
                                                    <Clock size={12} />
                                                    {formatDate(member.created_at)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!isCurrentUser ? (
                                                    <button
                                                        onClick={() => handleDelete(member)}
                                                        className="p-2 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                                                        title="Remover da equipe"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                ) : (
                                                    <span className="text-organic-white/20 text-xs">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Info Box */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                    <p className="text-amber-400 font-bold text-xs uppercase tracking-wider">Nota sobre convites</p>
                    <p className="text-organic-white/50 text-xs mt-1">
                        Para adicionar um novo membro à equipe, primeiro crie uma conta no <strong>Supabase Auth</strong> (Authentication → Users → Create User),
                        depois insira o registro na tabela <strong>admin_users</strong> com o mesmo UUID. O convite por e-mail automatizado será implementado em breve.
                    </p>
                </div>
            </div>
        </div>
    );
};
