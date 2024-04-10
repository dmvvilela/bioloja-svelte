<script lang="ts">
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
	import ProductCard from '$lib/components/product_card.svelte';
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import slide4 from '$lib/images/slides1/Slide4.jpg';
	import slide5 from '$lib/images/slides1/Slide5.jpg';
	import slide6 from '$lib/images/slides1/Slide6.jpg';
	import { getAllSlideImageUrls, getLocalePrice } from '$lib/utils/product';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { ProductType, ProductWithCategories, ProductWithCategory } from '$lib/utils/types';
	import '@splidejs/svelte-splide/css';

	export let data: PageData;

	const product = data.product as ProductWithCategories;
	const relatedProducts = data.relatedProducts as ProductWithCategory[];
	const images = getAllSlideImageUrls(product.image_urls);

	const related: ProductType[] = relatedProducts.map((relatedProduct) => ({
		productId: relatedProduct.products.id,
		productSlug: relatedProduct.products.slug,
		productName: relatedProduct.products.name,
		price: relatedProduct.products.price,
		imageUrls: relatedProduct.products.imageUrls,
		categoryId: relatedProduct.product_categories.categoryId,
		categoryName: relatedProduct.categories.name
	}));

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
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
				<h2 class="mt-1 text-gray-400">{product.category_names.join(' | ')}</h2>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
					<div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
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
				<div class="mt-3">
					<h3 class="sr-only">Avaliações</h3>
					<div class="flex items-center">
						<div class="flex items-center">
							<!-- Active: "text-indigo-500", Inactive: "text-gray-300" -->
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
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
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
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
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
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
							<svg
								class="h-5 w-5 flex-shrink-0 text-indigo-500"
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
						</div>
						<p class="sr-only">4 out of 5 stars</p>
					</div>
				</div>

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

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
							Ensino Médio | Ensino Superior | Apresentações
						</h4>
					</div>

					<div class="mt-10 flex">
						<button
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
					<h2 id="details-heading" class="sr-only">Additional details</h2>

					<div class="divide-y divide-gray-200 border-t">
						<div>
							<h3>
								<!-- Expand/collapse question button -->
								<button
									type="button"
									class="group relative flex w-full items-center justify-between py-6 text-left"
									aria-controls="disclosure-1"
									aria-expanded="false"
								>
									<!-- Open: "text-indigo-600", Closed: "text-gray-900" -->
									<span class="text-gray-900 text-sm font-medium">Features</span>
									<span class="ml-6 flex items-center">
										<!-- Open: "hidden", Closed: "block" -->
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
										<!-- Open: "block", Closed: "hidden" -->
										<svg
											class="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
										</svg>
									</span>
								</button>
							</h3>
							<div class="prose prose-sm pb-6" id="disclosure-1">
								<ul role="list">
									<li>Multiple strap configurations</li>
									<li>Spacious interior with top zip</li>
									<li>Leather handle and tabs</li>
									<li>Interior dividers</li>
									<li>Stainless strap loops</li>
									<li>Double stitched construction</li>
									<li>Water-resistant</li>
								</ul>
							</div>
						</div>

						<!-- More sections... -->
					</div>
				</section>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto">
	<Breadcrumbs />
	<div class="grid grid-cols-2 gap-6">
		<div>
			<img src={slide1} alt="product" class="w-full" />
			<div class="grid grid-cols-5 gap-4 mt-4">
				<img src={slide2} alt="product2" class="w-full cursor-pointer border border-primary" />
				<img src={slide3} alt="product2" class="w-full cursor-pointer border" />
				<img src={slide4} alt="product2" class="w-full cursor-pointer border" />
				<img src={slide5} alt="product2" class="w-full cursor-pointer border" />
				<img src={slide6} alt="product2" class="w-full cursor-pointer border" />
			</div>
		</div>

		<div>
			<h2 class="text-3xl font-medium uppercase mb-2">Sistema Digestório Humano</h2>
			<div class="flex items-center mb-4">
				<div class="flex gap-1 text-sm text-yellow-400">
					<span><i class="fa-solid fa-star" /></span>
					<span><i class="fa-solid fa-star" /></span>
					<span><i class="fa-solid fa-star" /></span>
					<span><i class="fa-solid fa-star" /></span>
					<span><i class="fa-solid fa-star" /></span>
				</div>
				<div class="text-xs text-gray-500 ml-3">(150 Avaliações)</div>
			</div>
			<div class="space-y-2">
				<p class="text-gray-800 font-semibold space-x-2">
					<span>Availability: </span>
					<span class="text-green-600">In Stock</span>
				</p>
				<p class="space-x-2">
					<span class="text-gray-800 font-semibold">Brand: </span>
					<span class="text-gray-600">Apex</span>
				</p>
				<p class="space-x-2">
					<span class="text-gray-800 font-semibold">Category: </span>
					<span class="text-gray-600">Sofa</span>
				</p>
				<p class="space-x-2">
					<span class="text-gray-800 font-semibold">SKU: </span>
					<span class="text-gray-600">BE45VGRT</span>
				</p>
			</div>
			<div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
				<p class="text-xl text-primary font-semibold">$45.00</p>
				<p class="text-base text-gray-400 line-through">$55.00</p>
			</div>

			<p class="mt-4 text-gray-600">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum reprehenderit dolore
				vel mollitia optio consequatur hic asperiores inventore suscipit, velit consequuntur,
				voluptate doloremque iure necessitatibus adipisci magnam porro.
			</p>

			<div class="pt-4">
				<h3 class="text-sm text-gray-800 uppercase mb-1">Size</h3>
				<div class="flex items-center gap-2">
					<div class="size-selector">
						<input type="radio" name="size" id="size-xs" class="hidden" />
						<label
							for="size-xs"
							class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
							>XS</label
						>
					</div>
					<div class="size-selector">
						<input type="radio" name="size" id="size-sm" class="hidden" />
						<label
							for="size-sm"
							class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
							>S</label
						>
					</div>
					<div class="size-selector">
						<input type="radio" name="size" id="size-m" class="hidden" />
						<label
							for="size-m"
							class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
							>M</label
						>
					</div>
					<div class="size-selector">
						<input type="radio" name="size" id="size-l" class="hidden" />
						<label
							for="size-l"
							class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
							>L</label
						>
					</div>
					<div class="size-selector">
						<input type="radio" name="size" id="size-xl" class="hidden" />
						<label
							for="size-xl"
							class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
							>XL</label
						>
					</div>
				</div>
			</div>

			<div class="pt-4">
				<h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
				<div class="flex items-center gap-2">
					<div class="color-selector">
						<input type="radio" name="color" id="red" class="hidden" />
						<label
							for="red"
							class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
							style="background-color: #fc3d57;"
						/>
					</div>
					<div class="color-selector">
						<input type="radio" name="color" id="black" class="hidden" />
						<label
							for="black"
							class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
							style="background-color: #000;"
						/>
					</div>
					<div class="color-selector">
						<input type="radio" name="color" id="white" class="hidden" />
						<label
							for="white"
							class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
							style="background-color: #fff;"
						/>
					</div>
				</div>
			</div>

			<div class="mt-4">
				<h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
				<div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
					<div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
						-
					</div>
					<div class="h-8 w-8 text-base flex items-center justify-center">4</div>
					<div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
						+
					</div>
				</div>
			</div>

			<div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
				<a
					href="#"
					class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
				>
					<i class="fa-solid fa-bag-shopping" /> Add to cart
				</a>
				<a
					href="#"
					class="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
				>
					<i class="fa-solid fa-heart" /> Wishlist
				</a>
			</div>

			<div class="flex gap-3 mt-4">
				<a
					href="#"
					class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
				>
					<i class="fa-brands fa-facebook-f" />
				</a>
				<a
					href="#"
					class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
				>
					<i class="fa-brands fa-twitter" />
				</a>
				<a
					href="#"
					class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
				>
					<i class="fa-brands fa-instagram" />
				</a>
			</div>
		</div>
	</div>
	<!-- ./product-detail -->

	<!-- description -->
	<div class="pb-16">
		<h3 class="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
			Product details
		</h3>
		<div class="w-3/5 pt-6">
			<div class="text-gray-600">
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur necessitatibus deleniti
					natus dolore cum maiores suscipit optio itaque voluptatibus veritatis tempora iste facilis
					non aut sapiente dolor quisquam, ex ab.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, quae accusantium
					voluptatem blanditiis sapiente voluptatum. Autem ab, dolorum assumenda earum veniam eius
					illo fugiat possimus illum dolor totam, ducimus excepturi.
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quia modi ut expedita! Iure
					molestiae labore cumque nobis quasi fuga, quibusdam rem? Temporibus consectetur corrupti
					rerum veritatis numquam labore amet.
				</p>
			</div>

			<table class="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
				<tr>
					<th class="py-2 px-4 border border-gray-300 w-40 font-medium">Color</th>
					<th class="py-2 px-4 border border-gray-300">Blank, Brown, Red</th>
				</tr>
				<tr>
					<th class="py-2 px-4 border border-gray-300 w-40 font-medium">Material</th>
					<th class="py-2 px-4 border border-gray-300">Latex</th>
				</tr>
				<tr>
					<th class="py-2 px-4 border border-gray-300 w-40 font-medium">Weight</th>
					<th class="py-2 px-4 border border-gray-300">55kg</th>
				</tr>
			</table>
		</div>
	</div>
	<!-- ./description -->

	<!-- related product -->
	<div class="pb-16">
		<h2 class="text-2xl font-semibold tracking-tight text-gray-800 uppercase mb-6">
			Produtos Relacionados
		</h2>
		<div class="grid grid-cols-4 gap-6">
			{#each related as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
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
