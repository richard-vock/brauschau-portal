<script lang="ts">
    import { enhance } from '$app/forms';

    import '../../app.css';
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';

    export let data: { form? };
</script>


<Header data={data} />

<slot />

<Footer />

