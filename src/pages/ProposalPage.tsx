import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProposalBySlug } from '../services/proposalService';
import { Loader2 } from 'lucide-react';

export const ProposalPage: React.FC = () => {
    const { slug } = useParams();
    const [html, setHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            getProposalBySlug(slug)
                .then(p => setHtml(p.html_content))
                .catch(err => {
                    console.error('Error loading proposal:', err);
                    setError('Proposta não encontrada ou indisponível.');
                });
        }
    }, [slug]);

    if (error) {
        return (
            <div className="min-h-screen bg-organic-black text-organic-white flex flex-col items-center justify-center p-4 text-center space-y-4">
                <div className="text-organic-cyan font-bold text-4xl mb-4">404</div>
                <h1 className="text-2xl font-display">{error}</h1>
                <p className="text-organic-white/50 text-sm">Verifique se o link está correto.</p>
            </div>
        );
    }

    if (html === null) {
        return (
            <div className="min-h-screen bg-organic-black flex flex-col justify-center items-center space-y-4">
                <Loader2 className="animate-spin text-organic-cyan" size={40} />
                <p className="text-organic-white/50 animate-pulse text-sm font-sans tracking-widest uppercase">Carregando Proposta...</p>
            </div>
        );
    }

    // Use iframe with full viewport height/width to render the dedicated HTML page
    return (
        <iframe
            srcDoc={html}
            title="Proposta Comercial - Organic"
            className="w-full h-screen border-none block m-0 p-0 overflow-hidden"
            sandbox="allow-scripts allow-same-origin"
        />
    );
};
