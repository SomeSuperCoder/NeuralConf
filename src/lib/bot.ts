import Pocketbase from "pocketbase";
import { Role, type Message } from "./message";
import format from "python-format-js";
import { logic_prompt, new_response_format, new_line_wrap } from "./prompts";

export interface Bot extends BaseBot {
    messages: Message[]
}

export interface BaseBot {
    username: string,
    name: string,
    model: "llama3.1" | "llama2-uncensored" | "llama3.2:3b" | "llama3.2:1b",   
    system_prompt: string 
}

export async function load_bot(username: string) {
    let pb = new Pocketbase("http://127.0.0.1:8090");

    const bot = await pb.collection('bots').getFirstListItem(`username="${username}"`) as BaseBot;
    
    let messages = await pb.collection('messages').getFullList({
        sort: '-created',
        filter: `to="${username}"`
    }) as Message[];

    let system_prompt = "";

    system_prompt += new_line_wrap(format(logic_prompt, { name: bot.name }));
    system_prompt += new_line_wrap(new_response_format);
    system_prompt += new_line_wrap(bot.system_prompt);
    
    messages = [{role: Role.System, content: system_prompt} as Message, ...messages];

    const result_bot = {
        ...bot,
        messages
    } as Bot;

    return result_bot;
}
