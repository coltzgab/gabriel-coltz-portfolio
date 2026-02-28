import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { FileText, FileCode, Users, TrendingUp } from 'lucide-react';

interface Stats {
    totalPosts: number;
    publishedPosts: number;
    totalProposals: number;
    activeProposals: number;
    teamMembers: number;
    activeTopics: number;
}

export const AdminDashboard: React.FC = () => {
    const { adminProfile } = useAuth();
    const [stats, setStats] = useState<Stats>({
        totalPosts: 0, publishedPosts: 0, totalProposals: 0, activeProposals: 0, teamMembers: 0, activeTopics: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const [postsRes, publishedRes, proposalsRes, activeRes, teamRes, topicsRes] = await Promise.all([
                supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
                supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('is_published', true),
                supabase.from('proposals').select('id', { count: 'exact', head: true }),
                supabase.from('proposals').select('id', { count: 'exact', head: true }).eq('is_active', true),
                supabase.from('admin_users').select('id', { count: 'exact', head: true }).eq('is_active', true),
                supabase.from('blog_topics').select('id', { count: 'exact', head: true }).eq('is_active', true),
            ]);

            setStats({
                totalPosts: postsRes.count || 0,
                publishedPosts: publishedRes.count || 0,
                totalProposals: proposalsRes.count || 0,
                activeProposals: activeRes.count || 0,
                teamMembers: teamRes.count || 0,
                activeTopics: topicsRes.count || 0,
            });
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Posts do Blog', value: stats.totalPosts, sub: `${stats.publishedPosts} publicados`, icon: FileText, color: 'text-organic-cyan' },
        { label: 'Propostas', value: stats.totalProposals, sub: `${stats.activeProposals} ativas`, icon: FileCode, color: 'text-emerald-400' },
        { label: 'Auto Blog', value: stats.activeTopics, sub: 'tópicos ativos', icon: TrendingUp, color: 'text-amber-400' },
        { label: 'Equipe', value: stats.teamMembers, sub: 'membros ativos', icon: Users, color: 'text-organic-cyan' },
    ];

    return (
        <div>
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-organic-white uppercase tracking-tight">
                    Olá, <span className="text-organic-cyan">{adminProfile?.name || 'Admin'}</span>
                </h1>
                <p className="text-organic-white/50 font-sans mt-1">
                    Gerencie seu blog, propostas e equipe.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statCards.map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-organic-gray/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-2xl bg-white/5 ${card.color} group-hover:scale-110 transition-transform`}>
                                <card.icon size={20} />
                            </div>
                        </div>
                        <p className="font-display text-3xl font-bold text-organic-white">{card.value}</p>
                        <p className="text-[10px] uppercase tracking-widest text-organic-white/40 font-bold mt-1">{card.label}</p>
                        <p className="text-xs text-organic-white/30 font-sans mt-0.5">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-organic-gray/20 border border-white/5 rounded-3xl p-6">
                <h2 className="font-display text-xl text-organic-white uppercase tracking-tight mb-4">Ações Rápidas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <a
                        href="/adminorg/blog/new"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-organic-cyan/5 border border-organic-cyan/20 text-organic-cyan hover:bg-organic-cyan/10 transition-all font-sans text-sm"
                    >
                        <FileText size={18} />
                        <span className="font-medium">Novo Post</span>
                    </a>
                    <a
                        href="/adminorg/propostas/nova"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all font-sans text-sm"
                    >
                        <FileCode size={18} />
                        <span className="font-medium">Nova Proposta</span>
                    </a>
                    <a
                        href="/adminorg/blog/gerar"
                        className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 transition-all font-sans text-sm"
                    >
                        <TrendingUp size={18} />
                        <span className="font-medium">Gerar Post com IA</span>
                    </a>
                </div>
            </div>
        </div>
    );
};
