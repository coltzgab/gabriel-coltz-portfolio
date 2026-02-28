import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')!;

        if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            return new Response(JSON.stringify({ error: 'Missing environment variables' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // 1. Fetch active topics
        const { data: topics, error: topicsError } = await supabase
            .from('blog_topics')
            .select('*')
            .eq('is_active', true);

        if (topicsError) throw topicsError;
        if (!topics || topics.length === 0) {
            return new Response(JSON.stringify({ message: 'No active topics found', generated: 0 }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        console.log(`Found ${topics.length} active topic(s)`);

        const results: string[] = [];

        for (const topic of topics) {
            try {
                console.log(`Generating post for topic: ${topic.name}`);
                const keywords = topic.keywords || [];

                // 2. Try to get Reddit trending (optional, may fail on edge)
                let trendingSummary = '';
                try {
                    for (const sub of (topic.subreddits || []).slice(0, 3)) {
                        const redditRes = await fetch(
                            `https://www.reddit.com/r/${sub}/hot.json?limit=3&raw_json=1`,
                            { headers: { 'User-Agent': 'OrganicBot/1.0' } }
                        );
                        if (redditRes.ok) {
                            const json = await redditRes.json();
                            const posts = json.data?.children
                                ?.filter((c: any) => !c.data.stickied)
                                ?.slice(0, 3)
                                ?.map((c: any, i: number) => `${i + 1}. [r/${c.data.subreddit}] "${c.data.title}" — ${(c.data.selftext || '').substring(0, 200)}`)
                                ?.join('\n') || '';
                            trendingSummary += posts + '\n';
                        }
                    }
                } catch (e) {
                    console.warn('Reddit scraping failed (proceeding without):', e);
                }

                // 3. Generate blog post via Gemini
                const prompt = `
Aja como um Copywriter Especialista em Marketing Digital B2B, criando conteúdo de blog premium para 2026.

CONTEXTO: Você escreve para a "Organic Assessoria", uma consultoria brasileira de branding, marketing digital e web design.
TEMA DO TÓPICO: "${topic.name}"
PALAVRAS-CHAVE: ${keywords.join(', ')}

${trendingSummary ? `ASSUNTOS EM ALTA NO REDDIT (use como inspiração, NÃO copie):\n${trendingSummary}` : ''}

MISSÃO: Crie um artigo completo e VISUALMENTE RICO para blog.

REGRAS ESTRITAS DE FORMATAÇÃO HTML:
1. Retorne SOMENTE HTML puro (sem <html>, <head>, <body>). Apenas o conteúdo do artigo.
2. Use estas tags: <h2>, <h3>, <p>, <ul>, <li>, <ol>, <strong>, <em>, <blockquote>, <figure>, <figcaption>, <img>.
3. Para IMAGENS INCRÍVEIS GERADAS POR IA: Use a API grátis do Pollinations. Formato EXATO: 
   <img src="https://image.pollinations.ai/prompt/CRIE_UM_PROMPT_AQUI_EM_INGLES_DESCREVENDO_A_CENA_DETALHADAMENTE_COMO_MIDJOURNEY?width=800&height=400&nologo=true&seed=NUMERO_ALEATORIO" alt="Sua descrição" style="width:100%;border-radius:16px;margin:24px 0" />
   - Substitua o CRIE_UM_PROMPT_AQUI_EM_INGLES por uma descrição visual hiper-realista em inglês.
   - Escreva o prompt na URL separando as palavras com underline (_) ou traços (-).
   - Use um seed aleatório no final para texturas diferentes.
   - Use 3 a 5 imagens impactantes ao longo do artigo que expliquem visualmente o tema.
4. SUBTÍTULOS <h2> devem ter style="color:#47e4be" (cor cyan da marca).
5. SUBTÍTULOS <h3> devem ter style="color:#a78bfa" (cor lavanda).
6. Use <blockquote style="border-left:4px solid #47e4be;padding:16px 24px;margin:24px 0;background:rgba(71,228,190,0.05);border-radius:12px"> para citações e destaques.
7. O artigo deve ter NO MÍNIMO 1500 palavras.
8. Inclua dados, estatísticas e tendências de 2026.
9. Termine com uma seção de CTA para a Organic Assessoria.

ALÉM DO HTML, retorne ao final do conteúdo (separado por uma linha "---META---"):
TITLE: (título atrativo do artigo, máx 70 chars)
EXCERPT: (resumo de 2 frases para a listagem do blog)
SEO_TITLE: (título SEO otimizado)
SEO_DESC: (meta description, máx 160 chars)
SEO_KEYWORDS: (5-8 keywords separadas por vírgula)
`;

                const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
                const geminiRes = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.8 },
                    }),
                });

                if (!geminiRes.ok) {
                    const errText = await geminiRes.text();
                    console.error(`Gemini API failed for ${topic.name}:`, errText);
                    results.push(`❌ ${topic.name}: Gemini API error`);
                    continue;
                }

                const geminiData = await geminiRes.json();
                let raw = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

                // Clean markdown fences
                raw = raw.replace(/```html\s*/gi, '').replace(/```\s*/gi, '');

                // Parse meta section
                const metaSplit = raw.split('---META---');
                const htmlContent = metaSplit[0].trim();
                const metaSection = metaSplit[1] || '';

                const getMetaField = (field: string) => {
                    const match = metaSection.match(new RegExp(`${field}:\\s*(.+)`, 'i'));
                    return match ? match[1].trim() : '';
                };

                const title = getMetaField('TITLE') || `${topic.name}: Tendências para 2026`;
                const excerpt = getMetaField('EXCERPT') || `Descubra as últimas tendências sobre ${topic.name}.`;
                const seoTitle = getMetaField('SEO_TITLE') || title;
                const seoDesc = getMetaField('SEO_DESC') || excerpt;
                const seoKeywords = getMetaField('SEO_KEYWORDS')
                    ? getMetaField('SEO_KEYWORDS').split(',').map((k: string) => k.trim())
                    : keywords;

                // 4. Generate slug
                const slug = title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .trim() + '-' + Date.now();

                // 5. Extract first image as cover
                const coverMatch = htmlContent.match(/<img[^>]+src="([^"]+)"/);
                const coverImage = coverMatch ? coverMatch[1] : '';

                // 6. Save to DB
                const { error: insertError } = await supabase
                    .from('blog_posts')
                    .insert({
                        title,
                        slug,
                        content_html: htmlContent,
                        excerpt,
                        cover_image: coverImage,
                        seo_title: seoTitle,
                        seo_description: seoDesc,
                        seo_keywords: seoKeywords,
                        is_published: true,
                        is_ai_generated: true,
                        published_at: new Date().toISOString(),
                    });

                if (insertError) {
                    console.error(`Failed to insert post for ${topic.name}:`, insertError);
                    results.push(`❌ ${topic.name}: DB insert error - ${insertError.message}`);
                    continue;
                }

                // 7. Update topic last_generated_at
                await supabase
                    .from('blog_topics')
                    .update({ last_generated_at: new Date().toISOString() })
                    .eq('id', topic.id);

                results.push(`✅ ${topic.name}: "${title}"`);
                console.log(`✅ Generated post for ${topic.name}: ${title}`);

            } catch (topicErr: any) {
                console.error(`Error processing topic ${topic.name}:`, topicErr);
                results.push(`❌ ${topic.name}: ${topicErr.message}`);
            }
        }

        return new Response(JSON.stringify({
            message: `Auto-blog completed. ${results.filter(r => r.startsWith('✅')).length}/${topics.length} posts generated.`,
            generated: results.filter(r => r.startsWith('✅')).length,
            total: topics.length,
            details: results,
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error("Auto-blog fatal error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
