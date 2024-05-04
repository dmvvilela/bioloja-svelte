<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="grid min-h-full place-items-center bg-white px-6 py-32 sm:py-60 lg:px-8">
	<div class="text-center">
		{#if $page?.status}
			<p class="text-base font-semibold text-primary">Erro {$page?.status}</p>
		{/if}
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
			{#if $page?.error?.message}
				{$page?.error?.message}
			{:else if $page.status === 404}
				Página não encontrada
			{:else}
				Ocorreu um erro
			{/if}
		</h1>
		<p class="mt-6 text-base leading-7 text-gray-600">
			Procurando algum material? Experimente buscá-lo em nossa <span class="font-medium">loja</span
			>.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="/loja"
				class="btn btn-primary rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
				>Ir para Loja</a
			>
			<a href="/contato" class="text-sm font-semibold text-gray-900"
				>Contato para Suporte <span aria-hidden="true">&rarr;</span></a
			>
		</div>
	</div>
</div>
