<script lang="ts">
	import type { PageData } from './$types';

	// export let data: PageData;

	// const  user = data.user!;
	const orders = ['a'];
</script>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<h1 class="py-2 text-2xl font-semibold">Meus Pedidos</h1>
		<p class="font- text-slate-600">Verifique seus pedidos anteriores.</p>
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
						<th>STATUS</th>
						<th>TOTAL</th>
						<th>AÇÃO</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>#1</th>
						<td>20/04/2024</td>
						<td><span class="badge badge-success badge-sm">Concluído</span></td>
						<td>R$80,27 (3 items)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
					<tr>
						<th>#2</th>
						<td>21/04/2024</td>
						<td><span class="badge badge-ghost badge-sm">Pagamento Pendente</span></td>
						<td>R$8,21 (1 item)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
					<tr>
						<th>#3</th>
						<td>22/04/2024</td>
						<td><span class="badge badge-outline badge-sm">Processando</span></td>
						<td>R$42,30 (2 items)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
					<tr>
						<th>#2</th>
						<td>21/04/2024</td>
						<td><span class="badge badge-error badge-sm">Cancelado</span></td>
						<td>R$8,21 (1 item)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
					<tr>
						<th>#2</th>
						<td>21/04/2024</td>
						<td><span class="badge badge-warning badge-sm">Aguardando</span></td>
						<td>R$8,21 (1 item)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
					<tr>
						<th>#2</th>
						<td>21/04/2024</td>
						<td><span class="badge badge-info badge-sm">Reembolsado</span></td>
						<td>R$8,21 (1 item)</td>
						<th>
							<button class="btn btn-xs btn-primary text-white">Ver pedido</button>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	{/if}
</div>
