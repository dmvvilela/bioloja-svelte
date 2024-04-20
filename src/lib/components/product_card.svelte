<script lang="ts">
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { addToCart, getAllSlideImageUrls, getLocalePrice } from '$lib/utils/product';
	import type { ProductType } from '$lib/utils/types';
	import '@splidejs/svelte-splide/css';

	export let product: ProductType;

	const images = getAllSlideImageUrls(product.imageUrls).slice(0, 5);

	// set up carousel config
	const mainOptions = {
		pagination: false,
		lazyLoad: 'sequential' as 'nearby' | 'sequential',
		type: 'loop'
	};
</script>

<div class="bg-gray-50/60 shadow-sm border rounded-md overflow-hidden group">
	<div class="relative">
		<div class="gallery--product group">
			<div class="gallery--product--main">
				<Splide options={mainOptions}>
					{#each images as image, i}
						<SplideSlide>
							<img
								src={image}
								alt="{product.productName} slide {i}"
								class="w-full aspect-video h-48 object-contain"
							/>
						</SplideSlide>
					{/each}
				</Splide>
			</div>
		</div>
		<div
			class="absolute inset-0 bg-black bg-opacity-10 flex items-center
            justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
		>
			<!-- <a
				href="/loja/produto/{product.productSlug}"
				class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
				title="view product"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
					/>
				</svg>
			</a>
			<a
				href="#"
				class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
				title="Adicionar a wishlist"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
					/>
				</svg>
			</a> -->
		</div>
	</div>
	<div class="pt-4 pb-3 px-4 bg-white">
		<a href="/loja/categoria/{product.categorySlug}">
			<h4
				class="capitalize h-5 overflow-hidden leading-normal overflow-ellipsis font-medium text-sm mb-2 text-gray-400 hover:text-primary transition"
			>
				<span title={product.categoryName}>{product.categoryName}</span>
			</h4>
		</a>
		<a href="/loja/produto/{product.productSlug}">
			<h4
				class="uppercase h-24 overflow-hidden leading-tight overflow-ellipsis font-semibold text-lg mb-2 text-gray-800 hover:text-primary transition"
			>
				<span title={product.productName}>{product.productName}</span>
			</h4>
		</a>
		<div class="flex items-baseline mb-1 space-x-2">
			<p class="text-lg text-accent font-semibold">
				R${getLocalePrice(product.discountPrice || product.price)}
			</p>
			{#if product.discountPrice}
				<p class="text-sm text-gray-400 line-through">R${getLocalePrice(product.price)}</p>
			{/if}
		</div>
		<!-- TODO: Ver qual fica melhor.render. Talvez uma estrela média com uma nota seja ok -->
		<!-- <div class="flex items-center">
			<div class="flex gap-1 text-sm text-yellow-400">
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
						/>
					</svg>
				</span>
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-6 h-6"
					>
						<path
							fill-rule="evenodd"
							d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							fill-rule="evenodd"
							d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						class="w-4 h-4"
					>
						<path
							fill-rule="evenodd"
							d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</div>
			<div class="text-xs text-gray-500 ml-3">(150)</div>
		</div>-->
	</div>
	<button
		on:click={() => addToCart(product.productId)}
		class="btn btn-square w-full py-1.5 lg:py-2.5 text-center text-white bg-primary border border-primary rounded-b rounded-t-none hover:bg-transparent hover:text-primary transition flex justify-center items-center"
	>
		Adicionar
		<svg
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
		</svg>
	</button>
</div>

<style>
	.gallery--product--main :global(.splide__arrow) {
		height: 24px !important;
		width: 24px !important;
		padding: 5px !important;
		opacity: 0 !important;
		transition: opacity 0.3s ease-in-out;
	}

	:global(.group:hover .splide__arrow) {
		opacity: 1 !important;
	}
</style>
