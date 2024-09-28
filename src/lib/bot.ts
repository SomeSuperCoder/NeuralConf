import type { Message } from "./message";

export interface Bot extends BaseBot {
    messages: Message[]
}

export interface BaseBot {
    username: string,
    name: string,
    model: "llama3.1" | "llama2-uncensored" | "llama3.2:3b" | "llama3.2:1b",    
}

export async function load_bot() {
    // let pb = new PocketBase("http://127.0.0.1:8090");
}
