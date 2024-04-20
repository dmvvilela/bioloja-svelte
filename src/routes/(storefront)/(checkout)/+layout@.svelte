<script lang="ts">
	import { onMount } from 'svelte';
	import { cartItemsCount } from '$lib/stores/cart';
	import type { LayoutData } from './$types';
	import { onNavigate } from '$app/navigation';

	export let data: LayoutData;

	onMount(() => {
		cartItemsCount.set(data.cartItemsCount || 0);
	});

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

<!-- Break out from main layout (but keep server data for cart as well) -->
<slot />
