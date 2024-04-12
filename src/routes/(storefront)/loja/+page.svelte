<script lang="ts">
	import ProductCard from '$lib/components/product_card.svelte';
	import { searchProducts, type Filters } from '$lib/utils/algolia';
	import { categories, tags } from '$lib/utils/data';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let checked = false;
	const toggleMenu = () => (checked = !checked);

	let filters: Filters = {
		categories: [],
		tags: [],
		prices: []
	};

	$: searchProducts(filters);

	const prices = [
		{ name: 'R$0 - R$20', slug: '0-20' },
		{ name: 'R$20 - R$40', slug: '20-40' },
		{ name: 'R$40 - R$60', slug: '40-60' },
		{ name: 'R$60 - R$80', slug: '60-80' },
		{ name: 'R$80 - R$100', slug: '80-100' },
		{ name: '> R$100', slug: 'over-100' }
	];
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
													value={category}
													type="checkbox"
													bind:group={filters.categories}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="category-{i}-mobile" class="ml-3 text-sm text-gray-500"
													>{category.name}</label
												>
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
													id="category-{i}-mobile"
													name="category[]"
													value={tag}
													type="checkbox"
													bind:group={filters.tags}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="category-{i}-mobile" class="ml-3 text-sm text-gray-500"
													>{tag.name}</label
												>
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
										{#each prices as price, i}
											<div class="flex items-center">
												<input
													id="sizes-{i}-mobile"
													name="sizes[]"
													value={price}
													type="checkbox"
													bind:group={filters.prices}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="sizes-{i}-mobile" class="ml-3 text-sm text-gray-500"
													>{price.name}</label
												>
											</div>
										{/each}
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
						class="inline-flex items-center lg:hidden mb-4 btn-ghost py-1 pl-2.5 pr-1.5 rounded-full"
					>
						<span class="text-base font-medium text-gray-700">Filtros</span>

						<svg
							class="ml-1 h-6 w-6 flex-shrink-0 text-gray-400"
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
									<legend class="block text-lg font-semibold text-secondary uppercase"
										>Categorias</legend
									>
									<div class="space-y-3 pt-6">
										{#each categories as category, i}
											<div class="flex items-center">
												<input
													id="category-{i}"
													name="category[]"
													value={category}
													type="checkbox"
													bind:group={filters.categories}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="category-{i}" class="ml-3 text-sm text-gray-600"
													>{category.name}</label
												>
												<div class="ml-auto text-gray-400 text-sm">(15)</div>
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
													value={tag}
													type="checkbox"
													bind:group={filters.tags}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="tag-{i}" class="ml-3 text-sm text-gray-600">{tag.name}</label>
												<div class="ml-auto text-gray-400 text-sm">(4)</div>
											</div>
										{/each}
									</div>
								</fieldset>
							</div>
							<div class="pt-10">
								<fieldset>
									<legend class="block text-lg font-semibold text-secondary uppercase">Preço</legend
									>
									<div class="space-y-3 pt-6">
										{#each prices as price, i}
											<div class="flex items-center">
												<input
													id="price-{i}"
													name="price[]"
													value={price}
													type="checkbox"
													bind:group={filters.prices}
													class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-bioloja-300"
												/>
												<label for="price-{i}" class="ml-3 text-sm text-gray-600"
													>{price.name}</label
												>
											</div>
										{/each}
									</div>
								</fieldset>
							</div>
						</form>
					</div>

					<!-- <div
						class="container bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-8"
					>
						<div class="text-3xl font-bold mb-4">Oferta Especial!</div>
						<div class="text-lg mb-4">
							Receba <span class="text-yellow-400 font-bold">25% DESCONTO</span> em sua próxima compra!
						</div>
						<div class="text-base mb-4">Utilize o código de cupom:</div>
						<div
							class="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between"
						>
							<span class="text-2xl font-semibold">NOVABIOLOJA</span>
							<button
								class="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>Copy</button
							>
						</div>
						<div class="text-sm mt-4">
							<p>Válido até <span class="font-semibold">31 de Julho de 2024.</span></p>
							<p>Termos e condições se aplicam</p>
						</div>
					</div> -->
				</aside>

				<!-- Product grid -->
				<div class="pt-0.5 lg:col-span-2 lg:mt-0 xl:col-span-3">
					<div class="flex flex-col m-8 sm:m-0 sm:grid grid-cols-2 2xl:grid-cols-4 gap-6">
						{#each data.storeProducts as product}
							<ProductCard {product} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
