import { supabase } from '../lib/supabase';

// ============ TYPES ============
export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: any;
    content_html: string;
    excerpt: string;
    cover_image: string;
    category_id: string | null;
    seo_title: string;
    seo_description: string;
    seo_keywords: string[];
    is_published: boolean;
    is_ai_generated: boolean;
    author_id: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    // Joined
    category?: BlogCategory;
}

// ============ CATEGORIES ============
export const getCategories = async () => {
    const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
    if (error) throw error;
    return data as BlogCategory[];
};

export const createCategory = async (category: Partial<BlogCategory>) => {
    const { data, error } = await supabase
        .from('blog_categories')
        .insert(category)
        .select()
        .single();
    if (error) throw error;
    return data as BlogCategory;
};

export const updateCategory = async (id: string, updates: Partial<BlogCategory>) => {
    const { data, error } = await supabase
        .from('blog_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data as BlogCategory;
};

export const deleteCategory = async (id: string) => {
    const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

// ============ POSTS ============
export const getPosts = async (onlyPublished = false) => {
    console.log('Fetching posts, onlyPublished:', onlyPublished);
    try {
        let query = supabase
            .from('blog_posts')
            .select('*, category:blog_categories(id, name, slug)')
            .order('created_at', { ascending: false });

        if (onlyPublished) {
            query = query.eq('is_published', true);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Supabase error in getPosts:', error);
            throw error;
        }
        console.log('Posts fetched:', data?.length || 0);

        // Map data to ensure category is an object, not an array
        const formattedData = (data || []).map(post => ({
            ...post,
            category: Array.isArray(post.category) ? post.category[0] : post.category
        }));

        return formattedData as BlogPost[];
    } catch (err) {
        console.error('Fatal error in getPosts:', err);
        throw err;
    }
};

export const getPostBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .eq('slug', slug)
        .single();
    if (error) throw error;

    if (data && Array.isArray(data.category)) {
        data.category = data.category[0];
    }

    return data as BlogPost;
};

export const getPostById = async (id: string) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*, category:blog_categories(id, name, slug)')
        .eq('id', id)
        .single();
    if (error) throw error;

    if (data && Array.isArray(data.category)) {
        data.category = data.category[0];
    }

    return data as BlogPost;
};

export const createPost = async (post: Partial<BlogPost>) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert(post)
        .select()
        .single();
    if (error) throw error;
    return data as BlogPost;
};

export const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data as BlogPost;
};

export const deletePost = async (id: string) => {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

// ============ IMAGE UPLOAD ============
export const uploadBlogImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

// ============ HELPERS ============
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

export const getPublishedPosts = async (page = 1, limit = 9) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, published_at, category:blog_categories(id, name, slug)', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    const formattedData = (data || []).map(post => ({
        ...post,
        category: Array.isArray(post.category) ? post.category[0] : post.category
    }));

    return { posts: formattedData as BlogPost[], total: count || 0 };
};

export const getPostsByCategory = async (categorySlug: string, page = 1, limit = 9) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // First get category id
    const { data: cat } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();

    if (!cat) return { posts: [], total: 0 };

    const { data, error, count } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, cover_image, published_at, category:blog_categories(id, name, slug)', { count: 'exact' })
        .eq('is_published', true)
        .eq('category_id', cat.id)
        .order('published_at', { ascending: false })
        .range(from, to);

    if (error) throw error;

    const formattedData = (data || []).map(post => ({
        ...post,
        category: Array.isArray(post.category) ? post.category[0] : post.category
    }));

    return { posts: formattedData as BlogPost[], total: count || 0 };
};
