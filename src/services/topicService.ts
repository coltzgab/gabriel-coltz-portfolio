import { supabase } from '../lib/supabase';

export interface BlogTopic {
    id: string;
    name: string;
    subreddits: string[];
    keywords: string[];
    is_active: boolean;
    last_generated_at: string | null;
    created_at: string;
}

export const getTopics = async () => {
    const { data, error } = await supabase
        .from('blog_topics')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data as BlogTopic[];
};

export const createTopic = async (topic: Partial<BlogTopic>) => {
    const { data, error } = await supabase
        .from('blog_topics')
        .insert(topic)
        .select()
        .single();
    if (error) throw error;
    return data as BlogTopic;
};

export const updateTopic = async (id: string, updates: Partial<BlogTopic>) => {
    const { data, error } = await supabase
        .from('blog_topics')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error) throw error;
    return data as BlogTopic;
};

export const deleteTopic = async (id: string) => {
    const { error } = await supabase
        .from('blog_topics')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

// ========== REDDIT SCRAPER (no API key needed) ==========

interface RedditPost {
    title: string;
    selftext: string;
    score: number;
    url: string;
    subreddit: string;
}

export const scrapeRedditTrending = async (subreddit: string, limit = 5): Promise<RedditPost[]> => {
    try {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}&raw_json=1`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; OrganicBot/1.0)',
            },
        });

        if (!res.ok) {
            console.error(`Reddit scrape failed for r/${subreddit}:`, res.status);
            return [];
        }

        const json = await res.json();
        const posts: RedditPost[] = json.data.children
            .filter((c: any) => !c.data.stickied)
            .map((c: any) => ({
                title: c.data.title,
                selftext: c.data.selftext?.substring(0, 500) || '',
                score: c.data.score,
                url: `https://reddit.com${c.data.permalink}`,
                subreddit: c.data.subreddit,
            }));

        return posts;
    } catch (err) {
        console.error(`Error scraping r/${subreddit}:`, err);
        return [];
    }
};

export const scrapeMultipleSubreddits = async (subreddits: string[]): Promise<RedditPost[]> => {
    const all: RedditPost[] = [];
    for (const sub of subreddits) {
        const posts = await scrapeRedditTrending(sub, 5);
        all.push(...posts);
    }
    // Sort by score descending and return top results
    return all.sort((a, b) => b.score - a.score).slice(0, 10);
};
