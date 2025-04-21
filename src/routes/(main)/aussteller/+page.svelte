<script lang="ts">
    import brauer from "$lib/images/brauer.jpeg";
    import bsglas from "$lib/images/bsglas.jpeg";
</script>
<section class="relative overflow-hidden bg-amber-100 pt-16 sm:pt-24">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 md:flex md:flex-row md:gap-16 mb-10">
        <div class="md:w-1/2">
            <div
                class="mx-auto max-w-lg pb-14 md:mx-0 md:max-w-none md:pb-48 lg:pb-52 xl:max-w-xl xl:pb-14"
                >
                <h1
                    class="text-5xl font-semibold leading-tighter text-slate-900 md:mx-auto md:max-w-2xl md:text-center xl:mx-0 xl:text-left xl:text-6xl xl:leading-tighter"
                    >
                    Keine Brauschau ohne Brauerinnen und Brauer!
                </h1>
                    <p class="mt-5 text-slate-700 xl:text-lg">
                    Auch dieses Jahr hoffen wir wieder auf eure Unterstützung und laden euch herzlich ein,
                    eure selbstgebrauten Bierköstlichkeiten und das Hobbybrauen einem breiten, bunten Publikum zu präsentieren.
                    </p>
                <p class="mt-5 text-slate-700 xl:text-lg">
                <span class="font-medium text-slate-900">Wichtig: </span> Wir freuen uns über kommerzielle Brauerinnen und Brauer als Besucher. Ausstellen dürfen allerdings nur nichtkommerzielle Hobbyisten.
                </p>
            </div>
            <div
                class="mt-10 mb-10 flex flex-col sm:flex-row sm:space-x-5 md:mt-12 md:justify-center xl:justify-start"
                >
                <a
                    href="/register"
                    class="group inline-flex w-full items-center justify-center bg-slate-700 px-6 py-3 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900 sm:w-auto xl:px-7 xl:py-4 xl:text-lg"
                    >Als Brauer/Brauerin anmelden</a
                >
            </div>
        </div>
        <div class="md:w-1/2">
            <img
                src={brauer}
                class="h-auto"
                alt="Home Hero Image"
            />
        </div>
    </div>
</section>

<section class="relative overflow-hidden bg-slate-700 pt-24 lg:py-24">
    <!-- Container -->
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <!-- Content-->
        <div class="relative z-10 mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0">
            <h2
                class="text-4xl font-semibold leading-tight text-white sm:text-5xl sm:leading-tight"
                >
                Wir feiern Handwerk und Kreativität
            </h2>

                <!-- Steps -->
                <div
                    class="mt-12 space-y-8 sm:mt-16 text-white text-xl"
                    >
                    <p>
                    Egal ob klassisches Lagerbier oder spontanvergorenes Sauerbier mit Fichtennadelinfusion und Holunderschaum.
                    </p>

                    <p>
                    Bei der Brauschau findet Dein Bier ein Publikum aus neugierigen Anfängern,
                    Bier-Connaisseuren und anderen Brauer*innen die beides wertschätzen.
                    </p>

                    <p>
                    Da wir kein einzelnes Bier aus der großen Vielfalt herausheben wollen, gibt es bei uns übrigens keinen Wettbewerb.
                    </p>
                </div>
        </div>
    </div>

    <!-- Image overlay -->
    <div
        class="relative mt-16 h-80 w-full sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-5/12"
        >
        <img
        src={bsglas}
        class="h-full w-full object-cover object-right-top"
        />
        <div
            class="absolute inset-0 bg-gradient-to-b from-slate-700 to-white/0 lg:bg-gradient-to-r"
            ></div>
    </div>
</section>

<section
    class="relative overflow-hidden bg-vanilla pb-20 pt-32 lg:pb-28 lg:pt-24"
    >
    <!-- Container -->
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <!-- Block 1 -->
        <div
            class="relative mx-auto w-full max-w-lg sm:max-w-xl lg:mx-0 lg:max-w-none"
            >
            <!-- Content -->
            <div
                class="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:ml-auto lg:w-7/12 lg:py-32 lg:pl-28 xl:pl-36 xl:pr-20"
                >
                <h2
                    class="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight"
                    >
                    An den Großteil haben wir schon gedacht
                </h2>
                    <p
                    class="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8"
                    >
                        Wir kümmern uns wie jedes Jahr um
                    </p>
                    <ul class="list-disc ml-8">
                        <li>ausreichend Platz für Dich</li>
                        <li>einen Kühlwagen</li>
                        <li>Eis und Strom</li>
                        <li>Frühstück</li>
                        <li>eine kleine Aftershow-Party mit Buffet</li>
                    </ul>
            </div>
        </div>

        <!-- Block 2 -->
        <div
            class="relative mx-auto mt-48 w-full max-w-lg sm:max-w-xl lg:mx-0 lg:mt-32 lg:max-w-none"
            >
            <div
                class="w-full border border-gray-secondary-400/60 bg-gray-secondary-50 px-6 py-10 sm:p-14 lg:w-7/12 lg:py-32 lg:pr-28 xl:pl-16 xl:pr-36"
                >
                <h2
                    class="text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl xl:leading-tight"
                    >
                    Was Du mitbringst
                </h2>
                <p
                class="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8"
                >
                    ist vor allem das Bier auf das du Stolz bist in Flaschen oder Fässern, ein bisschen Stand-Deko
                    und ausreichend gute Laune für einen Tag.
                </p>
                <p
                class="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8"
                >
                    Details zu Strom, Anlieferung, Übernachtung und
                    Werbung teilen wir dir per E-Mail mit.
                </p>
                <p
                class="mt-6 leading-relaxed text-slate-700 sm:mt-8 sm:text-lg sm:leading-8"
                >
                    Schreib uns bei Fragen aber gerne an
                    <br /><a href="mailto:aussteller@bonner-brauschau.de"><b>aussteller@bonner-brauschau.de</b></a>
                </p>
            </div>
        </div>
    </div>
</section>
