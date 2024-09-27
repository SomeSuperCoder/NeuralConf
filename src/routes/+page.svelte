<script lang="ts">
    import Sidebar from "$lib/Sidebar.svelte";
    import ChatArea from "$lib/ChatArea.svelte";
    import { Role } from "$lib/message";
    import type { Message } from "$lib/message";
    import ollama from "ollama";
    import { get, writable } from 'svelte/store';

    let chat_name = "Robert";
    let current_message = "";
    let query = writable("");
    let block_ask = false;
    let stop_talking = false;

    let messages: Message[] = [
        {role: Role.System, content: "**You are a human!** Your job is to immitate the behavior of a Human Being. Speak simple and natural, like a person. Don't say a lot of words, try to speak succinctly, shortly, and direct. Your name is Robert."}
    ];

    async function ask() {
        console.log("Ask!");

        // Make sure two querys are not sent at the same time
        if (block_ask) {
            console.log("Block ask!");
            return;
        }
        block_ask = true;

        // Add the user's message
        messages = [
            ...messages,
            { role: Role.User, content: get(query) } as Message
        ];

        // Clear the input
        query.set("");

        // Add a visual indication that the AI is thinking
        current_message = `${chat_name} думает...`;

        // Generate the response
        let response = await ollama.chat({
            model: "llama3.1",
            messages,
            stream: true,
            keep_alive: 10,
        });

        // Clear the visual indicator
        current_message = "";

        // Typing animation
        for await (const part of response) {
            console.log(part);
            current_message += part.message.content;

            if (stop_talking) {
                break;
            }
        }
        
        // Add the AI response to the chat history
        messages = [
            ...messages,
            { role: Role.Assistant, content: current_message } as Message,
        ];

        // Clear the typing animation
        current_message = "";
        // Remove the message block
        block_ask = false;
    }
</script>

<div class="flex h-screen overflow-hidden">
    <!-- <Sidebar /> -->
    <ChatArea name={chat_name} messages={messages} current_message={current_message} ask_function={ask} query={query}/>
</div>
