<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	$: path = $page.route.id;

	let title: string;
	$: {
		const menuItem = menus.find((menu) => path?.endsWith(menu.path));
		title = menuItem ? menuItem.title : ' - ';
	}

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

<div class="mx-4 max-w-screen-xl py-16 mb-10 md:mx-8 xl:mx-auto">
	<h1 class="border-b py-6 text-4xl font-semibold">Minha Conta</h1>
	<div class="grid grid-cols-8 pt-3 md:grid-cols-10">
		<div class="relative my-4 w-56 md:hidden">
			<div class="dropdown w-56">
				<div
					tabindex="0"
					role="button"
					class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-primary peer-checked:ring"
				>
					{title}
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
				</div>

				<ul class="dropdown-content z-[1] menu p-2 shadow bg-white w-52">
					{#each menus as menu}
						<a href={menu.path}>
							<li
								class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-base-100 rounded-box"
							>
								{menu.title}
							</li>
						</a>
					{/each}
					<li>
						<button
							class="!text-red-500 cursor-pointer px-3 py-2 text-sm hover:bg-base-100"
							on:click={logOut}>Sair</button
						>
					</li>
				</ul>
			</div>
		</div>

		<div class="col-span-2 hidden md:block text-secondary">
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
