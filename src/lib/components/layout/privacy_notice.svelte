<script lang="ts">
	import { onMount } from 'svelte';

	let accepted = true;

	onMount(() => {
		if (!localStorage.getItem('cookies-accepted')) {
			accepted = false;
		}
	});

	function acceptCookies() {
		localStorage.setItem('cookies-accepted', 'true');
		accepted = true;
	}
</script>

{#if !accepted}
	<div
		class="fixed inset-x-0 bottom-0 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8"
	>
		<p class="max-w-4xl text-sm leading-6 text-gray-900">
			Este site utiliza cookies para melhorar a sua experiência. Eles nos ajudam a personalizar o
			conteúdo e aprimorar a funcionalidade do site. Caso queira saber mais, veja nossa <a
				href="/politica-de-privacidade"
				class="font-semibold text-afh-orange"
			>
				política de privacidade
			</a>
			.
		</p>
		<div class="flex flex-none items-center gap-x-5">
			<button
				type="button"
				class="rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
				on:click={acceptCookies}>Aceitar</button
			>
			<button
				type="button"
				class="text-sm font-medium leading-6 text-gray-900"
				on:click={acceptCookies}
			>
				Rejeitar opcionais</button
			>
		</div>
	</div>
{/if}
