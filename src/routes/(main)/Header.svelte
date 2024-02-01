<script lang="ts">
import { enhance } from '$app/forms';
import { fade } from 'svelte/transition';

export let data;

let mobileMenuOpen = false;
</script>


<header class="relative h-24 bg-amber-100"j>
    <!-- Main navbar for large screens -->
    <div
        class="relative z-30 mx-auto flex h-full w-full max-w-screen-xl items-center border-b border-gray-secondary-300/60 bg-amber-100 px-4 sm:px-6 lg:px-8"
    >
        <nav class="flex w-full items-center justify-between">
            <div class="flex items-center space-x-8 lg:space-x-12">
                <div class="hidden items-center space-x-3 md:flex lg:space-x-4">
                    <a
                        href="/"
                        class="inline-block px-4 py-2 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    >
                        Startseite
                    </a>
                    <a
                        href="/event"
                        class="inline-block px-4 py-2 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    >
                        Das Event
                    </a>
                    <a
                        href="/tickets"
                        class="inline-block px-4 py-2 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    >
                        Tickets
                    </a>
                    <a
                        href="/rueckblick"
                        class="inline-block px-4 py-2 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    >
                        Rückblick
                    </a>
                    <a
                        href="/aussteller"
                        class="inline-block px-4 py-2 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                    >
                        Für Aussteller
                    </a>
                </div>
            </div>

            <div>
                <div class="flex items-center space-x-4">
                    {#if data?.session}
                        <div class="hidden lg:block">
                            {data?.session.user?.email}
                        </div>
                        <form action="/?/logout" method="POST" use:enhance>
                            <button
                                type="submit"
                                class="group inline-flex items-center justify-center bg-slate-700 px-5 py-2.5 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900"
                            >
                                Ausloggen
                            </button>
                        </form>
                    {:else}
                        <a
                            class="group inline-flex items-center justify-center bg-slate-700 px-5 py-2.5 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900"
                            href="/login"
                        >
                            Einloggen
                        </a>
                    {/if}
                    <div class="md:hidden">
                        <div>
                            <button
                                class="group relative z-50 flex cursor-pointer items-center justify-center border border-gray-secondary-400/75 bg-gray-secondary-50 p-3 transition duration-300 ease-in-out focus:outline-none md:hidden"
                                aria-label="Toggle Navigation"
                                on:click={() => (mobileMenuOpen=!mobileMenuOpen)}
                            >
                                <span class="relative h-3.5 w-4">
                                    <span
                                        class={mobileMenuOpen ? 'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-slate-900 w-0 top-1.5 left-1/2' : 'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-slate-900 left-0 top-0 w-full'}
                                    ></span>
                                    <span
                                        class={mobileMenuOpen ? 'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 rotate-45' : 'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 rotate-0'}
                                    ></span>
                                    <span
                                        class={mobileMenuOpen ? 'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 -rotate-45' : 'absolute left-0 top-1.5 block h-0.5 w-full transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 rotate-0'}
                                    ></span>
                                    <span
                                        class={mobileMenuOpen ? 'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 left-1/2 top-1.5 w-0' : 'absolute block h-0.5 rotate-0 transform rounded-full bg-slate-600 opacity-100 transition-all duration-200 ease-linear group-hover:bg-gray-900 left-0 top-3 w-full'}
                                    ></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>

    <!-- Mobile Menu-->
    <div class="md:hidden">
        {#if mobileMenuOpen}
            <div
                class="fixed inset-0 z-20 bg-slate-900 bg-opacity-25 backdrop-blur"
                transition:fade= {{ duration: 200 }}
                on:click={() => (mobileMenuOpen=false)}
            ></div>
            <div
                class="absolute inset-x-0 top-24 z-30 overflow-hidden bg-amber-100 px-5 pb-8 pt-4 duration-300"
                transition:fade= {{ duration: 300 }}
                on:click={() => (mobileMenuOpen=false)}
            >
                <div>
                    <div>
                        <div class="flex flex-col divide-y divide-gray-secondary-400/75">
                            <a
                                href="index.html"
                                class="block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                            >
                                Home
                            </a>
                            <a
                                href="about.html"
                                class="block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                            >
                                About
                            </a>
                            <a
                                href="pricing.html"
                                class="block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                            >
                                Pricing
                            </a>
                            <a
                                href="contact.html"
                                class="block px-4 pb-2 pt-4 font-medium text-slate-700 hover:bg-amber-50 hover:text-slate-900"
                            >
                                Contact
                            </a>

                        </div>
                        {#if !data?.session}
                            <div class="mt-6">
                                <a
                                    href="/login"
                                    class="group inline-flex w-full items-center justify-center border border-slate-800 px-5 py-2.5 text-base font-medium text-slate-800 duration-150 ease-in-out hover:bg-slate-800 hover:text-white"
                                >
                                    Einloggen
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</header>

