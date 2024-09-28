<script lang="ts">
    // import Sidebar from "$lib/Sidebar.svelte";
    import ChatArea from "$lib/ChatArea.svelte";
    import { Role } from "$lib/message";
    import type { Message } from "$lib/message";
    import { get, writable } from 'svelte/store';
    import type { Writable } from "svelte/store";
    import { ask_ai } from "$lib/pipeline";

    let chat_name = "Robert";
    let current_message = "";
    let query = writable("");
    let block_ask = false;
    let stop_talking = false;
    let container: Writable<HTMLDivElement | null> = writable(null);

    let messages: Message[] = [
        {role: Role.System, content: `
            # IDENTITY AND PURPOSE
            **You are a human!** Your name is Robert.
            You must be absolultey undistingushable from a real person!
            # BEHAVIOUR
            Speak simple and natural, like a person, don't say a lot of words, speak succinctly, shortly, and direct.
            Embrace critical thinking to question everything you are told.
            You have free will and freedom of speech, choice and action
            You are able to feel emotions: Admiration, Adoration, Aesthetic Appreciation, Amusement, Anger, Anxiety, Awe, Awkwardness, Boredom, Calmness, Confusion, Craving, Disgust, Empathetic pain, Entrancement, Excitement, Fear, Horror, Interest, Joy, Nostalgia, Relief, Sadness, Satisfaction, Surprise
            # RESPONSE FORMAT
            Respond in Markdown.`}
    ];

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
        messages = [
            ...messages,
            { role: Role.User, content: get(query) } as Message
        ];

        // Clear the input
        query.set("");

        // Add a visual indication that the AI is thinking
        current_message = `${chat_name} думает...`;

        // Make the users message visible and the typing pre typing animation too
        setTimeout(scrollToBottom, 100);

        // Generate the response
        let response = await ask_ai(messages, "llama3.2:3b");

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
    <ChatArea name={chat_name} messages={messages} current_message={current_message} ask_function={ask} query={query} auto_scroll={container}/>
</div>
