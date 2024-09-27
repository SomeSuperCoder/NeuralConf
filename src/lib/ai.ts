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
