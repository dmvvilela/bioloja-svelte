<script lang="ts">
	import { getLocalePrice } from '$lib/utils/product';
	import StatusBadge from '$lib/components/status_badge.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const orders = data.orders;
</script>

<svelte:head>
	<title>Pedidos - Bioloja</title>
	<meta name="description" content="Confira os seus pedidos." />
</svelte:head>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<h1 class="py-2 text-2xl font-semibold">Meus Pedidos</h1>
		<p class="text-slate-600">Verifique seus pedidos anteriores.</p>
	</div>
	<hr class="mt-4 mb-8" />
	{#if orders.length == 0}
		<div class="mb-8">
			<p class="text-gray-600 text-sm mb-7 italic">Você ainda não realizou nenhum pedido.</p>
			<a href="/loja">
				<button
					class="btn btn-primary btn-md glass bg-primary-focus text-base border border-primary text-white px-8 font-medium
				rounded-md hover:shadow-lg">Comprar Agora</button
				>
			</a>
		</div>
	{/if}
	{#if orders.length > 0}
		<div class="overflow-x-auto mb-6">
			<table class="table">
				<thead>
					<tr>
						<th>NÚMERO</th>
						<th>DATA</th>
						<th class="min-w-[11.5rem]">STATUS</th>
						<th class="min-w-40">TOTAL</th>
						<th class="min-w-40">AÇÃO</th>
					</tr>
				</thead>
				<tbody>
					{#each orders as order}
						{@const date = new Date(order.createdAt).toLocaleDateString('pt-BR', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
						<tr>
							<th>#{order.orderNumber}</th>
							<td class="min-w-24">{date}</td>
							<td><StatusBadge status={order.orderStatus} /></td>
							<td>R${getLocalePrice(order.total)}</td>
							<th>
								<a href="/minha-conta/pedidos/{order.orderNumber}">
									<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
								</a></th
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
