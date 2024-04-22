<script lang="ts">
	import Spinner from '$lib/components/layout/spinner.svelte';
	import ProductCard from '$lib/components/product_card.svelte';
	import { searchProducts, getFacetCountsWithFilters, type Filters } from '$lib/utils/algolia';
	import { categories, tags } from '$lib/utils/data';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { algoliaToProductType } from '$lib/utils/product';
	import promoImg from '$lib/images/promo/Compre-4-Leve-3.webp';
	import MailingList from '$lib/components/layout/mailing_list.svelte';
	import { fade } from 'svelte/transition';

	let checked = false;
	const toggleMenu = () => (checked = !checked);

	// TODO: Add clear button to query input and message of no results
	// TODO: add another slider.. we'll have both, min and max price normally separated by border
	let query = '';
	let range = 0;
	let filters: Filters = {
		categories: [],
		tags: [],
		prices: { min: 0, max: range }
	};
	$: filters.prices.max = range;

	$: promise = searchProducts(query, filters);

	let categoriesCounts: any;
	let tagsCounts: any;

	$: (async () => {
		const { categoryCounts, tagCounts } = await getFacetCountsWithFilters(query, filters);
		categoriesCounts = categoryCounts;
		tagsCounts = tagCounts;

		console.log(filters);
	})();

	afterNavigate(() => {
		query = $page.url.searchParams.get('q') || '';

		const cat = $page.url.searchParams.get('cat');
		const tag = $page.url.searchParams.get('tag');
		const min = $page.url.searchParams.get('min');
		const max = $page.url.searchParams.get('max');

		filters = {
			categories: cat ? [cat] : [],
			tags: tag ? [tag] : [],
			prices: {
				min: min ? Number(min) : 0,
				max: max ? Number(max) : 0
			}
		};
	});

	// Just to remove svelte type error
	const algoliaToProduct = (product: any) => algoliaToProductType(product);
</script>

<div>
	<div>
		<!-- mobile-menu -->
		<div class="drawer drawer-end z-40">
			<input id="filter-drawer" type="checkbox" class="drawer-toggle" bind:checked />
			<!-- <div class="drawer-content">
				<label for="filter-drawer" class="drawer-button btn btn-primary">Abrir filtros</label>
			</div> -->
			<div class="drawer-side">
				<label for="filter-drawer" aria-label="fechar filtros" class="drawer-overlay" />
				<ul class="menu w-80 pt-4 min-h-full bg-white">
					<!-- Sidebar content here -->
					<div class="flex items-center justify-between px-4">
						<h2 class="text-lg font-medium text-secondary">Filtros</h2>
						<button
							type="button"
							on:click={toggleMenu}
							class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
						>
							<span class="sr-only">Fechar menu</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Filters -->
					<form class="mt-4">
						<div class="border-t border-gray-200 pb-4 pt-4">
							<fieldset>
								<legend class="w-full px-2">
									<!-- Expand/collapse section button -->
									<button
										type="button"
										class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-0"
										aria-expanded="false"
									>
										<span class="text-[14.5] font-medium text-secondary">Pesquise pelo nome</span>
										<span class="ml-6 flex h-7 items-center">
											<!--
											Expand/collapse icon, toggle classes based on section open state.

											Open: "-rotate-180", Closed: "rotate-0"
										-->
											<svg
												class="rotate-0 h-5 w-5 transform"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</legend>
								<div class="px-4 pb-2 pt-4" id="filter-section-0">
									<div class="space-y-6">
										<input
											id="search-query"
											name="search-query"
											bind:value={query}
											placeholder="Digite o termo da pesquisa"
											class="rounded-md border-gray-300 text-primary focus:ring-bioloja-300 w-full text-sm focus:border-primary outline-none"
										/>
									</div>
								</div>
							</fieldset>
						</div>

						<div class="border-t border-gray-200 pb-4 pt-4">
							<fieldset>
								<legend class="w-full px-2">
									<!-- Expand/collapse section button -->
									<button
										type="button"
										class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-0"
										aria-expanded="false"
									>
										<span class="text-sm font-medium text-secondary">Categoria</span>
										<span class="ml-6 flex h-7 items-center">
											<!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
											<svg
												class="rotate-0 h-5 w-5 transform"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</legend>
								<div class="px-4 pb-2 pt-4" id="filter-section-0">
									<div class="space-y-6">
										{#each categories as category, i}
											<div class="flex items-center">
												<input
													id="category-{i}-mobile"
													name="category[]"
													value={category.slug}
													type="checkbox"
													bind:group={filters.categories}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="category-{i}-mobile" class="ml-3 text-sm text-gray-500"
													>{category.name}</label
												>
												<div class="ml-auto text-gray-400 text-sm">
													({categoriesCounts?.[category.slug] || 0})
												</div>
											</div>
										{/each}
									</div>
								</div>
							</fieldset>
						</div>
						<div class="border-t border-gray-200 pb-4 pt-4">
							<fieldset>
								<legend class="w-full px-2">
									<!-- Expand/collapse section button -->
									<button
										type="button"
										class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-1"
										aria-expanded="false"
									>
										<span class="text-sm font-medium text-secondary">Tag</span>
										<span class="ml-6 flex h-7 items-center">
											<!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
											<svg
												class="rotate-0 h-5 w-5 transform"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</legend>
								<div class="px-4 pb-2 pt-4" id="filter-section-1">
									<div class="space-y-6">
										{#each tags as tag, i}
											<div class="flex items-center">
												<input
													id="tag-{i}-mobile"
													name="tag[]"
													value={tag.slug}
													type="checkbox"
													bind:group={filters.tags}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="tag-{i}-mobile" class="ml-3 text-sm text-gray-500"
													>{tag.name}</label
												>
												<div class="ml-auto text-gray-400 text-sm">
													({tagsCounts?.[tag.slug] || 0})
												</div>
											</div>
										{/each}
									</div>
								</div>
							</fieldset>
						</div>
						<div class="border-t border-gray-200 pb-4 pt-4">
							<fieldset>
								<legend class="w-full px-2">
									<!-- Expand/collapse section button -->
									<button
										type="button"
										class="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-2"
										aria-expanded="false"
									>
										<span class="text-sm font-medium text-secondary">Preço</span>
										<span class="ml-6 flex h-7 items-center">
											<!--
                        Expand/collapse icon, toggle classes based on section open state.

                        Open: "-rotate-180", Closed: "rotate-0"
                      -->
											<svg
												class="rotate-0 h-5 w-5 transform"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</legend>
								<div class="px-4 pb-2 pt-4" id="filter-section-2">
									<div class="space-y-6">
										<div class="space-y-2 pt-2 mb-4 mr-4">
											<input
												type="range"
												min="0"
												max="100"
												bind:value={range}
												class="range range-primary range-sm"
												step="20"
											/>
											<div class="w-full flex justify-between text-xs px-2">
												<span>|</span>
												<span>|</span>
												<span>|</span>
												<span>|</span>
												<span>|</span>
												<span>|</span>
											</div>
											<div class="w-full flex justify-between text-xs">
												<span class="w-8 -ml-1">&gt;R$0</span>
												<span class="w-8">R$20</span>
												<span class="w-8">R$40</span>
												<span class="w-8">R$60</span>
												<span class="w-8">R$80</span>
												<span class="w-8 pl-0.5">R$100</span>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
					</form>
				</ul>
			</div>
		</div>
		<!-- end-mobile-menu -->

		<div class="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
			<div class="border-b border-gray-200 pb-10">
				<h1 class="text-4xl font-bold tracking-tight text-secondary">Todos os materiais</h1>
				<p class="mt-4 text-base text-gray-500">Navegue por categorias, preço ou outros filtros.</p>
			</div>

			<div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
				<aside>
					<h2 class="sr-only">Filtros</h2>
					<!-- Mobile filter dialog toggle, controls the 'mobileFilterDialogOpen' state. -->
					<button
						type="button"
						on:click={toggleMenu}
						class="inline-flex items-center lg:hidden mb-4 btn-ghost py-1 pl-2.5 pr-1.5 rounded-full hover:bg-primary hover:text-white"
					>
						<span class="text-base font-medium">Filtros</span>

						<svg
							class="ml-1 h-6 w-6 flex-shrink-0"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
							/>
						</svg>
					</button>

					<div class="hidden lg:block border p-4 rounded-md border-gray-100 bg-gray-50">
						<form class="space-y-10 divide-y divide-gray-200">
							<div>
								<fieldset>
									<legend class="block text-[18.5px] font-semibold text-secondary uppercase"
										>Pesquisa por nome</legend
									>
									<div class="space-y-3 pt-6">
										<div class="flex flex-col">
											<input
												id="search-query"
												name="search-query"
												bind:value={query}
												placeholder="Digite o termo da pesquisa"
												class="rounded-md border-gray-300 text-primary focus:ring-bioloja-300 w-full text-sm focus:border-primary outline-none"
											/>
											<!-- <label for="search-query" class="mt-2 ml-2 text-sm text-gray-600"
												>Procure por nome ou categoria
											</label> -->
										</div>
									</div>
								</fieldset>
							</div>
							<div class="pt-10">
								<fieldset>
									<legend class="block text-lg font-semibold text-secondary uppercase"
										>Categorias</legend
									>
									<div class="space-y-3 pt-6">
										{#each categories as category, i}
											<div class="flex items-center">
												<input
													id="category-{i}"
													name="category[]"
													value={category.slug}
													type="checkbox"
													bind:group={filters.categories}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="category-{i}" class="ml-3 text-sm text-gray-600"
													>{category.name}</label
												>
												<div class="ml-auto text-gray-400 text-sm">
													({categoriesCounts?.[category.slug] || 0})
												</div>
											</div>
										{/each}
									</div>
								</fieldset>
							</div>
							<div class="pt-10">
								<fieldset>
									<legend class="block text-lg font-semibold text-secondary uppercase">Tags</legend>
									<div class="space-y-3 pt-6">
										{#each tags as tag, i}
											<div class="flex items-center">
												<input
													id="tag-{i}"
													name="tag[]"
													value={tag.slug}
													type="checkbox"
													bind:group={filters.tags}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="tag-{i}" class="ml-3 text-sm text-gray-600">{tag.name}</label>
												<div class="ml-auto text-gray-400 text-sm">
													({tagsCounts?.[tag.slug] || 0})
												</div>
											</div>
										{/each}
									</div>
								</fieldset>
							</div>
							<div class="pt-10">
								<fieldset>
									<legend class="block text-lg font-semibold text-secondary uppercase">Preço</legend
									>
									<div class="space-y-3 pt-6 mb-4 mr-4">
										<input
											type="range"
											min="0"
											max="100"
											bind:value={range}
											class="range range-primary range-sm"
											step="20"
										/>
										<div class="w-full flex justify-between text-xs px-2">
											<span>|</span>
											<span>|</span>
											<span>|</span>
											<span>|</span>
											<span>|</span>
											<span>|</span>
										</div>
										<div class="w-full flex justify-between text-xs">
											<span class="w-8 -ml-1">&gt;R$0</span>
											<span class="w-8">R$20</span>
											<span class="w-8">R$40</span>
											<span class="w-8 pl-0.5">R$60</span>
											<span class="w-8 pl-0.5">R$80</span>
											<span class="w-8 pl-0.5">R$100</span>
										</div>
									</div>
								</fieldset>
							</div>
						</form>
					</div>

					<div class="mx-auto mt-8 p-4 max-w-sm">
						<a href="/loja/produto/promocao-leve-4-e-pague-3">
							<img
								src={promoImg}
								alt="promotion-banner"
								class="w-full hover:scale-[1.01] transition hover:shadow"
							/>
						</a>
					</div>

					<!-- <div
						class="container bg-gradient-to-r from-accent to-secondary/80 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-8"
					>
						<div class="text-3xl font-bold mb-4">Oferta Especial!</div>
						<div class="text-lg mb-4">
							Receba <span class="text-yellow-400 font-bold">15% DESCONTO</span> em sua próxima compra!
						</div>
						<div class="text-base mb-4">Utilize o código de cupom:</div>
						<div
							class="bg-white text-gray-800 rounded-lg pl-3 pr-2 py-1.5 flex items-center justify-between"
						>
							<span class="text-xl font-semibold tracking-tight">NOVABIOLOJA</span>
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
				</aside>

				<!-- Product grid -->
				{#await promise}
					<div class="lg:col-span-2 lg:mt-0 xl:col-span-3">
						<Spinner />
					</div>
				{:then products}
					<div class="lg:col-span-2 lg:mt-0 xl:col-span-3 mx-auto">
						<div
							in:fade={{ duration: 300, delay: 400 }}
							out:fade={{ duration: 300 }}
							class="flex flex-col m-8 sm:m-0 sm:grid grid-cols-2 2xl:grid-cols-4 gap-6 items-center"
						>
							{#each products as algolia}
								{@const product = algoliaToProduct(algolia)}
								<ProductCard {product} />
							{/each}
						</div>
					</div>
				{:catch error}
					<p style="color: red">{error.message}</p>
				{/await}
			</div>
		</div>
		<MailingList />
	</div>
</div>
