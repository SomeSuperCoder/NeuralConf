<script lang="ts">
    // import Sidebar from "$lib/Sidebar.svelte";
    import ChatArea from "$lib/ChatArea.svelte";
    import { Role } from "$lib/message";
    import type { Message } from "$lib/message";
    import { get, writable } from 'svelte/store';
    import type { Writable } from "svelte/store";
    import { ask_ai, format_message } from "$lib/pipeline";
    import { load_bot } from "$lib/bot";
    import type { Bot } from "$lib/bot";

    let current_message = "";
    let query = writable("");
    let block_ask = false;
    let stop_talking = false;
    let container: Writable<HTMLDivElement | null> = writable(null);
    
    let bot: Bot;

    async function initializeBot() {
        bot = await load_bot("jack");
    };
    initializeBot();

    function scrollToBottom() {
        let tmpValue = get(container);

        if (tmpValue !== null) {
            console.log("Autoscroll triggered!");
            tmpValue.scrollTop = tmpValue.scrollHeight;
        }

        container.set(tmpValue);
    }

    async function ask() {
        console.log("Ask!");

        // Make sure two querys are not sent at the same time
        if (block_ask) {
            console.log("Block ask!");
            return;
        }
        block_ask = true;

        // Add the user's message
        bot.messages = [
            ...bot.messages,
            { role: Role.User, content: format_message("allen", get(query)) } as Message
        ];

        // Clear the input
        query.set("");

        // Add a visual indication that the AI is thinking
        current_message = `${bot.name} думает...`;

        // Make the users message visible and the typing pre typing animation too
        setTimeout(scrollToBottom, 100);

        // Generate the response
        let response = await ask_ai(bot.messages, bot.model);

        // Clear the visual indicator
        current_message = "";

        // Typing animation
        for await (const part of response) {
            console.log(part);
            current_message += part.message.content;
            scrollToBottom();

            if (stop_talking) {
                break;
            }
        }
        
        // Add the AI response to the chat history
        bot.messages = [
            ...bot.messages,
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
     {#if bot !== undefined}
    <ChatArea name="Чат NeuralConf" messages={bot.messages} current_message={current_message} ask_function={ask} query={query} auto_scroll={container}/>
    {/if}
</div>

<style>
    .thought {
        color: gray;
        font-style: italic;
    }
</style>