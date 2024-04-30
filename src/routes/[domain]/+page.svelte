<script lang="ts">
	import { page } from '$app/stores';

	const { domain } = $page.params;
</script>

<div>
	<h1>THE DOMAIN:: <strong>{domain}</strong></h1>

	<h2>
		try editing <strong>src/routes/[domain]/+page.svelte</strong>
	</h2>
</div>
