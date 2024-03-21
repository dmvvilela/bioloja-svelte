<script lang="ts">
	export let slide: string;

	// TODO: Make the fa links arrows to change slide like wimoveis
</script>

<div class="bg-white shadow rounded overflow-hidden group">
	<div class="relative">
		<img src={slide} alt="product 1" class="w-full" />
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
			<h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
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
