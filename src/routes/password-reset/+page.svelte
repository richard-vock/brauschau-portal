<script lang="ts">
    import { enhance } from '$app/forms';

    import '../../app.css';

    import ErrorModal from './ErrorModal.svelte';

    export let data;
    export let form;

    function onFormModalClose() {
        form.modalClosed = true;
    }
    function onDataModalClose() {
        data.modalClosed = true;
    }

    let key = data?.key ?? form?.key;
    let user = data?.user ?? form?.user;
</script>

{#if form && form.msg && !form.modalClosed}
    <ErrorModal success={form.success} msg={form.msg} onClose={onFormModalClose} />
{/if}
{#if data && data.msg && !data.modalClosed}
    <ErrorModal success={data.success} msg={data.msg} onClose={onDataModalClose} />
{/if}

<section
    class="relative flex min-h-screen items-center justify-center bg-amber-100 py-16 sm:py-20"
>
    <!-- Go back home button -->
    <a
        href="/"
        class="group absolute right-8 top-8 hidden cursor-pointer items-center justify-center border border-gray-secondary-400/60 bg-gray-secondary-50 p-2 transition duration-150 ease-in-out hover:bg-vanilla focus:outline-none sm:flex lg:right-12 lg:top-12"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 text-slate-800"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
    </svg>
    </a>

    <!-- Container -->
    <div class="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto flex max-w-lg flex-col items-center">
            <!-- Logo -->
            <svg
                height="70"
                viewBox="0 0 57.296295 141.62672"
                version="1.1"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg"
            >
                <defs id="defs1" />
                <g id="layer1" transform="translate(-76.729716,-19.337579)">
                    <path
                        style="fill:#000000"
                        d="m 99.291347,139.94312 0.04556,-21.02125 6.140533,-0.0472 6.14054,-0.0472 v 4.37244 c 0,2.40485 0.0504,4.62457 0.11205,4.93271 l 0.11206,0.56027 h 10.11073 10.11073 l -0.0483,3.89947 -0.0483,3.89946 -3.27197,-0.0686 -3.27196,-0.0686 v 5.04376 5.04377 h 3.31678 3.31679 v 4.03393 4.03393 h -10.21931 -10.21929 v 3.22715 3.22714 h -6.18611 -6.186095 z m 18.138763,4.77672 c 0.24398,-0.0936 0.2836,-0.55694 0.2836,-3.31679 v -3.20796 h -2.95822 -2.95821 v 3.31679 3.31678 h 2.67462 c 1.47104,0 2.80224,-0.049 2.95821,-0.10882 z m -16.25552,-29.7864 -1.927324,-0.0576 v -2.23501 -2.23501 h 6.185354 6.18537 v 2.33072 2.33071 l -4.25804,-0.0381 c -2.34192,-0.0209 -5.12533,-0.064 -6.18536,-0.0957 z m -1.927324,-14.56765 v -6.095708 h 6.185354 6.18537 v 6.095708 6.09572 h -6.18537 -6.185354 z m 2.599644,-10.032389 c -3.151893,-0.09 -3.448318,-0.12713 -3.967005,-0.49712 -1.157227,-0.82545 -1.643629,-2.83847 -0.993689,-4.11246 0.39708,-0.77834 1.393781,-1.748768 1.990698,-1.938222 0.360869,-0.114536 0.370352,-0.228895 0.370352,-4.466433 V 74.970278 L 97.921589,74.682595 C 96.168766,74.302218 92.912307,73.008432 90.923837,71.9024 86.112061,69.225979 82.148428,65.07031 79.636513,60.068206 c -2.143793,-4.269043 -3.24939,-9.782664 -2.812507,-14.026 0.482521,-4.686605 1.279569,-7.613965 2.953312,-10.846788 1.629144,-3.146679 2.873919,-4.856345 5.292704,-7.269393 4.153454,-4.143603 8.632385,-6.611187 14.527176,-8.003481 2.327702,-0.549782 6.914882,-0.757096 9.427652,-0.426077 6.05524,0.797689 11.4427,3.418314 15.96517,7.765958 3.16765,3.045203 5.16272,5.921228 6.87109,9.905136 3.04663,7.104744 2.86989,15.371382 -0.48106,22.500364 -1.06612,2.268127 -3.13906,5.261357 -4.9243,7.110475 -4.01163,4.155164 -8.62749,6.842903 -13.98615,8.14391 l -0.85161,0.206758 v 4.277931 4.27793 l 0.70676,0.360561 c 0.92751,0.473184 1.56474,1.334971 1.8269,2.470731 0.18154,0.78645 0.16752,1.03741 -0.0966,1.72893 -0.36741,0.96205 -1.27184,1.80986 -2.20808,2.06986 -0.68577,0.19044 -3.77457,0.19612 -10.00009,0.0184 z m 7.88858,-24.566662 c 6.97344,-1.797442 11.76169,-6.360048 13.83243,-13.180602 0.45143,-1.48691 0.49054,-1.85986 0.49827,-4.751073 0.01,-3.727062 -0.27564,-5.076483 -1.69392,-8.003678 -3.03612,-6.266246 -9.13456,-10.433804 -15.97073,-10.914088 -7.066477,-0.496464 -14.36916,3.823963 -17.733185,10.491335 -2.320559,4.599262 -2.657609,10.281839 -0.882618,14.880719 2.371298,6.143873 8.201873,10.810345 14.778313,11.827753 1.7006,0.263092 5.5143,0.07677 7.17144,-0.350366 z"
                        id="path1"
                        />
                </g>
            </svg>

            <h1 class="mt-10 text-center text-4xl font-semibold text-slate-900">
                Password zurücksetzen
            </h1>

            {#if key && user}
                <div class="mt-10 w-full">
                    <form action="?/update" method="POST">
                        <input type="hidden" name="key" value={key} />
                        <input type="hidden" name="user" value={user} />
                        <div class="mt-7">
                            <label
                                for="password"
                                class="text-base font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <div class="relative mt-1.5">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required
                                    placeholder="Password"
                                    class="block w-full appearance-none border border-gray-secondary-400/60 bg-gray-secondary-50 py-2.5 pl-12 pr-8 text-slate-800 placeholder-slate-500/75 outline-none duration-150 hover:bg-vanilla focus:border-gray-secondary-200 focus:bg-vanilla focus:outline-none focus:ring-gray-secondary-200"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div class="mt-7">
                            <label
                                for="password-repeat"
                                class="text-base font-medium text-slate-700"
                            >
                                Password (wiederholen)
                            </label>

                            <div class="relative mt-1.5">
                                <input
                                    id="password2"
                                    name="password-repeat"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    class="block w-full appearance-none border border-gray-secondary-400/60 bg-gray-secondary-50 py-2.5 pl-12 pr-8 text-slate-800 placeholder-slate-500/75 outline-none duration-150 hover:bg-vanilla focus:border-gray-secondary-200 focus:bg-vanilla focus:outline-none focus:ring-gray-secondary-200"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <button
                            class="group mt-8 inline-flex w-full items-center justify-center bg-slate-700 px-6 py-3 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900 sm:mt-10 xl:px-7 xl:py-4 xl:text-lg"
                        >
                            Passwort ändern
                        </button>
                    </form>
                </div>
            {:else}
                <!-- Form container -->
                <div class="mt-10 w-full">
                    <form action="?/reset" method="POST">
                        <div>
                            <label
                                for="email"
                                class="block text-base font-medium text-slate-700"
                            >
                                Email:
                            </label>
                            <div class="relative mt-1.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    required
                                    placeholder="foobar@email.com"
                                    class="block w-full appearance-none border border-gray-secondary-400/60 bg-gray-secondary-50 py-2.5 pl-12 pr-8 text-slate-800 placeholder-slate-500/75 outline-none duration-150 hover:bg-vanilla focus:border-gray-secondary-200 focus:bg-vanilla focus:outline-none focus:ring-gray-secondary-200"
                                    value={form?.email ?? ''}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>
                        </div>
                        <button
                            class="group mt-8 inline-flex w-full items-center justify-center bg-slate-700 px-6 py-3 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900 sm:mt-10 xl:px-7 xl:py-4 xl:text-lg"
                        >
                            Link anfordern
                        </button>
                    </form>
                </div>
            {/if}
        </div>
    </div>
</section>
