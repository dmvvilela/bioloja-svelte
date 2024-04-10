<script lang="ts">
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
	import ProductCard from '$lib/components/product_card.svelte';
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import slide4 from '$lib/images/slides1/Slide4.jpg';
	import slide5 from '$lib/images/slides1/Slide5.jpg';
	import slide6 from '$lib/images/slides1/Slide6.jpg';
	import { getLocalePrice, getSlideImageUrl } from '$lib/utils/product';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import type { PageData } from './$types';
	import '@splidejs/svelte-splide/css';

	export let data: PageData;

	$: product = data.product;
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			<div class="flex flex-col-reverse">
				<Splide aria-label="My Favorite Images">
					<SplideSlide>
						<img src={getSlideImageUrl(product.imageUrls)} alt="Slide 1" />
					</SplideSlide>
					<SplideSlide>
						<img src={getSlideImageUrl(product.imageUrls, 1)} alt="Slide 2" />
					</SplideSlide>
				</Splide>
				<!-- Image selector -->
				<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<!-- <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
						<button
							id="tabs-1-tab-1"
							class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
							aria-controls="tabs-1-panel-1"
							role="tab"
							type="button"
						>
							<span class="sr-only">Angled view</span>
							<span class="absolute inset-0 overflow-hidden rounded-md">
								<img
									src={getSlideImageUrl(product.imageUrls)}
									alt=""
									class="h-full w-full object-cover object-center"
								/>
							</span>
							<span
								class="ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
								aria-hidden="true"
							/>
						</button> -->

					<!-- </div> -->
				</div>

				<div class="aspect-h-1 w-full">
					<!-- Tab panel, show/hide based on tab state. -->
					<!-- <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
						<img
							src={getSlideImageUrl(product.imageUrls)}
							alt="Angled front view with bag zipped and handles upright."
							class="h-full object-contain aspect-video object-center sm:rounded-lg"
						/>
					</div> -->

					<!-- <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
						<img
							src={getSlideImageUrl(product.imageUrls, 1)}
							alt="Angled front view with bag zipped and handles upright."
							class="h-full w-full object-cover object-center sm:rounded-lg"
						/>
					</div> -->
				</div>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
					<p class="text-3xl tracking-tight text-gray-900">R${getLocalePrice(product.price)}</p>
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
							{@html product.shortDescription}
						</p>
					</div>
				</div>

				<form class="mt-6">
					<!-- Colors -->
					<div>
						<h3 class="text-sm text-gray-600">Color</h3>

						<fieldset class="mt-2">
							<legend class="sr-only">Choose a color</legend>
							<span class="flex items-center space-x-3">
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700"
								>
									<input
										type="radio"
										name="color-choice"
										value="Washed Black"
										class="sr-only"
										aria-labelledby="color-choice-0-label"
									/>
									<span id="color-choice-0-label" class="sr-only">Washed Black</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 bg-gray-700 rounded-full border border-black border-opacity-10"
									/>
								</label>
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400"
								>
									<input
										type="radio"
										name="color-choice"
										value="White"
										class="sr-only"
										aria-labelledby="color-choice-1-label"
									/>
									<span id="color-choice-1-label" class="sr-only">White</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"
									/>
								</label>
								<!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                -->
								<label
									class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-500"
								>
									<input
										type="radio"
										name="color-choice"
										value="Washed Gray"
										class="sr-only"
										aria-labelledby="color-choice-2-label"
									/>
									<span id="color-choice-2-label" class="sr-only">Washed Gray</span>
									<span
										aria-hidden="true"
										class="h-8 w-8 bg-gray-500 rounded-full border border-black border-opacity-10"
									/>
								</label>
							</span>
						</fieldset>
					</div>

					<div class="mt-10 flex">
						<button
							type="submit"
							class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
							>Add to bag</button
						>

						<button
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
							<span class="sr-only">Add to favorites</span>
						</button>
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
		<h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Produtos Relacionados</h2>
		<div class="grid grid-cols-4 gap-6">
			<!-- <ProductCard slide={slide1} />
			<ProductCard slide={slide2} />
			<ProductCard slide={slide3} />
			<ProductCard slide={slide4} /> -->
		</div>
	</div>
</div>
