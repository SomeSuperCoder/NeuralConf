<script lang="ts">
    export let name: string;
    export let type: string;
</script>

<div
    class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
>
    <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
        <img
            src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726358400&semt=ais_hybrid"
            alt="User Avatar"
            class="w-12 h-12 rounded-full"
        />
    </div>
    <div class="flex-1">
        <h2 class="text-lg font-semibold">{name}</h2>
        <p class="text-gray-600">{type}</p>
    </div>
</div>
