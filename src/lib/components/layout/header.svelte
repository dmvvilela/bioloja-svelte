<script lang="ts">
	import logo from '$lib/images/logo/full.png';
</script>

<header class="py-4 shadow-sm bg-white">
	<div class="container mx-auto flex items-center justify-between">
		<a href="index.html">
			<img src={logo} alt="Logo" class="w-44 mb-1" />
		</a>

		<div class="w-full max-w-xl relative flex items-center">
			<span class="absolute left-4 text-lg text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
					<path
						d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
					/>
				</svg>
			</span>
			<input
				type="text"
				name="search"
				id="search"
				class="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
				placeholder="Pesquise em toda a Bioloja"
				autocomplete="off"
			/>
			<button
				class="bg-primary border border-primary text-white px-8 py-3 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex"
				>Pesquisar</button
			>
		</div>

		<div class="flex items-center space-x-6">
			<a
				href="#"
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<div class="text-2xl">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"
						><path
							d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
						/></svg
					>
				</div>
				<div class="text-xs leading-3 mt-1">Wishlist</div>
				<div
					class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs"
				>
					8
				</div>
			</a>
			<a
				href="#"
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<div class="text-2xl">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
						><path
							d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
						/></svg
					>
				</div>
				<div class="text-xs leading-3 mt-1">Carrinho</div>
				<div
					class="absolute right-0.5 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs"
				>
					2
				</div>
			</a>
			<a
				href="#"
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<div class="text-2xl">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
						><path
							d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
						/></svg
					>
				</div>
				<div class="text-xs leading-3 mt-1">Conta</div>
			</a>
		</div>
	</div>
</header>

<nav class="bg-gray-800">
	<div class="container mx-auto flex">
		<div class="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
			<span class="text-white">
				<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"
					><path
						d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
					/></svg
				>
			</span>
			<span class="capitalize ml-2 text-white hidden">Todas as Categorias</span>

			<!-- dropdown -->
			<div
				class="absolute w-48 left-0 z-10 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible"
			>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img src="assets/images/icons/sofa.svg" alt="sofa" class="w-5 h-5 object-contain" />
					<span class="ml-6 text-gray-600 text-sm">Sofa</span>
				</a>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img src="assets/images/icons/terrace.svg" alt="terrace" class="w-5 h-5 object-contain" />
					<span class="ml-6 text-gray-600 text-sm">Terarce</span>
				</a>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img src="assets/images/icons/bed.svg" alt="bed" class="w-5 h-5 object-contain" />
					<span class="ml-6 text-gray-600 text-sm">Bed</span>
				</a>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img src="assets/images/icons/office.svg" alt="office" class="w-5 h-5 object-contain" />
					<span class="ml-6 text-gray-600 text-sm">office</span>
				</a>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img
						src="assets/images/icons/outdoor-cafe.svg"
						alt="outdoor"
						class="w-5 h-5 object-contain"
					/>
					<span class="ml-6 text-gray-600 text-sm">Outdoor</span>
				</a>
				<a href="#" class="flex items-center px-6 py-3 hover:bg-gray-100 transition">
					<img src="assets/images/icons/bed-2.svg" alt="Mattress" class="w-5 h-5 object-contain" />
					<span class="ml-6 text-gray-600 text-sm">Mattress</span>
				</a>
			</div>
		</div>

		<div class="flex items-center justify-between flex-grow md:pl-12 py-5">
			<div class="flex items-center space-x-6 capitalize">
				<a href="index.html" class="text-gray-200 hover:text-white transition">Home</a>
				<a href="pages/shop.html" class="text-gray-200 hover:text-white transition">Shop</a>
				<a href="#" class="text-gray-200 hover:text-white transition">About us</a>
				<a href="#" class="text-gray-200 hover:text-white transition">Contact us</a>
			</div>
			<a href="pages/login.html" class="text-gray-200 hover:text-white transition font-medium"
				>Entrar</a
			>
		</div>
	</div>
</nav>
