<script lang="ts">
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import slide4 from '$lib/images/slides1/Slide4.jpg';
	import slide5 from '$lib/images/slides1/Slide5.jpg';
	import slide6 from '$lib/images/slides1/Slide6.jpg';
	import slide7 from '$lib/images/slides1/Slide7.jpg';
	import slide8 from '$lib/images/slides1/Slide8.jpg';
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
		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide1} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>

		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide2} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>

		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide3} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>

		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide4} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>

		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide5} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>

		<div class="bg-white shadow rounded overflow-hidden group">
			<div class="relative">
				<img src={slide6} alt="product 1" class="w-full" />
				<div
					class="absolute inset-0 bg-black bg-opacity-40 flex items-center
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
				>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="view product"
					>
						<i class="fa-solid fa-magnifying-glass" />
					</a>
					<a
						href="#"
						class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
						title="add to wishlist"
					>
						<i class="fa-solid fa-heart" />
					</a>
				</div>
			</div>
			<div class="pt-4 pb-3 px-4">
				<a href="#">
					<h4
						class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
					>
						Guyer Chair
					</h4>
				</a>
				<div class="flex items-baseline mb-1 space-x-2">
					<p class="text-xl text-primary font-semibold">$45.00</p>
					<p class="text-sm text-gray-400 line-through">$55.90</p>
				</div>
				<div class="flex items-center">
					<div class="flex gap-1 text-sm text-yellow-400">
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
						<span><i class="fa-solid fa-star" /></span>
					</div>
					<div class="text-xs text-gray-500 ml-3">(150)</div>
				</div>
			</div>
			<a
				href="#"
				class="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
				>Add to cart</a
			>
		</div>
	</div>
</div>
