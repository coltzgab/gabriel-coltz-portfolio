import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Lock, Mail, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const { error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError === 'Invalid login credentials'
                ? 'Email ou senha incorretos.'
                : signInError
            );
            setIsSubmitting(false);
            return;
        }

        navigate('/adminorg');
    };

    return (
        <div className="min-h-screen bg-organic-black flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-organic-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-organic-purple/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-organic-cyan/10 border border-organic-cyan/20 mb-6">
                        <Lock className="text-organic-cyan" size={28} />
                    </div>
                    <h1 className="font-display text-4xl font-bold text-organic-white uppercase tracking-tight">
                        Organic <span className="text-organic-cyan">Admin</span>
                    </h1>
                    <p className="text-organic-white/40 text-sm mt-2 font-sans">
                        Acesse o painel de gestão
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-organic-gray/30 border border-white/10 rounded-[40px] p-8 backdrop-blur-sm">
                    {error && (
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-6">
                            <AlertCircle className="text-red-400 flex-shrink-0" size={18} />
                            <p className="text-red-400 text-sm font-sans">{error}</p>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-organic-white/30" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3.5 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors font-sans"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-organic-white/50 mb-2 ml-4 font-bold font-sans">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-organic-white/30" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3.5 text-organic-white focus:outline-none focus:border-organic-cyan transition-colors font-sans"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-8 py-4 bg-organic-cyan text-organic-black font-bold rounded-full hover:bg-white transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-display text-xl uppercase tracking-tight flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Entrando...
                            </>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                </form>

                <p className="text-center text-organic-white/20 text-xs mt-6 font-sans">
                    © {new Date().getFullYear()} Organic Assessoria
                </p>
            </div>
        </div>
    );
};
