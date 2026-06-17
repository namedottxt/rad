<script>
	import { page } from '$app/state';
</script>

<main>
	<h1>{page.status}</h1>
	<h2>{page.error?.message}</h2>
</main>

<style>
	main {
        text-align: center;
        padding: 1em;
	}
</style>
