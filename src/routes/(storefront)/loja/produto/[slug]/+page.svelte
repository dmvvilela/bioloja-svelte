<script lang="ts">
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
	import ProductCard from '$lib/components/product_card.svelte';
	import MailingList from '$lib/components/layout/mailing_list.svelte';
	import { addToCart, getAllSlideImageUrls, getLocalePrice } from '$lib/utils/product';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import '@splidejs/svelte-splide/css';
	import type {
		Attribute,
		ProductWithCategories,
		ProductWithCategory,
		Tag
	} from '$lib/utils/types';
	import type { ProductType } from '$lib/types/product';

	export let data: PageData;

	// Restart carousel on new data
	$: if (data) {
		if (main) {
			main.go(0);
		}
	}

	// TODO: Add customer reviews and share like this: https://tailwindui.com/components/ecommerce/components/product-overviews#component-a4287d3928b87e3ac5c04af49bc062a8
	// Share can also be on the other side of breadcrumbs everywhere! It's a good idea.

	let radioGroup: number | null = 0;

	$: product = data.product as ProductWithCategories;
	$: relatedProducts = data.relatedProducts as ProductWithCategory[];
	$: images = getAllSlideImageUrls(product?.image_urls);
	$: tags = data.tags as Tag[];
	$: attributes = data.attributes as Attribute[];

	$: related = relatedProducts.map((relatedProduct) => ({
		productId: relatedProduct.products.id,
		productSlug: relatedProduct.products.slug,
		productName: relatedProduct.products.name,
		price: relatedProduct.products.price,
		imageUrls: relatedProduct.products.imageUrls,
		categoryId: relatedProduct.product_categories.categoryId,
		categoryName: relatedProduct.categories.name
	})) as ProductType[];

	$: details = [
		{
			title: 'Atributos',
			description: `
<div class="prose prose-sm pb-6">
    <ul role="list">
        ${attributes
					.map(
						(attribute) =>
							`<li>${attribute.name}: <span class="font-semibold">${
								attribute.type === 'boolean'
									? attribute.valueBoolean
										? 'Sim'
										: 'Não'
									: attribute.valueText || attribute.valueNumber
							}</span></li>`
					)
					.join('')}
    </ul>
</div>`
		},
		{
			title: 'Entrega',
			description:
				'<div class="pb-4">Download digital em formato zip. Acesso pelo site no menu Minha conta.</div>'
		},
		{
			title: 'Notas',
			description:
				'<div class="pb-0">A SENHA para abrir os arquivos baixados se encontra no arquivo LEIA-ME.txt. O download estará disponível por 7 dias a partir da data de efetuação do pagamento e terá um limite disponível de 3 downloads por compra.</div>'
		}
	];

	// set up carousel config
	const mainOptions = {
		pagination: true
		// type: 'loop'
	};

	const thumbsOptions = {
		arrows: false,
		focus: 'center' as 'center',
		gap: 5,
		isNavigation: true,
		pagination: false,
		perMove: 1,
		perPage: 4,
		// type: 'loop',
		updateOnMove: true
	};

	// sync carousels
	let main: any;
	let thumbs: { splide: any };
	onMount(() => {
		if (main && thumbs) {
			// console.log({ main, thumbs });
			main.sync(thumbs.splide);
		}
	});
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
		<Breadcrumbs />
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			<div class="gallery">
				<div class="gallery--main">
					<Splide bind:this={main} options={mainOptions}>
						{#each images as image, i}
							<SplideSlide>
								<img src={image} alt="Main slide {i}" class="rounded" />
							</SplideSlide>
						{/each}
					</Splide>
				</div>
				<!-- Image selector -->
				<div class="gallery--thumbs mt-2">
					<Splide id="gallery--thumbs" bind:this={thumbs} options={thumbsOptions}>
						{#each images as image, i}
							<SplideSlide>
								<img src={image} alt="Thumb slide {i}" class="rounded-sm" />
							</SplideSlide>
						{/each}
					</Splide>
				</div>

				<section aria-labelledby="about-heading" class="mt-12">
					<h2 id="about-heading" class="sr-only">Sobre</h2>

					<div class="divide-y divide-gray-200 border-t">
						<div>
							<h3 class="my-4 font-medium text-gray-500 uppercase tracking-wider">Sobre</h3>
							<div class="prose prose-sm pb-6 whitespace-pre-line" id="disclosure-1">
								{@html product.description}
							</div>
						</div>
					</div>
				</section>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 mb-20">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
				<h2 class="mt-1 text-gray-400">{product.category_names.join(' | ')}</h2>

				<div class="mt-3">
					<h2 class="sr-only">Preço</h2>
					<div class="flex items-baseline mb-1 space-x-2 mt-4">
						<p class="text-3xl text-primary font-semibold">
							R${getLocalePrice(product.discount_price || product.price)}
						</p>
						{#if product.discount_price}
							<p class="text-base text-gray-400 line-through">
								R${getLocalePrice(product.price)}
							</p>
						{/if}
					</div>
				</div>

				<!-- Reviews -->
				<!-- <div class="mt-3">
					<h3 class="sr-only">Reviews</h3>
					<div class="flex items-center">
						<div class="flex items-center">
							{#each [0, 1, 2, 3, 4] as rating}
								{#if rating < 4}
									<svg
										class="h-5 w-5 flex-shrink-0 text-yellow-400"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
								{#if rating == 4}
									<svg
										class="h-5 w-5 flex-shrink-0 text-gray-300"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
											clip-rule="evenodd"
										/>
									</svg>
								{/if}
							{/each}
						</div>
						<p class="sr-only">4 out of 5 stars</p>
					</div>
				</div> -->

				<div class="mt-6">
					<h3 class="sr-only">Descrição</h3>

					<div class="space-y-6 text-base text-gray-700">
						<p class="whitespace-pre-line">
							{@html product.short_description}
						</p>
					</div>
				</div>

				<form class="mt-6">
					<!-- Colors -->
					<div>
						<h3 class="text-sm text-gray-600">Tags</h3>
						<h4 class="pt-1 text-xs text-gray-400 tracking-wide uppercase">
							{tags.map((tag) => tag.name).join(' | ')}
						</h4>
					</div>

					<div class="mt-10 flex">
						<button
							on:click={() => addToCart(product.id)}
							type="button"
							class="btn btn-primary btn-md flex max-w-xs flex-1 items-center justify-center glass bg-primary-focus text-base border border-primary text-white px-8 py-3 font-medium border-transparent sm:w-full rounded-md hover:shadow-lg"
							>Adicionar <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6 ml-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg></button
						>
						<!-- <button
							type="button"
							class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
						>
							<svg
								class="h-6 w-6 flex-shrink-0"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
								/>
							</svg>
							<span class="sr-only">Adicionar a Wishlist</span>
						</button> -->
					</div>
				</form>

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Mais detalhes</h2>

					<div class="divide-y divide-gray-200 border-t">
						{#each details as detail, i}
							<div>
								<h3>
									<button
										on:click={() => (radioGroup = i)}
										class="collapse group relative w-full text-left"
									>
										<input type="radio" class="hidden" checked={radioGroup == i} />
										<div
											class="collapse-title text-gray-900 text-sm font-medium flex items-center justify-between p-0"
										>
											{detail.title}
											<span class="ml-6 flex items-center">
												{#if radioGroup != i}
													<svg
														class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M12 4.5v15m7.5-7.5h-15"
														/>
													</svg>
												{/if}
												{#if radioGroup == i}
													<svg
														class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
													</svg>
												{/if}
											</span>
										</div>
										<div class="collapse-content prose prose-sm pb-6" id="disclosure-1">
											{@html detail.description}
										</div>
									</button>
								</h3>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</div>

		<!-- related products  -->
		<!-- TODO: Carousel with many more products -->
		<div class="pb-16 mt-8">
			<h2 class="text-2xl font-semibold tracking-tight text-gray-800 uppercase mb-6">
				Produtos Relacionados
			</h2>
			<div class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each related as product}
					<ProductCard {product} />
				{/each}
			</div>
		</div>
	</div>

	<MailingList />
</div>

<style>
	.gallery--thumbs
		:global(.splide__track--nav)
		> :global(.splide__list)
		> :global(.splide__slide.is-active) {
		border: 2.5px solid #002336;
		border-radius: 4px;
	}

	:global(.splide__pagination__page.is-active) {
		background-color: #7895a3;
	}
</style>
