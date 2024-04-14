<script lang="ts">
	import { cartItemsCount } from '$lib/stores/cart';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: console.log(data);
	// $: {
	// 	cartItemsCount.set(data.cartItemsCount);
	// }
</script>

<slot />
