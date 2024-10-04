<script lang="ts">
    import type { Message } from "$lib/message";
    import { Role } from "$lib/message";
    import IncomingMessage from "./IncomingMessage.svelte";
    import OutgoingMessage from "./OutgoingMessage.svelte";

    export let message: Message;
    export let is_typing: boolean = false;

    console.log("Message: " + message);
</script>

{#if message.role === Role.User}
<OutgoingMessage text={message.content} />
{:else if message.role == Role.Assistant}
<IncomingMessage {is_typing} text={message.content} />
{/if}
