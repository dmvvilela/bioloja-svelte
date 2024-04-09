<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Email Preview</title>
	<meta name="description" content="Email Preview" />
</svelte:head>

<div class="bg-gray-100 py-16">
	<div class="mx-auto max-w-2xl">
		{@html data.html}
	</div>

	<div class="mx-auto mt-12 max-w-2xl">
		<pre>
			{data.text}
		</pre>
	</div>
</div>
