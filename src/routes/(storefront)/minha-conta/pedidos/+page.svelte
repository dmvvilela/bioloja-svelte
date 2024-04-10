<script lang="ts">
	import type { PageData } from './$types';

	// export let data: PageData;

	// const  user = data.user!;
</script>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<h1 class="py-2 text-2xl font-semibold">Meus Pedidos</h1>
		<p class="font- text-slate-600">Verifique seus pedidos anteriores.</p>
	</div>
	<hr class="mt-4 mb-8" />
	<div class="overflow-x-auto">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>DATA</th>
					<th>STATUS</th>
					<th>TOTAL</th>
					<th />
				</tr>
			</thead>
			<tbody>
				<!-- row 1 -->
				<tr>
					<th>#1</th>
					<td>20/04/2024</td>
					<td><span class="badge badge-success badge-sm">Concluído</span></td>
					<td>R$80,27 (3 items)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
				<!-- row 2 -->
				<tr>
					<th>#2</th>
					<td>21/04/2024</td>
					<td><span class="badge badge-ghost badge-sm">Pagamento Pendente</span></td>
					<td>R$8,21 (1 item)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
				<!-- row 3 -->
				<tr>
					<th>#3</th>
					<td>22/04/2024</td>
					<td><span class="badge badge-outline badge-sm">Processando</span></td>
					<td>R$42,30 (2 items)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
				<!-- row 4 -->
				<tr>
					<th>#2</th>
					<td>21/04/2024</td>
					<td><span class="badge badge-error badge-sm">Cancelado</span></td>
					<td>R$8,21 (1 item)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
				<!-- row 5 -->
				<tr>
					<th>#2</th>
					<td>21/04/2024</td>
					<td><span class="badge badge-warning badge-sm">Aguardando</span></td>
					<td>R$8,21 (1 item)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
				<!-- row 5 -->
				<tr>
					<th>#2</th>
					<td>21/04/2024</td>
					<td><span class="badge badge-info badge-sm">Reembolsado</span></td>
					<td>R$8,21 (1 item)</td>
					<th>
						<button class="btn btn-xs btn-primary">Ver pedido</button>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</div>
