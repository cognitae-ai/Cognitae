import { GoogleGenAI } from '@google/genai';

export async function askGemini(apiKey, systemInstruction, history, userText, model = 'gemini-2.5-flash') {
    if (!apiKey) throw new Error("API Key is missing.");

    try {
        const ai = new GoogleGenAI({ apiKey });

        let contents = [];
        if (history && history.length > 0) {
            contents = history.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }));
        }

        contents.push({ role: 'user', parts: [{ text: userText }] });

        const req = {
            model: model,
            contents: contents
        };

        let finalSysInst = systemInstruction;

        if (typeof systemInstruction === 'string' && ['cognitae', 'gaming'].includes(systemInstruction)) {
            let kbContent = '';

            if (systemInstruction === 'cognitae') {
                const { buildSystemPrompt } = await import('../cognitae/lib/prompt.js');
                finalSysInst = buildSystemPrompt();

                // Load up to 10 Knowledge Base files
                const kbFiles = import.meta.glob('../cognitae/knowledge/*.{md,txt}', { eager: true, query: '?raw', import: 'default' });
                const docs = Object.entries(kbFiles).slice(0, 10).map(([path, content], idx) => `--- DOCUMENT ${idx + 1}: ${path.split('/').pop()} ---\n${content}\n`);
                if (docs.length > 0) kbContent = '\n\n=== ADDITIONAL KNOWLEDGE BASE ===\nThe following documents contain deep lore, facts, or systemic rules you must strictly adherence to. Prioritize this knowledge.\n\n' + docs.join('\n');

            } else if (systemInstruction === 'gaming') {
                const { buildSystemPrompt } = await import('../gaming/lib/prompt.js');
                finalSysInst = buildSystemPrompt();

                // Load up to 10 Knowledge Base files
                const kbFiles = import.meta.glob('../gaming/knowledge/*.{md,txt}', { eager: true, query: '?raw', import: 'default' });
                const docs = Object.entries(kbFiles).slice(0, 10).map(([path, content], idx) => `--- DOCUMENT ${idx + 1}: ${path.split('/').pop()} ---\n${content}\n`);
                if (docs.length > 0) kbContent = '\n\n=== ADDITIONAL KNOWLEDGE BASE ===\nThe following documents contain deep lore, facts, or systemic rules you must strictly adherence to. Prioritize this knowledge.\n\n' + docs.join('\n');
            }

            finalSysInst += kbContent;
        }

        if (finalSysInst) {
            req.systemInstruction = finalSysInst;
        }

        const response = await ai.models.generateContent(req);
        return response.text;
    } catch (e) {
        console.error("Gemini API Error:", e);
        throw e;
    }
}
