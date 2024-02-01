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
            <a href="index.html" class="flex flex-shrink-0">
                <img src="images/logo-icon.png" class="h-auto w-12" />
            </a>

            <h1 class="mt-10 text-center text-4xl font-semibold text-slate-900">
                Login
            </h1>
            <p class="mt-4 text-center leading-relaxed text-slate-600">
                Don’t have an account yet?
                <a
                    href="signup.html"
                    class="block text-center font-medium text-slate-800 underline duration-150 hover:text-slate-900 sm:ml-1.5 sm:inline-block sm:text-left"
                >
                    Get started for free
                </a>
                .
            </p>

            <!-- Third party login buttons -->
            <div
                class="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:gap-6"
            >
                <button
                    class="flex w-full items-center border border-gray-secondary-400/60 bg-gray-secondary-50 px-5 py-3.5 text-md font-medium text-slate-800 duration-150 hover:bg-vanilla sm:w-auto sm:text-base"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        class="mr-3.5 h-5 w-5"
                        fill="none"
                    >
                        <path
                            d="M10.3238 4.22336C11.7572 4.22248 13.1446 4.729 14.2402 5.65318L17.3091 2.73066C16.131 1.64437 14.716 0.847624 13.1763 0.403645C11.6365 -0.0403328 10.0145 -0.119321 8.4389 0.172951C6.86332 0.465222 5.37754 1.12071 4.09948 2.08739C2.82142 3.05406 1.78627 4.30533 1.07617 5.74187L4.53599 8.40865C4.93949 7.19191 5.71559 6.13296 6.75435 5.38181C7.79312 4.63065 9.04189 4.22537 10.3238 4.22336Z"
                            fill="#D94F3D"
                        />
                        <path
                            d="M4.22329 10.3237C4.22416 9.67271 4.32968 9.02611 4.53582 8.40865L1.076 5.74187C0.368293 7.16554 0 8.7338 0 10.3237C0 11.9136 0.368293 13.4818 1.076 14.9055L4.53582 12.2387C4.32968 11.6212 4.22416 10.9746 4.22329 10.3237Z"
                            fill="#F2C042"
                        />
                        <path
                            d="M20.2245 8.44666H10.3701V12.67H15.9543C15.6221 13.8641 14.861 14.8937 13.8168 15.5615L17.2499 18.2081C19.4436 16.2391 20.7327 13.0374 20.2245 8.44666Z"
                            fill="#5085ED"
                        />
                        <path
                            d="M13.816 15.5615C12.755 16.1688 11.5455 16.4675 10.3238 16.424C9.04189 16.422 7.79312 16.0167 6.75435 15.2655C5.71559 14.5144 4.93949 13.4554 4.53599 12.2387L1.07617 14.9055C1.93075 16.6282 3.24904 18.0782 4.88275 19.0926C6.51646 20.107 8.40079 20.6454 10.3238 20.6473C12.8542 20.716 15.3207 19.847 17.2491 18.2072L13.816 15.5615Z"
                            fill="#57A75C"
                        />
                    </svg>
                    Mit Google einloggen
                </button>
                <button
                    class="flex w-full items-center border border-gray-secondary-400/60 bg-gray-secondary-50 px-5 py-3.5 text-md font-medium text-slate-800 duration-150 hover:bg-vanilla sm:w-auto sm:text-base"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        class="mr-3.5 h-5 w-5"
                        fill="none"
                    >
                        <path
                            d="M17.9163 14.6779C17.4834 15.6367 17.2767 16.0646 16.7192 16.9117C15.9425 18.0946 14.8467 19.5679 13.4888 19.5804C12.2825 19.5917 11.9725 18.7954 10.335 18.805C8.69753 18.8146 8.35628 19.5946 7.15003 19.5833C5.79211 19.5713 4.75461 18.2408 3.97711 17.0571C1.80378 13.7488 1.57669 9.86667 2.91711 7.80292C3.86961 6.33542 5.37294 5.47792 6.78586 5.47792C8.22461 5.47792 9.12919 6.26667 10.3192 6.26667C11.4734 6.26667 12.1763 5.47667 13.84 5.47667C15.0975 5.47667 16.43 6.16125 17.3796 7.34417C14.2684 9.04875 14.7742 13.49 17.9163 14.6779Z"
                            fill="black"
                        />
                        <path
                            d="M12.7537 3.40667C13.3582 2.63084 13.8166 1.53626 13.6499 0.416672C12.6624 0.484172 11.5082 1.11251 10.8341 1.93126C10.222 2.67417 9.71657 3.77626 9.91324 4.84751C10.9903 4.88126 12.1057 4.23751 12.7537 3.40667Z"
                            fill="black"
                        />
                    </svg>
                    Mit Apple einloggen
                </button>
            </div>

            <div class="mt-10 flex w-full items-center">
                <div class="h-px flex-1 bg-gray-secondary-400/60"></div>
                <h4
                    class="flex-shrink-0 px-4 text-base tracking-wide text-slate-500"
                >
                    oder einloggen mit
                </h4>
                <div class="h-px flex-1 bg-gray-secondary-400/60"></div>
            </div>

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
