import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

interface AdminProfile {
    id: string;
    email: string;
    name: string;
    role: 'owner' | 'editor';
    is_active: boolean;
}

interface AuthContextType {
    session: Session | null;
    user: User | null;
    adminProfile: AdminProfile | null;
    isLoading: boolean;
    isOwner: boolean;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAdminProfile = async (userId: string) => {
        try {
            console.log('Fetching admin profile for:', userId);
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('id', userId)
                .eq('is_active', true)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                setAdminProfile(null);
                return null;
            }

            if (!data) {
                console.warn('No active admin profile found for user');
                setAdminProfile(null);
                return null;
            }

            console.log('Profile fetched successfully:', data.email, data.role);
            setAdminProfile(data as AdminProfile);
            return data;
        } catch (err) {
            console.error('Fatal error fetching profile:', err);
            setAdminProfile(null);
            return null;
        }
    };

    useEffect(() => {
        let mounted = true;

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;

            console.log('Initial session check:', session?.user?.email || 'No session');
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                fetchAdminProfile(session.user.id).finally(() => {
                    if (mounted) setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (!mounted) return;

                console.log('Auth event received:', event, session?.user?.email || 'No user');

                setSession(session);
                setUser(session?.user ?? null);

                if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                    if (session?.user) {
                        // Use a side effect so we don't block the listener
                        setIsLoading(true);
                        fetchAdminProfile(session.user.id).finally(() => {
                            if (mounted) setIsLoading(false);
                        });
                    } else {
                        setIsLoading(false);
                    }
                } else if (event === 'SIGNED_OUT') {
                    setAdminProfile(null);
                    setSession(null);
                    setUser(null);
                    setIsLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: error.message };

        return { error: null };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setAdminProfile(null);
    };

    const isOwner = adminProfile?.role === 'owner';

    return (
        <AuthContext.Provider value={{
            session, user, adminProfile, isLoading, isOwner,
            signIn, signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
