<script lang="ts">
	import logo from '$lib/images/logo/icon.png';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../$types';

	export let form: ActionData;

	$: message = (form as any)?.message;
</script>

<svelte:head>
	<title>Redefina sua senha - Bioloja</title>
	<meta name="description" content="Confirme sua nova senha." />
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-20 sm:px-6 lg:px-8 bg-gray-50">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-20 w-auto" src={logo} alt="Bioloja" />
	</div>

	<div class="mt-10 mb-11 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<h2 class="text-2xl uppercase font-medium mb-1">Redefina sua senha</h2>
			<p class="text-gray-600 mb-6 text-sm">Confirme sua nova senha</p>

			<form class="space-y-6" method="POST" use:enhance>
				<div>
					<label for="password" class="block text-sm font-medium leading-6 text-secondary"
						>Senha</label
					>
					<div class="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							required
							class="block w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<label for="confirm" class="block text-sm font-medium leading-6 text-secondary"
						>Confirmar senha</label
					>
					<div class="mt-2">
						<input
							id="confirm"
							name="confirm"
							type="password"
							class="block w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
							required
						/>
					</div>
				</div>

				<div class="pt-1.5">
					<button
						type="submit"
						class="flex w-full uppercase justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 border border-primary text-white shadow-sm hover:bg-transparent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>Enviar</button
					>
				</div>

				{#if message}
					<div class="mt-4">
						<div class="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2.5" role="alert">
							<p class="font-medium text-sm">{message}</p>
						</div>
					</div>
				{/if}
			</form>
		</div>
	</div>
</div>
