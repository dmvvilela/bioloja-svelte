<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	$: path = $page.route.id;

	let menuOpen = false;

	const logOut = async () => {
		await fetch('/sair', { method: 'POST' });
		invalidateAll();
	};

	const menus = [
		{
			title: 'Detalhes',
			path: '/minha-conta'
		},
		{
			title: 'Pedidos',
			path: '/minha-conta/pedidos'
		},
		{
			title: 'Downloads',
			path: '/minha-conta/downloads'
		}
	];

	$: classes = (menu: any) =>
		path?.endsWith(menu.path) ? 'border-l-primary text-primary' : 'border-transparent';
</script>

<div class="mx-4 max-w-screen-xl py-16 mb-10 sm:mx-8 xl:mx-auto">
	<h1 class="border-b py-6 text-4xl font-semibold">Minha Conta</h1>
	<div class="grid grid-cols-8 pt-3 sm:grid-cols-10">
		<div class="relative my-4 w-56 sm:hidden">
			<label
				for="select-1"
				class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-primary peer-checked:ring"
				>Detalhes
			</label>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
			<ul
				class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3"
			>
				{#each menus as menu}
					<li
						class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-primary hover:text-white"
					>
						{menu.title}
					</li>
				{/each}
				<li class="text-red-500 cursor-pointer px-3 py-2 text-sm hover:bg-primary hover:text-white">
					<button on:click={logOut}>Sair</button>
				</li>
			</ul>
		</div>

		<div class="col-span-2 hidden sm:block text-secondary">
			<ul>
				{#each menus as menu}
					<a href={menu.path}>
						<li
							class="{classes(
								menu
							)} mt-5 cursor-pointer border-l-2 px-2 py-1.5 my-0.5 font-semibold transition hover:border-l-primary hover:text-primary"
						>
							{menu.title}
						</li>
					</a>
				{/each}
				<li
					class="text-red-500 mt-5 cursor-pointer border-l-2 border-transparent px-2 py-1 my-1 font-semibold transition hover:border-l-red-500"
				>
					<button on:click={logOut}>Sair</button>
				</li>
			</ul>
		</div>
		<slot />
	</div>
</div>
