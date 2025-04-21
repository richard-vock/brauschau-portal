<script lang="ts">
    import { enhance } from '$app/forms';

    export let data;
    export let form;
</script>

<section class="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
    <!-- Heading Container -->
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
            class="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none"
            >
            <h1
                class="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0 mb-10"
                >
                Admin-Bereich
            </h1>
        </div>
    </div>

    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
            class="relative mx-auto max-w-lg divide-x-0 divide-y divide-gray-secondary-400/75 border border-gray-secondary-400/60 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none lg:divide-x lg:divide-y-0 mb-10"
            >
            <div class="bg-gray-secondary-50 p-8 sm:p-10">
                <h3 class="text-lg font-semibold text-slate-900 mb-10">Benutzer</h3>

                <div class="w-full grid grid-cols-3 xl:grid-cols-6">
                    <div class="font-semibold xl:border-b-[1px] border-black p-4">Stand</div>
                    <div class="font-semibold xl:border-b-[1px] border-black p-4">Name</div>
                    <div class="font-semibold xl:border-b-[1px] border-black p-4">E-Mail</div>
                    <div class="font-semibold border-b-[1px] border-black p-4">Gruppe</div>
                    <div class="font-semibold border-b-[1px] border-black p-4">Verifiziert</div>
                    <div class="font-semibold border-b-[1px] border-black p-4"></div>
                    {#each data.users as user}
                        <div class="xl:border-b-[1px] border-black p-4">{ user.name || "(nicht festgelegt)" }</div>
                        <div class="xl:border-b-[1px] border-black p-4" style:word-break="break-all">{ user.email }</div>
                        <div class="xl:border-b-[1px] border-black p-4">{ user.group || '' }</div>
                        <div class="border-b-[1px] border-black p-4">{ user.verified ? "Ja" : "Nein" }</div>
                        <div class="flex flex-row items-center border-b-[1px] border-black">
                            <form action="?/assign" method="POST">
                                <input type="hidden" name="userid" value={user.id} />
                                <input type="text" name="stand" value={user.place} style="width: 50px; height: 32px" />
                                <button
                                    class="group items-center justify-center bg-slate-700 px-3 py-1 text-base font-small text-white duration-150 ease-in-out hover:bg-slate-900"
                                    type="submit"
                                >
                                    Speichern
                                </button>
                            </form>
                        </div>
                        <div class="border-b-[1px] border-black p-4">
                            <form action="?/delete" method="POST">
                                <input type="hidden" name="userid" value={user.id} />
                                <button
                                    class="group items-center justify-center bg-slate-700 px-3 py-1 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900"
                                    type="submit"
                                >
                                    Löschen
                                </button>
                            </form>
                        </div>
                    {/each}
                    <div class="font-semibold"></div>
                    <div class="font-semibold"></div>
                    <div class="font-semibold"></div>
                    <div class="font-semibold"></div>
                    <div class="font-semibold"></div>
                    <div class="font-semibold">Insgesamt:</div>
                    <div class="font-semibold">{ data.total.users }</div>
                    <div class="font-semibold">Extern:</div>
                    <div class="font-semibold">{ data.total.external }</div>
                    <div class="font-semibold"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
            class="relative mx-auto max-w-lg divide-x-0 divide-y divide-gray-secondary-400/75 border border-gray-secondary-400/60 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none lg:divide-x lg:divide-y-0 mb-10"
            >
            <div class="bg-gray-secondary-50 p-8 sm:p-10">
                <h3 class="text-lg font-semibold text-slate-900 mb-10">Biere</h3>

                <div class="w-full grid grid-cols-3 gap-4">
                    <div class="font-semibold">Brauer</div>
                    <div class="font-semibold">E-Mail</div>
                    <div class="font-semibold">Anzahl Biere</div>
                    {#each data.beerCounts as counts}
                        <div>{ counts.brewer }</div>
                        <div>{ counts.email }</div>
                        <div>{ counts.count }</div>
                    {/each}
                        <div>&nbsp;</div>
                        <div>&nbsp;</div>
                        <div>{ data.beerTotal }</div>
                </div>

                <div>
                    <a href="/beers">
                        <button
                            class="group items-center justify-center bg-slate-700 px-3 py-1 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900"
                            type="submit"
                        >
                            CSV-Export
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
            class="relative mx-auto max-w-lg divide-x-0 divide-y divide-gray-secondary-400/75 border border-gray-secondary-400/60 sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none lg:divide-x lg:divide-y-0 mb-10"
            >
            <div class="bg-gray-secondary-50 p-8 sm:p-10">
                <h3 class="text-lg font-semibold text-slate-900 mb-10">Einladungslinks</h3>

                <div class="w-full">
                    {#each data.invites as invite}
                        <div>https://bonner-brauschau.de/register?invite={ invite }</div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
