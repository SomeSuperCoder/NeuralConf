<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import { parseResponse, type ParseResult } from "./parser";
    import Loader from './Loader.svelte';
    
    export let text: string;
    export let is_typing: boolean;

    let parsed_text: ParseResult;

    $: parsed_text = parseResponse(text);
    $: console.log(is_typing);
</script>

<!-- Incoming Message -->
<div class="flex mb-4 cursor-pointer">
    <div
        class="w-9 h-9 rounded-full flex items-center justify-center mr-2"
    >
        <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=AI&font=Lato"
            alt="User Avatar"
            class="w-8 h-8 rounded-full"
        />
    </div>
    <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3 text-gray-700">
        <p>
            {#if parsed_text.thought}
                <details>
                    <summary><b>Мысли ИИ</b></summary>

                    <em>
                        <SvelteMarkdown source={parsed_text.thought}/>
                    </em>
                </details>
            {/if}
            
            {#if parsed_text.response}
                <SvelteMarkdown source={parsed_text.response}/>
            {/if}

            {#if is_typing}
            <Loader />
            {/if}
        </p>
    </div>
</div>
