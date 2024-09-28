import type { Message } from "./message";
import ollama from "ollama";

export async function ask_ai(messages: Message[], model: string) {
    return await ollama.chat({
        model,
        messages,
        stream: true,
        keep_alive: "1m",
    });
}

export async function collect_response(response: any): Promise<string> {
    let result = "";

    for await (const part of response) {
        console.log(part);
        result += part.message.content;
    }

    return result;
}
