<script lang="ts">
	import ProductCard from '$lib/components/product_card.svelte';
	import type { ProductCard as Prodoct } from '$lib/utils/types';

	export let promotions: Prodoct[];
</script>

{#if promotions.length > 0}
	<div class="container mx-auto pb-16">
		<h2 class="text-2xl font-bold text-secondary uppercase mb-6">Materiais em promoção</h2>
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			{#each promotions as promotion}
				<ProductCard product={promotion} />
			{/each}
		</div>
	</div>
{/if}
