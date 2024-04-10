<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { user } = data;

	let menuOpen = false;

	const logOut = async () => {
		console.log('Saindo...');
		await fetch('/sair', { method: 'POST' });
		invalidateAll();
	};
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
				<li
					class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-primary hover:text-white"
				>
					Detalhes
				</li>
				<li
					class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-primary hover:text-white"
				>
					Pedidos
				</li>
				<li
					class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-primary hover:text-white"
				>
					Downloads
				</li>
			</ul>
		</div>

		<div class="col-span-2 hidden sm:block text-secondary">
			<ul>
				<li
					class="mt-5 cursor-pointer border-l-2 border-l-primary px-2 py-2 font-semibold text-primary transition hover:border-l-primary hover:text-primary"
				>
					Detalhes
				</li>
				<li
					class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-primary hover:text-primary"
				>
					Pedidos
				</li>
				<li
					class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-primary hover:text-primary"
				>
					Downloads
				</li>
				<li
					class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-primary hover:text-primary"
				>
					Endereços
				</li>
				<li
					class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition text-red-500 hover:border-l-primary hover:text-primary"
				>
					Sair
				</li>
			</ul>
		</div>

		<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
			<div class="pt-4">
				<h1 class="py-2 text-2xl font-semibold">Detalhes da conta</h1>
				<!-- <p class="font- text-slate-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> -->
			</div>
			<hr class="mt-4 mb-8" />
			<p class="py-2 text-xl font-semibold">E-mail</p>
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<p class="text-gray-600">Seu e-mail é <strong>{user.email}</strong>.</p>
			</div>
			<hr class="mt-4 mb-8" />
			<p class="py-2 text-xl font-semibold">Nome Completo</p>
			<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<p class="text-accent">Seu nome é <strong>{user.name}</strong>.</p>
				<button class="inline-flex text-sm font-semibold text-bioloja-600 underline decoration-2"
					>Editar</button
				>
			</div>
			<hr class="mt-4 mb-8" />
			<p class="py-2 text-xl font-semibold">Senha</p>
			<div class="flex items-center">
				<div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
					<label for="login-password">
						<span class="text-sm text-gray-500">Current Password</span>
						<div
							class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-bioloja-600"
						>
							<input
								type="password"
								id="login-password"
								class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
								placeholder="***********"
							/>
						</div>
					</label>
					<label for="login-password">
						<span class="text-sm text-gray-500">New Password</span>
						<div
							class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-bioloja-600"
						>
							<input
								type="password"
								id="login-password"
								class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
								placeholder="***********"
							/>
						</div>
					</label>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
					/>
				</svg>
			</div>
			<p class="mt-2">
				Can't remember your current password. <a
					class="text-sm font-semibold text-bioloja-600 underline decoration-2"
					href="#">Recover Account</a
				>
			</p>
			<button
				class="mt-4 rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-bioloja-700"
				>Save Password</button
			>
			<hr class="mt-4 mb-8" />

			<div class="mb-10">
				<p class="py-2 text-xl font-semibold">Delete Account</p>
				<p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					Proceed with caution
				</p>
				<p class="mt-2">
					Make sure you have taken backup of your account in case you ever need to get access to
					your data. We will completely wipe your data. There is no way to access your account after
					this action.
				</p>
				<button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
					>Continue with deletion</button
				>
			</div>
		</div>
	</div>
</div>
