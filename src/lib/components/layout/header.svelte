<script lang="ts">
	import logo from '$lib/images/logo/full.png';
	import { categories } from '$lib/utils/data';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { showToast } from '$lib/utils/toast';

	$: isLoggedIn = !!$page.data.user;
	$: isAdmin = $page.data.user?.role === 'ADMIN';
	$: cartItemsCount = $page.data.cartItemsCount;

	let query = '';

	const logOut = async () => {
		showToast(
			new Promise((resolve, reject) => {
				(async () => {
					await fetch('/sair', { method: 'POST' });
					invalidateAll();
					resolve({});
				})();
			}),
			{
				loading: 'Saindo...',
				success: 'Deslogado!',
				error: 'Ocorreu um problema.'
			}
		);
	};
</script>

<header class="py-4 shadow-sm bg-white">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/">
			<img src={logo} alt="Logo" class="w-[11.5rem] mb-1" />
		</a>

		<form
			class="hidden lg:flex w-full max-w-xl relative items-center"
			on:submit|preventDefault={() => goto('/loja?q=' + query)}
		>
			<span class="absolute left-[14px] text-lg text-gray-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.1"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</span>
			<input
				type="text"
				name="search"
				id="search"
				class="w-full border border-primary border-r-[0.5px] pl-12 py-3 pr-3 rounded-l-md focus:outline-none focus:border-primary focus:ring-primary hidden md:flex"
				placeholder="Pesquise em toda a Bioloja"
				autocomplete="off"
				bind:value={query}
			/>
			<button
				class="bg-primary border border-primary tracking-[-0.02em] text-white px-8 py-3 rounded-r-md hover:bg-transparent hover:text-primary transition active:scale-95 hidden md:flex uppercase"
				>Pesquisar</button
			>
		</form>

		<div class="flex items-center space-x-6 pr-6 sm:pr-2">
			<!-- <a
				href="/wishlist"
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.8"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
					/>
				</svg>

				<div class="text-xs leading-3 mt-1">Wishlist</div>
				<div
					class="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs"
				>
					8
				</div>
			</a> -->
			<a
				href="/carrinho"
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<!-- <div class="text-2xl">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
						><path
							d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
						/></svg
					>
				</div> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-7 h-7"
				>
					<path
						fill-rule="evenodd"
						d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
						clip-rule="evenodd"
					/>
				</svg>

				<div class="text-xs leading-3 mt-1">Carrinho</div>
				{#if cartItemsCount}
					<div
						class="absolute right-0.5 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs"
					>
						{cartItemsCount}
					</div>
				{/if}
			</a>
			<a
				href={isLoggedIn ? '/minha-conta' : '/entrar'}
				class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
			>
				<!-- <div class="text-2xl">
					<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"
						><path
							d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
						/></svg
					>
				</div> -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.6"
					stroke="currentColor"
					class="w-7 h-7"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>

				<div class="text-xs leading-3 mt-1">Conta</div>
			</a>
			{#if isAdmin}
				<a
					href="/admin"
					class="text-center text-gray-700 hover:text-primary transition relative flex flex-col items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-7 h-7"
					>
						<path
							fill-rule="evenodd"
							d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
							clip-rule="evenodd"
						/>
					</svg>

					<div class="text-xs leading-3 mt-1">Admin</div>
				</a>
			{/if}
		</div>
	</div>
</header>

<nav class="bg-secondary">
	<div class="container mx-auto flex">
		<div class="px-8 py-4 bg-primary flex items-center cursor-pointer relative group/parent">
			<span class="text-secondary">
				<svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 448 512"
					><path
						fill="currentColor"
						d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
					/></svg
				>
			</span>
			<span class="capitalize ml-4 text-secondary font-medium hidden lg:block">Categorias</span>

			<!-- dropdown -->
			<div
				class="absolute w-72 left-0 z-10 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover/parent:opacity-100 transition duration-300 invisible group-hover/parent:visible"
			>
				{#each categories as category}
					<div class="group/child relative">
						<a
							href="/loja/categoria/{category.slug}"
							class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
						>
							<span class="ml-6 text-gray-600 text-sm">{category.name}</span>

							{#if category.subcategories && category.subcategories.length > 0}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-4 h-4 ml-auto text-gray-500"
								>
									<path
										fill-rule="evenodd"
										d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</a>

						{#if category.subcategories && category.subcategories.length > 0}
							<!-- Subcategories dropdown -->
							<div
								class="absolute left-full top-0 w-64 z-20 bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover/child:opacity-100 transition duration-300 invisible group-hover/child:visible"
							>
								{#each category.subcategories as subcategory}
									<a
										href="/loja/categoria/{category.slug}/{subcategory.slug}"
										class="flex items-center px-6 py-3 hover:bg-gray-100 transition"
									>
										<span class="ml-6 text-gray-600 text-sm">{subcategory.name}</span>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="flex items-center justify-between flex-grow pl-2 lg:pl-8 py-5">
			<div class="items-center space-x-6 capitalize text-[15px] text-slate-200 flex">
				<!-- <span class="md:ml-0 lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.1"
						stroke="currentColor"
						class="w-6 h-6 text-slate-200 hover:text-white cursor-pointer"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</span> -->
				<a href="/" class="hover:text-white transition hidden lg:block">Início</a>
				<a href="/loja" class="hover:text-white transition">Loja</a>
				<a href="/sobre-nos" class="hover:text-white transition hidden md:block">Sobre Nós</a>
				<a href="/faq" class="hover:text-white transition hidden sm:block">Dúvidas</a>
				<a href="/contato" class="hover:text-white transition hidden sm:block">Contato</a>
			</div>
			{#if isLoggedIn}
				<div class="text-slate-200 font-medium md:text-[15px] pr-6 sm:pr-2 text-sm uppercase">
					<button on:click={logOut} class="hover:text-white transition">Sair</button>
				</div>
			{/if}
			{#if !isLoggedIn}
				<div class="text-slate-200 font-medium md:text-[15px] mr-4 md:mr-0 text-sm uppercase">
					<a href="/entrar" class="hover:text-white transition">Entrar</a> |
					<a href="/cadastrar" class="hover:text-white transition">Cadastrar</a>
				</div>
			{/if}
		</div>
	</div>
</nav>
