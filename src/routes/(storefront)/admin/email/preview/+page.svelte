<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	$: type = $page.url.searchParams.get('type');
	$: template = $page.url.searchParams.get('template');

	let processing = true;

	const sendTest = async () => {
		await fetch('/api/email/test', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type,
				template
			})
		});
	};

	const sendBulk = async () => {
		processing = true;
		const response = await fetch('/api/email/bulk', {
			method: 'POST'
		});
		processing = false;
		console.log(response);
	};
</script>

<svelte:head>
	<title>Email Preview</title>
	<meta name="description" content="Email Preview" />
</svelte:head>

<div class="bg-gray-100 py-16 flex flex-col">
	<div class="mx-auto max-w-2xl bg-white">
		{@html data.html}
	</div>

	<div class="mx-auto mt-12 max-w-2xl bg-white">
		<pre>
			{data.text}
		</pre>
	</div>

	<div class="mt-8 mx-auto flex gap-2">
		<button class="btn btn-primary text-white" on:click={sendTest}>Enviar Teste </button>
		<button class="btn btn-primary text-white" on:click={sendBulk} disabled={processing}
			>Enviar a Todos
		</button>
	</div>
</div>
