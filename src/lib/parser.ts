export interface ParseResult {
    thought: string | null,
    response: string | null 
}

export function parseResponse(input: string): ParseResult {
    // Match for <thought>...</thought> and <response>...</response> with multiline support
    const thoughtMatch = input.match(/<thought>([\s\S]*?)<\/thought>/);
    const responseMatch = input.match(/<response>([\s\S]*?)<\/response>/);

    // Extract data1 and data2 based on matches
    const data1 = thoughtMatch ? thoughtMatch[1].trim() : null;
    const data2 = responseMatch ? responseMatch[1].trim() : null;

    // Handle cases where tags are not closed
    if (input.includes('<thought>') && !input.includes('</thought>')) {
        const unclosedThoughtMatch = input.match(/<thought>([\s\S]*?)$/);
        if (unclosedThoughtMatch) {
            return { thought: unclosedThoughtMatch[1].trim(), response: data2 };
        }
    }

    if (input.includes('<response>') && !input.includes('</response>')) {
        const unclosedResponseMatch = input.match(/<response>([\s\S]*?)$/);
        if (unclosedResponseMatch) {
            return { thought: data1, response: unclosedResponseMatch[1].trim() };
        }
    }

    return { thought: data1, response: data2 };
}
