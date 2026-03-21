import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ─── Fallback cover gerado em TypeScript (garantido) ───────────────────────
function generateFallbackCover(title: string, keywords: string[]): string {
    const kwTags = keywords.slice(0, 3).map(k =>
        `<span style="display:inline-block;padding:4px 14px;background:#47e4be12;border:1px solid #47e4be35;border-radius:100px;color:#47e4be;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 6px 6px 0;">${k}</span>`
    ).join('');

    return `<div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#12161f 0%,#1e2333 40%,#232323 100%);border-radius:24px;padding:60px 52px 48px;margin-bottom:44px;border:1px solid #47e4be18;">
  <div style="position:absolute;top:-80px;right:-80px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,#47e4be10 0%,transparent 65%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:-60px;left:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,#5a3d7f16 0%,transparent 65%);pointer-events:none;"></div>
  <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#47e4be50,transparent);"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#5a3d7f40,transparent);"></div>
  <div style="position:relative;z-index:1;">
    <div style="margin-bottom:24px;">${kwTags}</div>
    <h1 style="color:#e6e6e6;font-size:clamp(26px,4vw,52px);font-weight:900;line-height:1.12;text-transform:uppercase;letter-spacing:-0.01em;margin:0 0 20px;max-width:720px;">${title}</h1>
    <div style="display:flex;align-items:center;gap:12px;margin-top:28px;">
      <div style="height:2px;width:48px;background:linear-gradient(90deg,#47e4be,#5a3d7f);border-radius:2px;"></div>
      <span style="color:#47e4be80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;">Organic Assessoria</span>
    </div>
  </div>
</div>`;
}

// ─── Gera cover HTML via Gemini ─────────────────────────────────────────────
async function generateCoverHtml(
    title: string,
    keywords: string[],
    geminiUrl: string
): Promise<string> {
    const prompt = `Você é um desenvolvedor frontend especializado em design de alto impacto.
Crie um cover art HTML puro para um post de blog da "Organic Assessoria" (agência brasileira de branding & marketing digital).

TÍTULO DO POST: "${title}"
PALAVRAS-CHAVE: ${keywords.slice(0, 4).join(', ')}

REQUISITOS OBRIGATÓRIOS:
- Um único elemento <div> raiz com inline CSS APENAS (zero classes externas, zero Tailwind, zero fonts externas)
- width: 100%, min-height: 400px
- Palette: teal #47e4be, roxo #5a3d7f, background escuro #12161f a #232323, texto #e6e6e6
- Estilo dark premium moderno — compatível com agência digital de alto padrão
- Use gradientes CSS, shapes geométricas abstratas, pseudo-layers (divs posicionados)
- O título do post DEVE aparecer em destaque dentro do cover
- Inclua "Organic Assessoria" como marca d'água sutil (posição bottom-right, opacity baixa)
- PROIBIDO: <img>, JavaScript, imports externos, markdown fences (\`\`\`)
- RETORNE APENAS o HTML do div raiz — sem texto antes ou depois`;

    try {
        const res = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.85, maxOutputTokens: 2048 },
            }),
        });

        if (!res.ok) throw new Error(`Gemini cover HTTP ${res.status}`);

        const data = await res.json();
        let html = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

        // Remover possíveis fences de markdown que Gemini às vezes adiciona
        html = html.replace(/^```html?\n?/i, '').replace(/\n?```$/i, '').trim();

        if (html.startsWith('<div') || html.startsWith('<section')) {
            console.log('✅ Cover HTML gerado pelo Gemini com sucesso.');
            return html;
        }
        throw new Error('Cover HTML inválido retornado pelo Gemini');
    } catch (e) {
        console.warn('⚠️ Cover Gemini falhou, usando fallback TypeScript:', e);
        return generateFallbackCover(title, keywords);
    }
}

// ─── Handler principal ───────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
        const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

        const missing = [];
        if (!SUPABASE_URL) missing.push('SUPABASE_URL');
        if (!SUPABASE_SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY');
        if (!GEMINI_API_KEY) missing.push('GEMINI_API_KEY');

        if (missing.length > 0) {
            return new Response(JSON.stringify({
                error: 'Missing environment variables',
                missing,
                note: 'Configure GEMINI_API_KEY nos secrets do Supabase Edge Functions.'
            }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        // 1. Buscar tópicos ativos
        console.log("Buscando tópicos ativos...");
        const { data: topics, error: topicsError } = await supabase
            .from('blog_topics')
            .select('*')
            .eq('is_active', true);

        if (topicsError) throw topicsError;
        if (!topics || topics.length === 0) {
            return new Response(JSON.stringify({ message: 'Nenhum tópico ativo encontrado.', generated: 0 }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        console.log(`Processando ${topics.length} tópico(s).`);
        const results: string[] = [];

        for (const topic of topics) {
            try {
                console.log(`--- Tópico: ${topic.name} ---`);
                const keywords: string[] = topic.keywords || [];

                // 2. Contexto Reddit (opcional, falha silenciosa)
                let trendingSummary = '';
                try {
                    const subs = (topic.subreddits || []).slice(0, 3);
                    for (const sub of subs) {
                        const redditRes = await fetch(
                            `https://www.reddit.com/r/${sub}/hot.json?limit=3&raw_json=1`,
                            { headers: { 'User-Agent': 'OrganicBot/1.0' } }
                        );
                        if (redditRes.ok) {
                            const json = await redditRes.json();
                            const posts = json.data?.children
                                ?.filter((c: any) => !c.data.stickied)
                                ?.slice(0, 3)
                                ?.map((c: any) => `- "${c.data.title}"`)
                                ?.join('\n') || '';
                            if (posts) trendingSummary += `Trends de r/${sub}:\n${posts}\n`;
                        }
                    }
                } catch (e) {
                    console.warn(`Reddit falhou para ${topic.name}:`, e);
                }

                const currentYear = new Date().getFullYear();

                // 3. Prompt principal — artigo com insight boxes visuais
                const articlePrompt = `
Aja como Copywriter Expert B2B da "Organic Assessoria" (consultoria brasileira de branding & marketing digital).
Escreva um artigo PREMIUM atualizado para ${currentYear}. NUNCA mencione anos passados.

TEMA: "${topic.name}"
PALAVRAS-CHAVE: ${keywords.join(', ')}
${trendingSummary ? `CONTEXTO ATUAL (Reddit):\n${trendingSummary}` : ''}

REGRAS DE FORMATAÇÃO DO CAMPO "content" (HTML):
1. Use apenas: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <blockquote>
2. Estilize <h2> com style="color:#47e4be" e <h3> com style="color:#a78bfa"
3. Insira de 2 a 3 "insight boxes" ao longo do texto com EXATAMENTE este padrão:
<div style="margin:36px 0;padding:24px 28px;background:linear-gradient(135deg,#47e4be08,#5a3d7f12);border-left:4px solid #47e4be;border-radius:0 16px 16px 0;">
<strong style="color:#47e4be;font-size:13px;text-transform:uppercase;letter-spacing:0.06em;">💡 Insight Organic</strong>
<p style="margin:10px 0 0;color:#e6e6e6cc;line-height:1.65;">TEXTO DO INSIGHT AQUI</p>
</div>
4. NÃO adicione tags <img> — as imagens são geradas separadamente
5. Texto profundo (mínimo 1000 palavras), foco em dicas práticas e resultados
6. Termine com CTA chamando para a Organic Assessoria

RETORNE EXATAMENTE UM JSON VÁLIDO, SEM NADA ANTES OU DEPOIS:
{
  "title": "Título Atrativo do Post",
  "slug": "slug-otimizado-amigavel",
  "excerpt": "Resumo curto de 1-2 frases.",
  "content": "<h2 style=\\"color:#47e4be\\">...</h2><p>...</p>",
  "seo_title": "Titulo SEO",
  "seo_description": "Meta descrição até 160 chars",
  "seo_keywords": ["kw1", "kw2"]
}
`;

                console.log(`Gerando artigo via Gemini 2.0 Flash...`);
                const geminiRes = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: articlePrompt }] }],
                        generationConfig: {
                            temperature: 0.7,
                            topP: 0.95,
                            responseMimeType: "application/json"
                        },
                    }),
                });

                if (!geminiRes.ok) {
                    const errorJson = await geminiRes.json().catch(() => ({}));
                    const msg = errorJson.error?.message || `HTTP ${geminiRes.status}`;
                    results.push(`❌ ${topic.name}: Gemini artigo — ${msg.substring(0, 120)}`);
                    continue;
                }

                const geminiData = await geminiRes.json();
                const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

                if (!rawText) {
                    results.push(`❌ ${topic.name}: Gemini retornou string vazia`);
                    continue;
                }

                let parsedData: any;
                try {
                    parsedData = JSON.parse(rawText);
                } catch {
                    console.error("Parse JSON falhou:", rawText.substring(0, 300));
                    results.push(`❌ ${topic.name}: Falha ao parsear JSON do Gemini`);
                    continue;
                }

                // 4. Gerar cover HTML via Gemini (com fallback TypeScript)
                console.log(`Gerando cover HTML para: ${parsedData.title}`);
                const coverHtml = await generateCoverHtml(parsedData.title, keywords, geminiUrl);

                // 5. Montar HTML final: cover + artigo
                const finalHtml = `${coverHtml}\n${parsedData.content}`;

                // 6. Slug único
                const slugFinal = `${parsedData.slug}-${Math.random().toString(36).substring(2, 7)}`;

                // 7. Salvar no banco
                console.log(`Salvando: "${parsedData.title}"`);
                const insertPayload: any = {
                    title: parsedData.title,
                    slug: slugFinal,
                    content_html: finalHtml,
                    excerpt: parsedData.excerpt,
                    seo_title: parsedData.seo_title,
                    seo_description: parsedData.seo_description,
                    seo_keywords: parsedData.seo_keywords || keywords,
                    is_published: true,
                    is_ai_generated: true,
                    published_at: new Date().toISOString(),
                    image_url: '',   // sem imagens externas
                };

                const { error: insertError } = await supabase
                    .from('blog_posts')
                    .insert(insertPayload)
                    .select()
                    .single();

                if (insertError) {
                    console.warn("Erro ao inserir, tentando sem image_url:", insertError.message);
                    delete insertPayload.image_url;
                    const { error: retryError } = await supabase.from('blog_posts').insert(insertPayload);
                    if (retryError) {
                        results.push(`❌ ${topic.name}: DB Error — ${retryError.message}`);
                        continue;
                    }
                }

                // 8. Atualizar last_generated_at do tópico
                await supabase
                    .from('blog_topics')
                    .update({ last_generated_at: new Date().toISOString() })
                    .eq('id', topic.id);

                console.log(`✅ Sucesso: ${topic.name}`);
                results.push(`✅ ${topic.name}: "${parsedData.title}"`);

            } catch (err: any) {
                console.error(`Falha crítica no tópico ${topic.name}:`, err);
                results.push(`❌ ${topic.name}: Exception — ${err.message}`);
            }
        }

        return new Response(JSON.stringify({
            status: 'completed',
            generated: results.filter(r => r.startsWith('✅')).length,
            total: topics.length,
            details: results,
            timestamp: new Date().toISOString(),
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error("Erro fatal:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
