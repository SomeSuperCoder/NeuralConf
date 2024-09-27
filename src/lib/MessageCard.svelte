<script lang="ts">
    import type { Message } from "$lib/message";
    import { Role } from "$lib/message";
    import IncomingMessage from "./IncomingMessage.svelte";
    import OutgoingMessage from "./OutgoingMessage.svelte";

    export let message: Message;

    console.log("Message: " + message);
</script>

{#if message.role === Role.User}
<OutgoingMessage text={message.content} />
{:else if message.role == Role.Assistant}
<IncomingMessage text={message.content} />
{/if}
