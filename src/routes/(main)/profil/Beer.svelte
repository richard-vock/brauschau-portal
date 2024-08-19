<script lang="ts">
    import { enhance } from '$app/forms';
    import { Markdown } from 'svelte-exmarkdown';

    export let beer;
    export let onStartEdit;
</script>

<div class="flex items-start justify-between mb-2">
    <div>
        <h3 class="text-xl font-semibold text-slate-900">{beer.name}</h3>
        <p class="text-slate-600">{beer.style}</p>
    </div>
    <div class="text-slate-600 flex gap-2">
        <p>{beer.abv}%</p>
        <p>{beer.gravity}</p>
        <p>{beer.ibu} IBU</p>
    </div>
</div>

<div class="flex flex-col gap-4">
    <div>
        {#if beer.description}
            <div class="mt-2 text-slate-600 flex flex-col gap-2"><Markdown md={beer.description} /></div>
        {:else}
            <p class="mt-2 text-slate-600">Keine Beschreibung vorhanden.</p>
        {/if}

        {#if beer.recipe || beer.untappd }
            <div class="mt-4">
                {#if beer.recipe}
                    <a href={beer.recipe} class="mt-2 text-slate-600 underline">Rezept</a>
                {/if}

                {#if beer.untappd}
                    <a href={beer.untappd} class="mt-2 text-slate-600 underline">Untappd</a>
                {/if}
            </div>
        {/if}
    </div>
    <div class="flex gap-2 justify-end">
        <form action="/profil?/delete_beer" method="POST">
            <input type="hidden" name="beer_id" value={beer.id} />
            <button
                class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-red-700 hover:text-white lg:w-auto"
            >
                Löschen
            </button>
        </form>
        <button
            class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
            on:click={onStartEdit(beer.id)}
        >
            Bearbeiten
        </button>
    </div>
</div>
