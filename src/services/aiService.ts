import { supabase } from '../lib/supabase';

export interface AIResponse {
    content: string;
    error?: string;
}

// Core Gemini API call via Secure Edge Function
async function generateGeminiContent(prompt: string, model = 'gemini-2.5-flash', imageBase64?: string): Promise<string> {
    const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: { prompt, model, imageBase64 }
    });

    if (error) {
        throw new Error(`Edge Function Error: ${error.message || 'Call failed'}`);
    }

    if (data && data.error) {
        throw new Error(`Gemini API Error: ${data.error}`);
    }

    if (!data || !data.content) {
        throw new Error('Sem resposta válida da IA (Edge Function).');
    }

    return data.content;
}

function cleanHtml(raw: string): string {
    return raw.replace(/^```html\s*/i, '').replace(/\s*```$/i, '').trim();
}

// ============== BLOG GENERATION (Manual) ==============

export const generateBlogPost = async (topic: string, keywords: string[]): Promise<AIResponse> => {
    try {
        const prompt = `
Aja como um Copywriter Especialista e criador de conteúdo B2B de alta conversão.
Escreva um artigo de blog completo sobre o tópico: "${topic}".
Use as seguintes palavras-chave de forma natural: ${keywords.join(', ')}.

Diretrizes:
- O artigo deve estar pronto para o formato HTML. 
- Use APENAS as tags HTML internas necessárias: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>.
- NÃO envolva com <html>, <body>, ou tags de layout estrutural grande. Retorne apenas o conteúdo html puro para o body do editor.
- Mantenha um tom profissional, engajador e focado em marcação visual de alto nível (estilo "SaaS Premium").
- Inclua uma introdução forte, desenvolvimento dividido por intertítulos <h2>, e uma conclusão focada em conversão para a consultoria de marketing/branding.
- Formate a leitura para ser escaneável (parágrafos curtos, bullet points).
`;
        const content = await generateGeminiContent(prompt);
        return { content: cleanHtml(content) };
    } catch (error: any) {
        console.error('Error generating blog post:', error);
        return { content: '', error: error.message };
    }
};

// ============== BLOG GENERATION (Auto — Rich with Reddit Context) ==============

interface RedditContext {
    title: string;
    selftext: string;
    subreddit: string;
}

export const generateRichBlogFromReddit = async (
    topicName: string,
    topicKeywords: string[],
    trendingPosts: RedditContext[]
): Promise<AIResponse & { generatedTitle: string; generatedExcerpt: string; generatedSeoTitle: string; generatedSeoDescription: string; generatedSeoKeywords: string[] }> => {
    try {
        const trendingSummary = trendingPosts
            .map((p, i) => `${i + 1}. [r/${p.subreddit}] "${p.title}" — ${p.selftext.substring(0, 200)}`)
            .join('\n');

        const prompt = `
Aja como um Copywriter Especialista em Marketing Digital B2B, criando conteúdo de blog premium para 2026.

CONTEXTO: Você escreve para a "Organic Assessoria", uma consultoria brasileira de branding, marketing digital e web design.
TEMA DO TÓPICO: "${topicName}"
PALAVRAS-CHAVE: ${topicKeywords.join(', ')}

ASSUNTOS EM ALTA NO REDDIT (use como inspiração, NÃO copie):
${trendingSummary}

MISSÃO: Crie um artigo completo e VISUALMENTE RICO para blog.

REGRAS ESTRITAS DE FORMATAÇÃO HTML:
1. Retorne SOMENTE HTML puro (sem <html>, <head>, <body>). Apenas o conteúdo do artigo.
2. Use estas tags: <h2>, <h3>, <p>, <ul>, <li>, <ol>, <strong>, <em>, <blockquote>, <figure>, <figcaption>, <img>.
3. Para IMAGENS INCRÍVEIS GERADAS POR IA: Use a API grátis do Pollinations. Formato EXATO: 
   <img src="https://image.pollinations.ai/prompt/CRIE_UM_PROMPT_AQUI_EM_INGLES_DESCREVENDO_A_CENA_DETALHADAMENTE_COMO_MIDJOURNEY?width=800&height=400&nologo=true&seed=NUMERO_ALEATORIO" alt="Sua descrição" style="width:100%;border-radius:16px;margin:24px 0" />
   - Substitua o CRIE_UM_PROMPT_AQUI_EM_INGLES por uma descrição visual hiper-realista em inglês (ex: "futuristic_neon_marketing_digital_dashboard_in_dark_room_hyper_detailed").
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

        const raw = await generateGeminiContent(prompt);
        const cleaned = cleanHtml(raw);

        // Parse meta section
        const metaSplit = cleaned.split('---META---');
        const htmlContent = metaSplit[0].trim();
        const metaSection = metaSplit[1] || '';

        const getMetaField = (field: string) => {
            const match = metaSection.match(new RegExp(`${field}:\\s*(.+)`, 'i'));
            return match ? match[1].trim() : '';
        };

        return {
            content: htmlContent,
            generatedTitle: getMetaField('TITLE') || `${topicName}: Tendências para 2026`,
            generatedExcerpt: getMetaField('EXCERPT') || `Descubra as últimas tendências sobre ${topicName} e como aplicá-las ao seu negócio.`,
            generatedSeoTitle: getMetaField('SEO_TITLE') || getMetaField('TITLE') || topicName,
            generatedSeoDescription: getMetaField('SEO_DESC') || getMetaField('EXCERPT') || '',
            generatedSeoKeywords: getMetaField('SEO_KEYWORDS')
                ? getMetaField('SEO_KEYWORDS').split(',').map(k => k.trim())
                : topicKeywords,
        };
    } catch (error: any) {
        console.error('Error generating rich blog post:', error);
        return {
            content: '',
            error: error.message,
            generatedTitle: '',
            generatedExcerpt: '',
            generatedSeoTitle: '',
            generatedSeoDescription: '',
            generatedSeoKeywords: [],
        };
    }
};

// ============== PROPOSAL GENERATION (Enhanced) ==============

interface ProposalGenerationOptions {
    clientName: string;
    notes: string;
    templateHtml?: string;
    clientLogoUrl?: string;
    socialProofUrls?: string[];
}

export const generateProposalHTML = async (
    clientName: string,
    notes: string,
    options?: Partial<ProposalGenerationOptions>
): Promise<AIResponse> => {
    try {
        const templateInstruction = options?.templateHtml
            ? `\nUSE O SEGUINTE HTML COMO BASE/REFERÊNCIA DE LAYOUT (mantenha a estrutura e estilo, mas adapte o conteúdo para o novo cliente):\n\`\`\`\n${options.templateHtml.substring(0, 25000)}\n\`\`\``
            : '';

        const logoInstruction = options?.clientLogoUrl
            ? `\nLOGO DO CLIENTE: Inclua a logo do cliente no Hero usando esta URL: ${options.clientLogoUrl}`
            : '';

        const socialProofInstruction = options?.socialProofUrls?.length
            ? `\nPROVA SOCIAL: Inclua um carrossel/galeria de prova social com estas imagens:\n${options.socialProofUrls.map((url, i) => `  ${i + 1}. ${url}`).join('\n')}\nUse um design de carrossel com scroll horizontal e cards com border-radius e sombra.`
            : '';

        const prompt = `
Aja como um Web Designer e Especialista em Branding Criando uma Página de Vendas (Landing Page) Personalizada.
A missão é criar uma Proposta Comercial em formato HTML completo (Landing Page) para o cliente: "${clientName}".

COPYWRITING E CONTEÚDO A SER USADO (USE ESSE TEXTO EXATAMENTE COMO BASE, NÃO INVENTE DO ZERO E NÃO OMITA):
${notes}
${templateInstruction}
${logoInstruction}
${socialProofInstruction}

Diretrizes Estritas:
1. Retorne APENAS um código HTML VÁLIDO e COMPLETO (com as tags <html>, <head>, <body>).
2. Sem as crases do markdown — APENAS o HTML puro.
3. Utilize Tailwind CSS (do CDN oficial) importando via script no <head>: <script src="https://cdn.tailwindcss.com"></script>.
4. USO OBRIGATÓRIO DO TEXTO FORNECIDO: Você DEVE usar TODO o conteúdo de texto fornecido no campo "COPYWRITING E CONTEÚDO" e distribuí-lo pelo design da página.
5. PROIBIDO TEXTO VAZIO OU LOREM IPSUM: Se houver um Template Base com Lorem Ipsum, SUBSTITUA-O INTEGRALMENTE pelo texto enviado no campo acima.
6. O Design deve ser Premium, Dark Theme, SaaS feeling (foco em preto, cinza escuro, com acentos de cyan e roxo neon tipo os da Organic).
7. A página deve ter:
    - Um Heroblock impactante saudando a marca do cliente.${options?.clientLogoUrl ? '\n    - A logo do cliente renderizada no hero.' : ''}
    - Estruture a seção de "O Problema", "A Solução" e "Escopo" usando os textos fornecidos.
    - Valores/Investimento (use notas se tiver valores, senão "R$ A DEFINIR", com boxes bonitos).${options?.socialProofUrls?.length ? '\n    - Seção de Prova Social com carrossel das imagens fornecidas.' : ''}
    - Call to Action ("Aprovar Proposta").
8. Use tipografias limpas do Google Fonts (Inter ou Outfit). Aplique classes de glassmorphism e gradients suaves.
9. Adicione animações CSS suaves (fade-in, slide-up) para um feeling premium.
`;
        const content = await generateGeminiContent(prompt);
        return { content: cleanHtml(content) };
    } catch (error: any) {
        console.error('Error generating proposal:', error);
        return { content: '', error: error.message };
    }
};

export const refineProposalHTML = async (
    currentHtml: string,
    refinementInstructions: string,
    originalNotes?: string,
    imageBase64?: string
): Promise<AIResponse> => {
    try {
        const copyContext = originalNotes
            ? `\nUSE ESTES TEXTOS EXATAMENTE COMO ESTÃO NO SEU HTML. NÃO OS ALTERE:\n${originalNotes}\n`
            : '';

        const imageContext = imageBase64
            ? `\nO USUÁRIO FORNECEU UMA IMAGEM RELEVANTE (PRINT/REFERÊNCIA). Use a imagem para entender exatamente o que ele quer alinhar no design.\n`
            : '';

        const prompt = `
Aja como um Web Designer, Desenvolvedor Front-end e Especialista em UI/UX experiente.
O usuário quer fazer uma melhoria ou ajuste ESTÉTICO em uma página HTML (Proposta/Landing Page) existente feita com Tailwind CSS.
            ${imageContext}

### HTML ATUAL:
\`\`\`html
${currentHtml.substring(0, 25000)}
\`\`\`

### INSTRUÇÕES DE MELHORIA / ALTERAÇÃO:
${refinementInstructions}
${copyContext}

### DIRETRIZES ESTRITAS E IMBATÍVEIS (RISCO DE DEMISSÃO SE DESCUMPRIDAS):
1. **PRESERVAÇÃO INTEGRAL DO CONTEÚDO:** Você ESTÁ ESTRITAMENTE PROIBIDO de apagar, resumir ou alterar qualquer texto, título, parágrafo ou conteúdo escrito do HTML atual. Sua função é 100% sobre injeção de classes CSS Tailwind, <style> ou pequenos scripts. NUNCA DELETA TEXTO.
2. **NÃO TRUNQUE O CÓDIGO:** Retorne EXATAMENTE todo o código HTML (da tag <html> até </html>), aplicando suas edições estéticas. Se a página era grande, ela DEVE continuar grande. Não diga "o resto do código aqui".
3. **FORMATO DE SAÍDA:** Retorne APENAS um código HTML VÁLIDO. Sem as crases do markdown (\`\`\`html) — APENAS o HTML puro.
4. **ESTÉTICA:** Se o usuário pedir animações, adicione classes do Tailwind animate-* ou crie estilos internos simples no <head>. Se pedir para alterar cores, substitua as utilidades de cor (ex: de bg-red-500 para bg-blue-500).

RETORNE APENAS O NOVO HTML COMPLETO E FINAL. AQUI ESTÁ A PÁGINA:
`;
        const content = await generateGeminiContent(prompt, 'gemini-2.5-flash', imageBase64);
        return { content: cleanHtml(content) };
    } catch (error: any) {
        console.error('Error refining proposal:', error);
        return { content: '', error: error.message };
    }
};

