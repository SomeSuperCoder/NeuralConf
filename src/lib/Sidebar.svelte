<script lang="ts">
    import ContantCard from "$lib/ContantCard.svelte";
</script>

<!-- Sidebar -->
<div class="w-1/4 bg-white border-r border-gray-300">
    <!-- Sidebar Header -->
    <header
        class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white"
    >
        <h1 class="text-2xl font-semibold">NeuralConf</h1>
    </header>

    <!-- Contact List -->
    {#each ["Allen", "Michel", "Owt", "James", "Oleg"] as contact}
        <ContantCard name={contact} type="llama2" />
    {/each}
</div>
