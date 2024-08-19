<script lang="ts">
    import { onMount } from 'svelte';
    import { enhance } from '$app/forms';

    import Beer from './Beer.svelte';
    import BeerForm from './BeerForm.svelte';
    import ErrorModal from './ErrorModal.svelte';

    export let data;
    export let form;

    let edit = -1;
    function cancelEdit() {
        edit = -1;
        form = null;
    }
    function startEdit(id) {
        edit = id;
    }
    function handleEditSuccess(result) {
        return async ({ result, update }) => {
            if (result?.data?.success) {
                edit = -1;
            }
            update();
        };
    }
    function onModalClose() {
        form.modalClosed = true;
    }

    function toFormData(beer) {
        return {
            beername: beer.name,
            beerstyle: beer.style,
            beerabv: beer.abv,
            beergravity: beer.gravity,
            beeribu: beer.ibu,
            beerdesc: beer.description,
            beerrecipe: beer.recipe,
            beeruntappd: beer.untappd
        };
    }

    let loading = true;
    onMount(() => {
        loading = false;
    });
</script>


<section class="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
    <!-- Heading Container -->
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div
            class="mx-auto flex max-w-lg flex-col items-center sm:max-w-xl md:max-w-2xl lg:mx-0 lg:max-w-none"
        >
            <h1
                class="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug md:mx-auto md:max-w-4xl xl:mx-0"
            >
                Dein Profil
            </h1>
            <p
                class="mx-auto mt-5 max-w text-center text-lg leading-relaxed text-slate-700 sm:mt-6"
            >
                Hier kannst und solltest Du alle Infos eingeben die wir brauchen um Dich und Deine Biere
                zu bewerben.
            </p>
        </div>
    </div>

        <div class="relative pt-16">
            <!-- Background -->
            <div class="absolute inset-0 flex flex-col" aria-hidden="true">
                <div class="flex-1 bg-amber-100"></div>
                <div class="w-full flex-1 bg-vanilla"></div>
                <div class="flex-1 bg-vanilla"></div>
            </div>

            <!-- Contact Cards Container -->
            <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <!-- Contact Cards -->
                <div
                    class="relative mx-auto grid max-w-lg gap-x-6 gap-y-8 sm:max-w-xl md:max-w-2xl md:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 lg:items-start"
                >
                    <!-- Card 1 -->
                    <div
                        class="flex flex-col border border-gray-secondary-400/60 bg-gray-secondary-50 p-8 lg:px-12 lg:py-10"
                    >
                        <div class="flex-1">
                            <div class="flex w-full pb-6 lg:justify-end lg:pb-4">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="81"
                                    height="77"
                                    viewBox="0 0 512 512"
                                    class="h-12 w-12 lg:h-16 lg:w-16"
                                >
                                    <path class="st0" fill="#334155" d="M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087
                                        c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512
                                        c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"/>
                                    <path class="st0" fill="#334155" d="M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0
                                        c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"/>
                                </svg>
                            </div>
                            <h2 class="text-2xl font-semibold text-slate-900 lg:text-3xl">
                                Dein Name
                            </h2>
                            <p class="mt-3 max-w-sm leading-relaxed text-slate-600">
                                Gib hier bitte deinen Brauer-/Brauereinamen an <b>wie er im Flyer stehen soll</b>,
                                selbst wenn Du als Teil eines Vereins oder einer Braugemeinschaft teilnimmst.
                            </p>
                        </div>

                        <div class="mt-8">
                            <form action="?/save_name" method="POST" use:enhance>
                                {#if data.form?.empty}
                                    <p class="alert">Name darf nicht leer sein.</p>
                                {/if}
                                <input name="name" type="text" bind:value={data.user.name}>
                                <button
                                    class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
                                    disabled={data.user.name === ""}
                                >
                                    Speichern
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Card 2 -->
                    <div
                        class="flex flex-col border border-gray-secondary-400/60 bg-gray-secondary-50 p-8 lg:px-12 lg:py-10"
                    >
                        <div class="flex-1">
                            <div class="flex w-full pb-6 lg:justify-end lg:pb-4">
                                <svg
                                    fill="#334155"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="81"
                                    height="77"
                                    viewBox="924 565.952 200 200"
                                    class="h-12 w-12 lg:h-16 lg:w-16"
                                >
                                    <path d="M984.585,626.893c0,14-9.609,25.348-21.461,25.348s-21.459-11.348-21.459-25.348c0-13.999,9.607-25.345,21.459-25.345
                                        S984.585,612.895,984.585,626.893z"/>
                                    <path d="M987.586,671.591c1.549-0.945,3.265-1.56,5.041-1.854c-3.606-5.088-6.161-10.546-7.637-17.078
                                        c-0.404-2.387-3.672-2.667-6.102-0.687c-4.545,3.706-9.849,6.186-15.764,6.186c-6.03,0-11.577-2.399-16.025-6.414
                                        c-1.419-1.283-3.51-1.476-5.142-0.479c-8.444,5.157-14.835,13.344-17.623,23.064c-0.748,2.607-0.223,5.421,1.411,7.59
                                        c1.637,2.166,4.192,3.443,6.906,3.443h38.669C975.947,680.023,981.41,675.362,987.586,671.591z"/>
                                    <path d="M1063.414,626.893c0,14,9.61,25.348,21.462,25.348s21.46-11.348,21.46-25.348c0-13.999-9.608-25.345-21.46-25.345
                                        S1063.414,612.895,1063.414,626.893z"/>
                                    <path d="M1060.413,671.591c-1.549-0.945-3.264-1.56-5.04-1.854c3.605-5.088,6.16-10.546,7.637-17.078
                                        c0.404-2.387,3.674-2.667,6.103-0.687c4.545,3.706,9.849,6.186,15.764,6.186c6.03,0,11.576-2.399,16.024-6.414
                                        c1.42-1.283,3.51-1.476,5.143-0.479c8.443,5.157,14.834,13.344,17.623,23.064c0.748,2.608,0.222,5.421-1.412,7.59
                                        c-1.635,2.166-4.192,3.443-6.906,3.443h-38.668C1072.052,680.023,1066.59,675.362,1060.413,671.591z"/>
                                    <path d="M1082.474,713.402c-4.198-14.654-13.72-27.044-26.327-34.991c-2.487-1.567-5.715-1.313-7.921,0.631
                                        c-6.765,5.958-15.136,9.506-24.226,9.506c-9.268,0-17.791-3.686-24.626-9.856c-2.181-1.97-5.393-2.267-7.901-0.734
                                        c-12.977,7.925-22.8,20.505-27.082,35.445c-1.151,4.008-0.344,8.329,2.166,11.663c2.516,3.329,6.443,5.29,10.615,5.29h92.521
                                        c4.173,0,8.103-1.954,10.618-5.29C1082.822,721.731,1083.625,717.414,1082.474,713.402z"/>
                                    <path d="M1056.98,640.499c0,21.512-14.767,38.955-32.98,38.955s-32.979-17.442-32.979-38.955
                                        c0-21.515,14.765-38.951,32.979-38.951S1056.98,618.984,1056.98,640.499z"/>
                                </svg>
                            </div>
                            <h2 class="text-2xl font-semibold text-slate-900 lg:text-3xl">
                                Deine Gruppe
                            </h2>
                            {#if !data.user.group}
                                <p class="mt-3 max-w-sm leading-relaxed text-slate-600">
                                    Du kannst <b>optional</b> als Teil einer Gruppe wie z.B. eines Vereins teilnehmen.
                                </p>
                                <p class="mt-3 max-w-sm leading-relaxed text-slate-600">
                                    Dazu kannst Du entweder selber eine gründen oder mit Hilfe eines Einladungscodes
                                    einer bestehenden Gruppe beitreten.
                                </p>
                            {:else}
                                <p class="mt-3 max-w-sm leading-relaxed text-slate-600">
                                    Du bist der Gruppe <strong>{data.form?.groupname}</strong> zugeordnet.
                                </p>

                                <p class="mt-3 max-w-sm leading-relaxed text-slate-600">
                                    Andere Brauer können der Gruppe beitreten, indem sie den folgenden Code eingeben:
                                </p>
                                <pre class="mt-4 mb-4">{data.user.group}</pre>
                                <form action="?/leave_group" method="POST" use:enhance>
                                    <button
                                        class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
                                    >
                                        Gruppe verlassen
                                    </button>
                                </form>
                            {/if}
                        </div>

                        {#if !data.user.group}
                            <div class="mt-8 mb-4">
                                <form action="?/join_group" method="POST" use:enhance>
                                    {#if data.form?.empty}
                                        <p class="alert">Gruppen-Code darf nicht leer sein.</p>
                                    {/if}
                                    {#if data.form?.invalid}
                                        <p class="alert">Ungültiger Gruppen-Code.</p>
                                    {/if}
                                    <input name="code" type="text" placeholder="Einladungscode" value={data.form?.code ?? ''}>
                                    <button
                                        class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
                                    >
                                        Beitreten
                                    </button>
                                </form>
                            </div>

                            <p> oder  </p>

                            <div class="mt-4">
                                <form action="?/create_group" method="POST" use:enhance>
                                    {#if data.form?.empty}
                                        <p class="alert">Gruppenname darf nicht leer sein.</p>
                                    {/if}
                                    <input class="w-full" name="groupname" type="text" placeholder="Gruppenname" value={data.form?.groupname ?? ''} />
                                    <textarea rows="5" name="groupdesc" placeholder="Beschreibung der Gruppe" value={data.form?.groupdesc ?? ''} class="mt-3 w-full"/>
                                    <br />
                                    <button
                                        class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white lg:w-auto"
                                    >
                                        Gruppe erstellen
                                    </button>
                                </form>
                            </div>
                        {/if}
                    </div>
                    <div
                        class="flex flex-col col-span-2 border border-gray-secondary-400/60 bg-gray-secondary-50 p-8 lg:px-12 lg:py-10"
                    >
                        <div class="flex-1">
                            <div class="flex w-full pb-6 lg:justify-end lg:pb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="77"
                                    height="81"
                                    viewBox="0 0 491.696 491.696"
                                    class="h-12 w-12 lg:h-16 lg:w-16"
                                    fill="#334155"
                                >
                                    <path d="M396.86,189.696h-51.816v-8.471c16.876-12.499,27.84-32.548,27.84-55.113c0-33.43-24.055-61.349-55.764-67.356
                                        C307.903,24.725,276.851,0.001,240.165,0c-20.304,0.001-39.79,7.852-54.44,21.513c-5.231-1.368-10.64-2.072-16.077-2.072
                                        c-25.849,0-48.398,15.683-58.222,38.235c-1.34-0.079-2.687-0.118-4.037-0.118c-37.8,0-68.553,30.753-68.553,68.553
                                        c0,20.813,9.335,39.475,24.024,52.058v283.526c0,16.5,13.5,30,30,30h222.184c16.5,0,30-13.5,30-30v-44h51.816
                                        c30.878,0,56-25.122,56-56v-116C452.86,214.817,427.738,189.696,396.86,189.696z M304.331,156.665l-175.536,0v61.051
                                        c0,10.493-8.507,19-19,19c-10.493,0-19-8.507-19-19v-65.971c-8.393-5.452-13.959-14.902-13.959-25.634
                                        c0-16.847,13.706-30.553,30.553-30.553c3.792,0,7.503,0.694,11.032,2.062c5.636,2.185,11.976,1.559,17.075-1.689
                                        c5.099-3.248,8.348-8.728,8.751-14.759c0.889-13.307,12.046-23.731,25.401-23.731c4.356,0,8.485,1.06,12.27,3.149
                                        c8.375,4.622,18.88,2.297,24.523-5.427C214.409,44.256,226.701,38,240.165,38c22.277,0,40.586,17.408,41.682,39.631
                                        c0.251,5.1,2.545,9.885,6.365,13.274c3.819,3.39,8.842,5.104,13.936,4.744c0.884-0.062,1.578-0.09,2.183-0.09
                                        c16.847,0,30.553,13.706,30.553,30.553S321.178,156.665,304.331,156.665z M400.86,361.696c0,2.131-1.869,4-4,4h-51.816v-124h51.816
                                        c2.131,0,4,1.869,4,4V361.696z"
                                    />
                                </svg>
                            </div>
                            <h2 class="text-2xl font-semibold text-slate-900 lg:text-3xl">
                                Deine Biere
                            </h2>
                            <p class="mt-3 max-w leading-relaxed text-slate-600">
                                Hier kannst Du Deine Biere beschreiben. Die Kurzbeschreibung und Links sind optional und landen vorraussichtlich nicht im Prospekt - dafür aber auf der Webseite / in der App.
                            </p>
                        </div>

                        {#if form && !form.success && !form.modalClosed}
                            <ErrorModal msg={form.msg} onClose={onModalClose} />
                        {/if}

                        {#if loading}
                            <div class="relative pt-16 flex flex-col items-center">
                                <span class="loader"></span>
                            </div>
                        {:else}
                            <BeerForm edit={-1} form={edit < 0 ? form : null} handleCancel={cancelEdit} />

                            {#each data.beers as beer}
                                <hr class="mt-8 mb-8 w-full border-slate-500" />

                                {#if edit === beer.id}
                                    <BeerForm
                                        form={toFormData(beer)}
                                        edit={edit}
                                        handleCancel={cancelEdit}
                                        handleSuccess={handleEditSuccess}
                                    />
                                {:else}
                                    <Beer beer={beer} onStartEdit={startEdit} />
                                {/if}
                            {/each}
                        {/if}
                    </div>
                </div>
            </div>
        </div>

    <div class="h-16 bg-vanilla sm:h-24"></div>
</section>

<section class="relative overflow-hidden bg-purple-light py-16 sm:py-20">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h1
            class="text-center text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl sm:leading-snug"
        >
            Fragen?
        </h1>
        <p
            class="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700"
        >
            Schick uns eine E-Mail mit Deinen Fragen an
        </p>
        <div class="flex w-full justify-center mt-5">
            <a href="mailto:info@bonner-brauschau.de"><b>info@bonner-brauschau.de</b></a>
        </div>
        <p
            class="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-slate-700"
        >
            und wir melden uns bei Dir!
        </p>
    </div>
</section>

<section class="overflow-hidden bg-amber-100 py-20 md:py-28 lg:py-32">
    <!-- Container -->
    <div
        class="relative mx-auto max-w-screen-xl items-center px-4 sm:px-6 md:grid md:grid-cols-12 md:gap-12 lg:px-8"
    >
        <!-- Content -->
        <div class="mx-auto max-w-lg md:col-span-6 md:mx-0 lg:pr-12">
            <h2
                class="text-center text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl sm:leading-tight md:text-left"
            >
                Danke dass Du Dir die Zeit genommen hast!
            </h2>
            <p
                class="mt-6 text-center text-[17px] leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed md:text-left"
            >
                Große Diversität bei Brauer*innen und Bieren ist das Hauptziel unserer
                und eigentlich jeder Brauschau.
            </p>
            <p
                class="mt-6 text-center text-[17px] leading-relaxed text-slate-700 sm:text-lg sm:leading-relaxed md:text-left"
            >
                Durch diese Angaben hilfst Du nicht nur
                uns diese Vielfalt zu kommunizieren, sondern auch den Gästen Dich und Deine Biere zu finden.
            </p>
        </div>

        <!-- Images -->
        <div class="col-span-6 hidden grid-cols-12 md:grid">
            <!-- <img -->
            <!--     src="images/stock/cta-image-02.jpg" -->
            <!--     class="col-span-5 my-auto ml-px h-auto w-full" -->
            <!-- /> -->
            <!-- <img -->
            <!--     src="images/stock/cta-image-01.jpg" -->
            <!--     class="col-span-7 h-auto w-full" -->
            <!-- /> -->
        </div>
    </div>
</section>

<style>
    .loader {
        width: 48px;
        height: 48px;
        border: 5px solid #FFF;
        border-bottom-color: rgb(51, 65, 85);
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
