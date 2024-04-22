<script lang="ts">
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Checkout - Bioloja</title>
	<meta name="description" content="Finalize seu pedido." />
</svelte:head>

<!-- Break out from main layout (but keep server data for cart as well) -->
<slot />
