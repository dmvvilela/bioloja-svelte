<script lang="ts">
	import { onMount } from 'svelte';
	import { cartItemsCount } from '$lib/stores/cart';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	onMount(() => {
		cartItemsCount.set(data.cartItemsCount || 0);
	});
</script>

<!-- Break out from main layout (but keep server data for cart as well) -->
<slot />
