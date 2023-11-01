<script lang="ts">
    import { enhance } from '$app/forms';

    import '../app.css';

    export let data: { form? };
</script>

<main
    class="relative flex flex-col items-center justify-center min-h-screen py-10"
>

{#if data?.session}
    <b>logged in as {data?.session.user?.email}</b>
    <form action="?/logout" method="POST" use:enhance>
        <button type="submit">Ausloggen</button>
    </form>
{:else}
    <b>not logged in</b>
    <form action="?/login" method="POST">
        {#if data?.form?.invalid}
            <p class="alert">Inkorrekte Login Daten.</p>
        {/if}
        {#if data?.form?.unknown}
            <p class="alert">Fehler beim Login. Bitte schick uns eine E-Mail an "support@bonner-brauschau.de".</p>
        {/if}
        <label>
            Email
            <input name="email" type="email" value={data?.form?.email ?? ''}>
        </label>
        <label>
            Password
            <input name="password" type="password">
        </label>
        <button type="submit">Einloggen</button>
    </form>
{/if}

<slot />

</main>
