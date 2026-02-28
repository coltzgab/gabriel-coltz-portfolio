import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { prompt, model, imageBase64 } = await req.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Missing prompt' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyCXJV4jIDz5FFvrRNH6UnifmCW0Jx9kNh8';
        if (!GEMINI_API_KEY) {
            return new Response(JSON.stringify({ error: 'Server missing GEMINI_API_KEY' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const targetModel = model || 'gemini-2.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${GEMINI_API_KEY}`;

        console.log("Calling Gemini API...");

        const parts: any[] = [{ text: prompt }];

        if (imageBase64) {
            const [mimeData, b64] = imageBase64.includes(';base64,')
                ? imageBase64.split(';base64,')
                : [null, imageBase64];
            const mimeType = mimeData ? mimeData.split(':')[1] : 'image/jpeg';
            const data = b64 || imageBase64;

            parts.push({
                inlineData: {
                    mimeType,
                    data
                }
            });
        }

        const geminiRes = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts }],
                generationConfig: { temperature: 0.8 },
            }),
        });

        if (!geminiRes.ok) {
            const errorText = await geminiRes.text();
            console.error("Gemini API error:", errorText);
            return new Response(JSON.stringify({ error: 'Gemini API call failed', details: errorText }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const data = await geminiRes.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            console.error("Invalid response format from Gemini", JSON.stringify(data));
            return new Response(JSON.stringify({ error: "Invalid response format from Gemini", details: data }), {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ content: generatedText }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error("Function error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
