import { supabase } from '../lib/supabase';

export interface TeamMember {
    id: string;
    email: string;
    name: string;
    role: 'owner' | 'editor';
    is_active: boolean;
    created_at: string;
}

export const getTeamMembers = async (): Promise<TeamMember[]> => {
    const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: true });
    if (error) throw error;
    return data as TeamMember[];
};

export const updateMemberRole = async (id: string, role: 'owner' | 'editor') => {
    const { error } = await supabase
        .from('admin_users')
        .update({ role })
        .eq('id', id);
    if (error) throw error;
};

export const toggleMemberActive = async (id: string, is_active: boolean) => {
    const { error } = await supabase
        .from('admin_users')
        .update({ is_active })
        .eq('id', id);
    if (error) throw error;
};

export const deleteMember = async (id: string) => {
    const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

export const inviteMember = async (email: string, name: string, role: 'owner' | 'editor' = 'editor') => {
    const { data, error } = await supabase.functions.invoke('invite-member', {
        body: { email, name, role },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
};
