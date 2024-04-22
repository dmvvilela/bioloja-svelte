<script lang="ts">
	import logo from '$lib/images/logo/icon.png';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../$types';

	export let form: ActionData;

	$: value = (form as any)?.email;
	$: message = (form as any)?.message;
	$: success = (form as any)?.success;
</script>

<svelte:head>
	<title>Esqueci a Senha - Bioloja</title>
	<meta name="description" content="Redefina sua senha." />
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-16 sm:px-6 lg:px-8 bg-gray-50">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-20 w-auto" src={logo} alt="Bioloja" />
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<h2 class="text-2xl uppercase font-medium mb-1">Esqueci a senha</h2>
			<p class="text-gray-600 mb-6 text-sm">Redefina sua senha</p>
			<p class="text-gray-600 mb-6 text-sm">
				Envie seu e-mail no campo abaixo para receber as instruções de redefinição de senha.
			</p>
			<form class="space-y-6" method="POST" use:enhance>
				<div>
					<label for="email" class="block text-sm font-medium leading-6 text-secondary"
						>E-mail</label
					>
					<div class="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							class="block w-full rounded-md border-0 py-1.5 text-secondary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
							value={value ?? ''}
							required
						/>
					</div>
				</div>

				<div>
					<button
						type="submit"
						class="flex w-full uppercase justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 border border-primary text-white shadow-sm hover:bg-transparent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						>Enviar</button
					>
				</div>

				{#if success}
					<p class="mt-10 mb-6 text-sm text-gray-500">
						Enviado! Caso esteja cadastrado, você receberá um e-mail com instruções de redefinição
						de senha em breve.
					</p>
				{/if}

				{#if message}
					<div class="mt-4">
						<div class="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2.5" role="alert">
							<p class="font-medium text-sm">{message}</p>
						</div>
					</div>
				{/if}
			</form>
		</div>

		<p class="mt-10 mb-6 text-center text-sm text-gray-500">
			Ou então, voltar e
			<a href="/entrar" class="font-semibold leading-6 text-primary hover:text-secondary">Entrar</a
			>.
		</p>
	</div>
</div>
