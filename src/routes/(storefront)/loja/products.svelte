<script lang="ts">
	import ProductCard from '$lib/components/product_card.svelte';
</script>

<div class="col-span-3">
	<div class="flex items-center mb-4">
		<select
			name="sort"
			id="sort"
			class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
		>
			<option value="">Default sorting</option>
			<option value="price-low-to-high">Price low to high</option>
			<option value="price-high-to-low">Price high to low</option>
			<option value="latest">Latest product</option>
		</select>

		<div class="flex gap-2 ml-auto">
			<div
				class="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-4 h-4"
				>
					<path
						fill-rule="evenodd"
						d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div
				class="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						fill-rule="evenodd"
						d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</div>
	</div>

	<div class="grid md:grid-cols-3 grid-cols-2 gap-6">
		<!-- <ProductCard slide={slide1} />
		<ProductCard slide={slide2} />
		<ProductCard slide={slide3} />
		<ProductCard slide={slide4} />
		<ProductCard slide={slide5} />
		<ProductCard slide={slide6} />
		<ProductCard slide={slide7} />
		<ProductCard slide={slide8} /> -->
	</div>
</div>
