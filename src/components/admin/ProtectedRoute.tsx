import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireOwner?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireOwner = false }) => {
    const { session, adminProfile, isLoading, isOwner } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-organic-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-organic-cyan" size={40} />
                    <p className="text-organic-white/60 font-sans text-sm">Carregando...</p>
                </div>
            </div>
        );
    }

    // Not logged in
    if (!session) {
        return <Navigate to="/adminorg/login" state={{ from: location }} replace />;
    }

    // Logged in but not an active admin
    if (!adminProfile) {
        return (
            <div className="min-h-screen bg-organic-black flex items-center justify-center px-6">
                <div className="max-w-md text-center">
                    <h1 className="font-display text-4xl text-organic-white mb-4 uppercase">Acesso Negado</h1>
                    <p className="text-organic-white/60 font-sans mb-6">
                        Você não tem permissão para acessar o painel administrativo.
                        Entre em contato com o administrador.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-3 bg-organic-cyan text-organic-black font-semibold rounded-full hover:scale-105 transition-transform font-display uppercase"
                    >
                        Voltar ao Site
                    </button>
                </div>
            </div>
        );
    }

    // Requires owner but user is editor
    if (requireOwner && !isOwner) {
        return <Navigate to="/adminorg" replace />;
    }

    return <>{children}</>;
};
