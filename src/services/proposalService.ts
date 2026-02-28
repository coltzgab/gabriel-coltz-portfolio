import { supabase } from '../lib/supabase';

export interface Proposal {
    id: string;
    client_name: string;
    slug: string;
    html_content: string;
    services: string[];
    total_value: number | null;
    is_active: boolean;
    created_by: string;
    created_at: string;
    expires_at: string | null;
    client_logo: string;
    social_proof_images: string[];
    reference_images: string[];
    template_id: string | null;
    ai_notes: string | null;
    vibe_history?: any[];
}

export const getProposals = async () => {
    const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Proposal[];
};

export const getProposalById = async (id: string) => {
    const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data as Proposal;
};

export const getProposalBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    // If no row is returned or error occurs, let calling code handle it
    if (error) throw error;
    return data as Proposal;
};

export const createProposal = async (proposal: Partial<Proposal>) => {
    const { data, error } = await supabase
        .from('proposals')
        .insert(proposal)
        .select()
        .single();

    if (error) throw error;
    return data as Proposal;
};

export const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    const { data, error } = await supabase
        .from('proposals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data as Proposal;
};

export const deleteProposal = async (id: string) => {
    const { error } = await supabase
        .from('proposals')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};
