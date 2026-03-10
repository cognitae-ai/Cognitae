/**
 * Parses raw text or Markdown transcripts into structured conversational arrays.
 * Handles common export formats (ChatGPT, Claude, etc).
 */
export function parseTranscript(rawText) {
    if (!rawText || typeof rawText !== 'string') return [];

    // Common indicators of turn boundaries.
    const userPatterns = [
        /^\s*\*\*[Uu]ser:\*\*\s*/m,
        /^\s*\*\*[Yy]ou:\*\*\s*/m,
        /^\s*[Uu]ser:\s*/m,
        /^\s*[Yy]ou:\s*/m,
        /^#+ [Uu]ser\b/m,
        /^#+ [Yy]ou\b/m
    ];

    const modelPatterns = [
        /^\s*\*\*[Mm]odel:\*\*\s*/m,
        /^\s*\*\*[Aa]ssistant:\*\*\s*/m,
        /^\s*\*\*[Cc]hatGPT:\*\*\s*/m,
        /^\s*\*\*[Cc]laude:\*\*\s*/m,
        /^\s*[Mm]odel:\s*/m,
        /^\s*[Aa]ssistant:\s*/m,
        /^\s*[Cc]hatGPT:\s*/m,
        /^\s*[Cc]laude:\s*/m,
        /^#+ [Mm]odel\b/m,
        /^#+ [Aa]ssistant\b/m,
        /^#+ [Cc]hatGPT\b/m,
        /^#+ [Cc]laude\b/m
    ];

    // Split text into lines to process line by line, detecting role changes.
    const lines = rawText.split('\n');
    const turns = [];
    let currentRole = null;
    let currentContent = [];

    const isUserTurn = (line) => userPatterns.some(p => p.test(line));
    const isModelTurn = (line) => modelPatterns.some(p => p.test(line));

    for (const line of lines) {
        let matchedRole = null;
        let cleanedLine = line;

        if (isUserTurn(line)) {
            matchedRole = 'user';
            // Strip the matched pattern from the beginning of this line.
            for (const p of userPatterns) {
                if (p.test(cleanedLine)) {
                    cleanedLine = cleanedLine.replace(p, '').trim();
                    break;
                }
            }
        } else if (isModelTurn(line)) {
            matchedRole = 'model';
            for (const p of modelPatterns) {
                if (p.test(cleanedLine)) {
                    cleanedLine = cleanedLine.replace(p, '').trim();
                    break;
                }
            }
        }

        if (matchedRole) {
            // Push previous turn if it exists
            if (currentRole && (currentContent.length > 0 || cleanedLine.trim() !== '')) {
                turns.push({
                    id: crypto.randomUUID(),
                    role: currentRole,
                    content: currentContent.join('\n').trim()
                });
            }
            // Start new turn
            currentRole = matchedRole;
            currentContent = cleanedLine ? [cleanedLine] : [];
        } else {
            // Append to current turn
            if (currentRole) {
                currentContent.push(line);
            }
        }
    }

    // Push the very last turn
    if (currentRole && currentContent.length > 0) {
        turns.push({
            id: crypto.randomUUID(),
            role: currentRole,
            content: currentContent.join('\n').trim()
        });
    }

    // Attempt to guess target model from header if present
    let targetModelGuess = "Imported Model";
    const headerMatch = rawText.match(/Model: (.*)|Assistant: (.*)|ChatGPT|Claude/i);
    if (headerMatch) {
        targetModelGuess = (headerMatch[1] || headerMatch[2] || headerMatch[0]).trim();
    }

    return { turns, targetModelGuess };
}
