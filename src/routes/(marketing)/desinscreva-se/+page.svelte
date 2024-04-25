<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let email = form?.email ?? $page.url.searchParams.get('email') ?? '';
	let unsubForm: HTMLFormElement;

	$: success = form?.success;
	$: missing = form?.missing;
	$: resubscribed = form?.resubscribed;
	$: console.log(form);

	onMount(async () => {
		if (email.length && !success && !missing && !resubscribed) {
			unsubForm.submit();
		}
	});
</script>

<svelte:head>
	<title>Desinscreva-se da Nossa Lista de E-mails</title>
	<meta
		name="description"
		content="Cancele sua inscrição caso não deseje mais receber nossos e-mails."
	/>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-gray-100">
	{#if success || resubscribed}
		<div class="rounded bg-white px-8 py-8 shadow-md">
			<h1 class="mb-4 text-2xl font-bold">Inscrição cancelada</h1>
			<p class="mb-4 text-gray-700">Seu e-mail foi removido com sucesso da nossa lista.</p>
			<form method="POST" action="?/resubscribe" use:enhance>
				<p class="mt-8 text-gray-500">
					Foi um engano?<br />Clique abaixo para se inscrever novamente.
				</p>
				<input id="email" name="email" type="hidden" bind:value={email} />
				{#if !resubscribed}
					<button
						class="btn btn-primary focus:shadow-outline rounded mt-4 text-white hover:bg-afh-accent focus:outline-none"
					>
						Reinscreva-se
					</button>
				{:else}
					<p class="mt-8 text-green-500">Você está em nossa lista novamente!</p>
				{/if}
			</form>
		</div>
	{:else}
		<div class="rounded bg-white px-8 py-8 shadow-md max-w-2xl">
			<h1 class="mb-6 text-2xl font-bold text-primary">Cancelar Inscrição</h1>
			<p class="mb-8 text-gray-700">
				Digite seu endereço de e-mail para cancelar sua inscrição em nossa lista:
			</p>
			<form method="POST" action="?/unsubscribe" bind:this={unsubForm} use:enhance>
				<div class="mb-4 max-w-sm">
					<label class="mb-2 block font-bold text-primary" for="email">E-mail:</label>
					<input
						class="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none focus:border-primary focus:ring-primary"
						id="email"
						name="email"
						type="email"
						placeholder="seuemail@exemplo.com"
						bind:value={email}
						required
					/>
				</div>
				<div class="flex items-center justify-between">
					<button
						class="btn btn-primary focus:shadow-outline rounded text-white hover:bg-afh-accent focus:outline-none"
					>
						Cancelar inscrição
					</button>
				</div>
				{#if missing}
					<p class="mt-4 text-red-500">Este e-mail não está cadastrado em nossa lista.</p>
				{/if}
			</form>
		</div>
	{/if}
</main>
