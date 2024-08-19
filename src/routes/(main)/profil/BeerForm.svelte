<script lang="ts">
    import { enhance } from '$app/forms';

    export let edit = -1;
    export let form;
    export let handleCancel;
    export let handleSuccess = () => {};

    function formAction() {
        if (edit >= 0) {
            return '/profil?/edit_beer';
        }

        return '/profil?/create_beer';
    }
</script>

<form action={ formAction() } method="POST" use:enhance={handleSuccess}>
    {#if edit >= 0}
        <input type="hidden" name="beer_id" value={ edit } />
    {/if}

    <div class="mt-8 grid gap-3 md:grid-cols-6">
        <div class="md:col-span-3">
            <label for="beername" class="block text-sm font-medium text-slate-700">Name des Bieres</label>
            <input name="beername" class="w-full" type="text" value={form?.beername ?? ''} placeholder="Mein Wiener Lager" />
        </div>
        <div class="md:col-span-3">
            <label for="beerstyle" class="block text-sm font-medium text-slate-700">Bierstil</label>
            <input name="beerstyle" class="w-full" type="text" value={form?.beerstyle ?? ''} placeholder="Wiener Lager" />
        </div>
        <div class="md:col-span-2">
            <label for="beerabv" class="block text-sm font-medium text-slate-700">ABV (Alkoholgehalt in vol%)</label>
            <input name="beerabv" class="w-full" type="text" placeholder="5,3" value={form?.beerabv ?? ''} />
        </div>
        <div class="md:col-span-2">
            <label for="beergravity" class="block text-sm font-medium text-slate-700">Stammwürze (mit Einheit)</label>
            <input name="beergravity" class="w-full" type="text" placeholder="12°P" value={form?.beergravity ?? ''} />
        </div>
        <div class="md:col-span-2">
            <label for="beeribu" class="block text-sm font-medium text-slate-700">IBU (optional)</label>
            <input name="beeribu" class="w-full" type="text" placeholder="25" value={form?.beeribu ?? ''} />
        </div>
        <div class="md:col-span-6">
            <label for="beerdesc" class="block text-sm font-medium text-slate-700">Kurzbeschreibung (optional)</label>
            <textarea name="beerdesc" class="w-full" rows="4" type="text" value={form?.beerdesc ?? ''} placeholder="Kurzbeschreibung des Bieres" />
        </div>
        <div class="md:col-span-3">
            <label for="beerrecipe" class="block text-sm font-medium text-slate-700">Rezeptlink (optional)</label>
            <input name="beerrecipe" class="w-full" type="text" placeholder="https://share.brewfather.app/vjK0GBZJKxRNsf" value={form?.beerrecipe ?? ''} />
        </div>
        <div class="md:col-span-3">
            <label for="beeruntappd" class="block text-sm font-medium text-slate-700">Untappd Link (optional)</label>
            <input name="beeruntappd" class="w-full" type="text" placeholder="https://untappd.com/b/emperor-norton-s-brewery-andy/5583944" value={form?.beeruntappd ?? ''} />
        </div>
        <div class="md:col-span-6 flex gap-3 w-full justify-end">
            {#if edit >= 0}
                <button
                    class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
                    on:click={handleCancel}
                >
                    <span class="text-nowrap">Änderungen verwerfen</span>
                </button>
            {/if}
            <button
                class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
            >
                {#if edit >= 0}
                    <span class="text-nowrap">Änderungen speichern</span>
                {:else}
                    <span class="text-nowrap">Bier speichern</span>
                {/if}
            </button>
        </div>
    </div>
</form>
