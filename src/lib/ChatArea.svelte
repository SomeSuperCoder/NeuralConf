<script lang="ts">
    import { Role, type Message } from "$lib/message";
    import type { Writable } from "svelte/store";
    import MessageCard from "./MessageCard.svelte";
    
    export let name: string;
    export let messages: Message[];
    export let current_message: string;
    export let ask_function: any;
    export let query: Writable<string>;
    export let auto_scroll: Writable<HTMLDivElement | null>;
    export let is_typing: boolean;
    
    let current_message_object;
    $: current_message_object = {role: Role.Assistant, content: current_message} as Message;
</script>

<!-- Main Chat Area -->
<div class="flex-1">
    <!-- Chat Header -->
    <header class="bg-white p-4 text-gray-700">
        <h1 class="text-2xl font-semibold">{name}</h1>
    </header>

    <!-- Chat Messages -->
    <div bind:this={$auto_scroll} class="h-screen overflow-y-auto p-4 pb-36">
        {#each messages as message}
        <MessageCard {message} />
        {/each}
        {#if is_typing}
        <MessageCard {is_typing} message={current_message_object} />
        {/if}
    </div>

    <!-- Chat Input -->
    <footer
        class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full"
    >
        <div class="flex items-center">
            <input
                type="text"
                placeholder="Введите сообщение..."
                class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                bind:value={$query}
            />
            <button class="bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-300 text-white px-4 py-2 rounded-md ml-2" on:click={ask_function}
                >Отправить</button
            >
        </div>
    </footer>
</div>
