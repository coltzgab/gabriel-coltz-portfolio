import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    LayoutDashboard, FileText, FolderOpen, FileCode, Users,
    LogOut, Menu, X, ChevronRight, TrendingUp
} from 'lucide-react';

const navItems = [
    { to: '/adminorg', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/adminorg/blog', icon: FileText, label: 'Blog' },
    { to: '/adminorg/categorias', icon: FolderOpen, label: 'Categorias' },
    { to: '/adminorg/topicos', icon: TrendingUp, label: 'Auto Blog' },
    { to: '/adminorg/propostas', icon: FileCode, label: 'Propostas' },
    { to: '/adminorg/templates', icon: LayoutDashboard, label: 'Templates' },
];

const ownerItems = [
    { to: '/adminorg/equipe', icon: Users, label: 'Equipe' },
];

export const AdminLayout: React.FC = () => {
    const { adminProfile, signOut, isOwner } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/adminorg/login');
    };

    const allNavItems = [...navItems, ...(isOwner ? ownerItems : [])];

    const NavItem = ({ item }: { item: typeof navItems[0] }) => (
        <NavLink
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-sans text-sm ${isActive
                    ? 'bg-organic-cyan/10 text-organic-cyan border border-organic-cyan/20'
                    : 'text-organic-white/60 hover:bg-white/5 hover:text-organic-white border border-transparent'
                }`
            }
        >
            <item.icon size={18} />
            <span className="font-medium">{item.label}</span>
            <ChevronRight size={14} className="ml-auto opacity-30" />
        </NavLink>
    );

    return (
        <div className="min-h-screen bg-organic-black flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-72
        bg-organic-gray/50 border-r border-white/5 backdrop-blur-xl
        flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-display text-2xl text-organic-white uppercase tracking-tight">
                                Organic <span className="text-organic-cyan">Admin</span>
                            </h2>
                            <p className="text-[10px] uppercase tracking-widest text-organic-white/30 font-bold mt-1">
                                Painel de Gestão
                            </p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-xl hover:bg-white/5 text-organic-white/60"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {allNavItems.map((item) => (
                        <NavItem key={item.to} item={item} />
                    ))}
                </nav>

                {/* User info + Logout */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-organic-cyan/20 flex items-center justify-center text-organic-cyan font-bold text-sm font-display">
                            {adminProfile?.name?.charAt(0) || adminProfile?.email?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-organic-white truncate font-sans">
                                {adminProfile?.name || 'Admin'}
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-organic-cyan font-bold">
                                {adminProfile?.role || 'editor'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-all font-sans text-sm"
                    >
                        <LogOut size={18} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar (mobile) */}
                <header className="lg:hidden sticky top-0 z-20 bg-organic-black/80 backdrop-blur-xl border-b border-white/5 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl hover:bg-white/5 text-organic-white/60"
                        >
                            <Menu size={22} />
                        </button>
                        <h1 className="font-display text-lg text-organic-white uppercase">
                            Organic <span className="text-organic-cyan">Admin</span>
                        </h1>
                        <div className="w-10" /> {/* Spacer */}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
