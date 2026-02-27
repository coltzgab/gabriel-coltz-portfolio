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
        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', userId)
            .eq('is_active', true)
            .single();

        if (error || !data) {
            setAdminProfile(null);
            return null;
        }

        setAdminProfile(data as AdminProfile);
        return data;
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchAdminProfile(session.user.id).finally(() => setIsLoading(false));
            } else {
                setIsLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    await fetchAdminProfile(session.user.id);
                } else {
                    setAdminProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
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
