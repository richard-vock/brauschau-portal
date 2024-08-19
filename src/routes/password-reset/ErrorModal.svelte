<script lang="ts">
    import { enhance } from '$app/forms';

    export let msg = "";
    export let success = false;
    export let onClose = () => {};
</script>

<!-- ErrorModal -->

<div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="relative bg-white p-8 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold text-slate-900">
            {#if success}
                Erfolg
            {:else}
                Fehler
            {/if}
        </h2>
        <p class="mt-4 text-slate-600">{msg}</p>
        <button
            class="mt-8 inline-flex items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
            on:click={onClose}
        >
            Schließen
        </button>
    </div>
</div>
