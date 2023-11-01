<script lang="ts">
    import { enhance } from '$app/forms';

    export let form: { message?: string };
</script>

<h2>Registrierung</h2>

<form method="POST" use:enhance>
    {#if form?.mismatch}
        <p class="alert">Passwörter stimmen nicht überein.</p>
    {/if}
    {#if form?.exists}
        <p class="alert">E-Mail Adresse existiert bereits.</p>
    {/if}
    {#if form?.unknown}
        <p class="alert">Fehler bei der Registrierung. Bitte schick uns eine E-Mail an "support@bonner-brauschau.de".</p>
    {/if}
    <label>
        Email
        <input name="email" type="email" value={form?.email ?? ''}>
    </label>
    <label>
        Password
        <input name="password" type="password">
    </label>
    <label>
        Password wiederholen
        <input name="password-repeat" type="password">
    </label>
    <button>Sign Up</button>
</form>
