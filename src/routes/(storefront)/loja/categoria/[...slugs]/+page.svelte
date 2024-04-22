<script lang="ts">
	import Pagination from '$lib/components/layout/pagination.svelte';
	import ProductCard from '$lib/components/product_card.svelte';
	import { fade } from 'svelte/transition';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: categoryData = data.category;
	$: categoryString =
		categoryData.categoryName +
		`${categoryData.subcategoryName ? ` > ${categoryData.subcategoryName}` : ''}`;
	$: categoryUrl =
		categoryData.categorySlug +
		`${categoryData.subcategorySlug ? `/${categoryData.subcategorySlug}` : ''}`;
	$: currentPage = categoryData.pageNumber;
</script>

<svelte:head>
	<title>{data.category} - Bioloja</title>
	<meta name="description" content="Mostrando resultados para {data.category}" />
</svelte:head>

<div>
	<div class="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
		<div class="border-b border-gray-200 pb-10">
			<h1 class="text-4xl font-bold tracking-tight text-secondary">Categoria</h1>
			<p class="mt-4 text-base text-gray-500">
				Mostrando resultados para: <span class="ml-1 font-semibold">{categoryString}</span>.
			</p>
		</div>

		{#if !categoryData.products?.length}
			<div class="mt-16 mb-56 ml-2">
				<p class="italic text-sm text-gray-400 pb-28 border-b">
					Não foram encontrados materiais para esta categoria. Deseja algum material específico?
					Envie-nos uma <a href="/contato" class="link">mensagem!</a>
				</p>
			</div>
		{:else}
			{#key categoryData.pageNumber}
				<div
					in:fade={{ duration: 300, delay: 400 }}
					out:fade={{ duration: 300 }}
					class="mt-16 lg:col-span-2 xl:col-span-3"
				>
					<div class="flex flex-col m-8 sm:m-0 sm:grid grid-cols-2 2xl:grid-cols-4 gap-6">
						{#each categoryData.products as product}
							<ProductCard {product} />
						{/each}
					</div>
				</div>
			{/key}

			<!-- <div
				class="bg-gradient-to-r from-accent to-secondary/80 text-white p-8 rounded-lg shadow-lg max-w-md mt-8"
			>
				<div class="text-3xl font-bold mb-4">Oferta Especial!</div>
				<div class="text-lg mb-4">
					Receba <span class="text-yellow-400 font-bold">15% DESCONTO</span> em sua próxima compra!
				</div>
				<div class="text-base mb-4">Utilize o código de cupom:</div>
				<div class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
					<span class="text-2xl font-semibold">NOVABIOLOJA</span>
					<button
						class="btn btn-primary text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
						on:click={() => navigator.clipboard.writeText('NOVABIOLOJA')}>Copiar</button
					>
				</div>
				<div class="text-sm mt-4">
					<p>Válido até <span class="font-semibold">31 de Julho de 2024.</span></p>
					<p>Termos e condições se aplicam.</p>
				</div>
			</div> -->

			<div class="mt-16">
				<Pagination
					{currentPage}
					totalPages={categoryData.totalPages}
					baseUrl="/loja/categoria/{categoryUrl}"
				/>
			</div>
		{/if}
	</div>
</div>
