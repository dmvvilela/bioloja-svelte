<script lang="ts">
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
</script>

<div class="col-span-9 space-y-4">
	<div class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
		<div class="w-28">
			<img src={slide1} alt="product 6" class="w-full" />
		</div>
		<div class="w-1/3">
			<h2 class="text-gray-800 text-xl font-medium uppercase">Italian L shape</h2>
			<p class="text-gray-500 text-sm">
				Availability: <span class="text-green-600">In Stock</span>
			</p>
		</div>
		<div class="text-primary text-lg font-semibold">$320.00</div>
		<a
			href="#"
			class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
			>add to cart</a
		>

		<div class="text-gray-600 cursor-pointer hover:text-primary">
			<i class="fa-solid fa-trash" />
		</div>
	</div>

	<div class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
		<div class="w-28">
			<img src={slide2} alt="product 6" class="w-full" />
		</div>
		<div class="w-1/3">
			<h2 class="text-gray-800 text-xl font-medium uppercase">Dining Table</h2>
			<p class="text-gray-500 text-sm">
				Availability: <span class="text-green-600">In Stock</span>
			</p>
		</div>
		<div class="text-primary text-lg font-semibold">$320.00</div>
		<a
			href="#"
			class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
			>add to cart</a
		>

		<div class="text-gray-600 cursor-pointer hover:text-primary">
			<i class="fa-solid fa-trash" />
		</div>
	</div>

	<div class="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
		<div class="w-28">
			<img src={slide3} alt="product 6" class="w-full" />
		</div>
		<div class="w-1/3">
			<h2 class="text-gray-800 text-xl font-medium uppercase">Sofa</h2>
			<p class="text-gray-500 text-sm">
				Availability: <span class="text-red-600">Out of Stock</span>
			</p>
		</div>
		<div class="text-primary text-lg font-semibold">$320.00</div>
		<a
			href="#"
			class="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
			>add to cart</a
		>

		<div class="text-gray-600 cursor-pointer hover:text-primary">
			<i class="fa-solid fa-trash" />
		</div>
	</div>
</div>
