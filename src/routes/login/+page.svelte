<script lang="ts">
    import { enhance } from '$app/forms';

    import '../../app.css';

    export let data;
</script>


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
                Login
            </h1>

            <!-- Third party login buttons -->
            <!-- <div -->
            <!--     class="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:gap-6" -->
            <!-- > -->
            <!--     <button -->
            <!--         class="flex w-full items-center border border-gray-secondary-400/60 bg-gray-secondary-50 px-5 py-3.5 text-md font-medium text-slate-800 duration-150 hover:bg-vanilla sm:w-auto sm:text-base" -->
            <!--     > -->
            <!--         <svg -->
            <!--             xmlns="http://www.w3.org/2000/svg" -->
            <!--             width="21" -->
            <!--             height="21" -->
            <!--             viewBox="0 0 21 21" -->
            <!--             class="mr-3.5 h-5 w-5" -->
            <!--             fill="none" -->
            <!--         > -->
            <!--             <path -->
            <!--                 d="M10.3238 4.22336C11.7572 4.22248 13.1446 4.729 14.2402 5.65318L17.3091 2.73066C16.131 1.64437 14.716 0.847624 13.1763 0.403645C11.6365 -0.0403328 10.0145 -0.119321 8.4389 0.172951C6.86332 0.465222 5.37754 1.12071 4.09948 2.08739C2.82142 3.05406 1.78627 4.30533 1.07617 5.74187L4.53599 8.40865C4.93949 7.19191 5.71559 6.13296 6.75435 5.38181C7.79312 4.63065 9.04189 4.22537 10.3238 4.22336Z" -->
            <!--                 fill="#D94F3D" -->
            <!--             /> -->
            <!--             <path -->
            <!--                 d="M4.22329 10.3237C4.22416 9.67271 4.32968 9.02611 4.53582 8.40865L1.076 5.74187C0.368293 7.16554 0 8.7338 0 10.3237C0 11.9136 0.368293 13.4818 1.076 14.9055L4.53582 12.2387C4.32968 11.6212 4.22416 10.9746 4.22329 10.3237Z" -->
            <!--                 fill="#F2C042" -->
            <!--             /> -->
            <!--             <path -->
            <!--                 d="M20.2245 8.44666H10.3701V12.67H15.9543C15.6221 13.8641 14.861 14.8937 13.8168 15.5615L17.2499 18.2081C19.4436 16.2391 20.7327 13.0374 20.2245 8.44666Z" -->
            <!--                 fill="#5085ED" -->
            <!--             /> -->
            <!--             <path -->
            <!--                 d="M13.816 15.5615C12.755 16.1688 11.5455 16.4675 10.3238 16.424C9.04189 16.422 7.79312 16.0167 6.75435 15.2655C5.71559 14.5144 4.93949 13.4554 4.53599 12.2387L1.07617 14.9055C1.93075 16.6282 3.24904 18.0782 4.88275 19.0926C6.51646 20.107 8.40079 20.6454 10.3238 20.6473C12.8542 20.716 15.3207 19.847 17.2491 18.2072L13.816 15.5615Z" -->
            <!--                 fill="#57A75C" -->
            <!--             /> -->
            <!--         </svg> -->
            <!--         Mit Google einloggen -->
            <!--     </button> -->
            <!--     <button -->
            <!--         class="flex w-full items-center border border-gray-secondary-400/60 bg-gray-secondary-50 px-5 py-3.5 text-md font-medium text-slate-800 duration-150 hover:bg-vanilla sm:w-auto sm:text-base" -->
            <!--     > -->
            <!--         <svg -->
            <!--             xmlns="http://www.w3.org/2000/svg" -->
            <!--             width="20" -->
            <!--             height="20" -->
            <!--             viewBox="0 0 20 20" -->
            <!--             class="mr-3.5 h-5 w-5" -->
            <!--             fill="none" -->
            <!--         > -->
            <!--             <path -->
            <!--                 d="M17.9163 14.6779C17.4834 15.6367 17.2767 16.0646 16.7192 16.9117C15.9425 18.0946 14.8467 19.5679 13.4888 19.5804C12.2825 19.5917 11.9725 18.7954 10.335 18.805C8.69753 18.8146 8.35628 19.5946 7.15003 19.5833C5.79211 19.5713 4.75461 18.2408 3.97711 17.0571C1.80378 13.7488 1.57669 9.86667 2.91711 7.80292C3.86961 6.33542 5.37294 5.47792 6.78586 5.47792C8.22461 5.47792 9.12919 6.26667 10.3192 6.26667C11.4734 6.26667 12.1763 5.47667 13.84 5.47667C15.0975 5.47667 16.43 6.16125 17.3796 7.34417C14.2684 9.04875 14.7742 13.49 17.9163 14.6779Z" -->
            <!--                 fill="black" -->
            <!--             /> -->
            <!--             <path -->
            <!--                 d="M12.7537 3.40667C13.3582 2.63084 13.8166 1.53626 13.6499 0.416672C12.6624 0.484172 11.5082 1.11251 10.8341 1.93126C10.222 2.67417 9.71657 3.77626 9.91324 4.84751C10.9903 4.88126 12.1057 4.23751 12.7537 3.40667Z" -->
            <!--                 fill="black" -->
            <!--             /> -->
            <!--         </svg> -->
            <!--         Mit Apple einloggen -->
            <!--     </button> -->
            <!-- </div> -->
            <!--  -->
            <!-- <div class="mt-10 flex w-full items-center"> -->
            <!--     <div class="h-px flex-1 bg-gray-secondary-400/60"></div> -->
            <!--     <h4 -->
            <!--         class="flex-shrink-0 px-4 text-base tracking-wide text-slate-500" -->
            <!--     > -->
            <!--         oder einloggen mit -->
            <!--     </h4> -->
            <!--     <div class="h-px flex-1 bg-gray-secondary-400/60"></div> -->
            <!-- </div> -->

            <!-- Form container -->
            <div class="mt-10 w-full">
                <form action="/?/login" method="POST">
                    <div>
                        <label
                            for="email"
                            class="block text-base font-medium text-slate-700"
                        >
                            Email
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
                                value={data?.form?.email ?? ''}
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
                    <div class="mt-7">
                        <div class="flex justify-between">
                            <label
                                for="password"
                                class="text-base font-medium text-slate-700"
                            >
                                Passwort
                            </label>

                            <!-- <a -->
                            <!--     href="password-reset.html" -->
                            <!--     class="font-medium text-slate-800 underline duration-150 hover:text-slate-900" -->
                            <!-- > -->
                            <!--     Forgot password? -->
                            <!-- </a> -->
                        </div>
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
                    <button
                        class="group mt-8 inline-flex w-full items-center justify-center bg-slate-700 px-6 py-3 text-base font-medium text-white duration-150 ease-in-out hover:bg-slate-900 sm:mt-10 xl:px-7 xl:py-4 xl:text-lg"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
