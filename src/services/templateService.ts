import { supabase } from '../lib/supabase';

export interface ProposalTemplate {
    id: string;
    name: string;
    description: string;
    html_content: string;
    thumbnail_url: string;
    created_at: string;
}

export const getTemplates = async () => {
    const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data as ProposalTemplate[];
};

export const getTemplateById = async (id: string) => {
    const { data, error } = await supabase
        .from('proposal_templates')
        .select('*')
        .eq('id', id)
        .single();
    if (error) throw error;
    return data as ProposalTemplate;
};

export const createTemplate = async (template: Partial<ProposalTemplate>) => {
    const { data, error } = await supabase
        .from('proposal_templates')
        .insert(template)
        .select()
        .single();
    if (error) throw error;
    return data as ProposalTemplate;
};

export const updateTemplate = async (id: string, updates: Partial<ProposalTemplate>) => {
    const { data, error } = await supabase
        .from('proposal_templates')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data as ProposalTemplate;
};

export const deleteTemplate = async (id: string) => {
    const { error } = await supabase
        .from('proposal_templates')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

// ============ PROPOSAL ASSET UPLOADS ============

export const uploadProposalAsset = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
        .from('proposal-assets')
        .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from('proposal-assets')
        .getPublicUrl(filePath);

    return data.publicUrl;
};
