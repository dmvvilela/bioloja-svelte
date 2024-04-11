<script lang="ts">
	import type { PageData } from './$types';

	// export let data: PageData;

	// const  user = data.user!;
	const downloads = ['a'];
</script>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<h1 class="py-2 text-2xl font-semibold">Meus Downloads</h1>
		<p class="font- text-slate-600">Verifique seus downloads disponíveis.</p>
	</div>
	<hr class="mt-4 mb-8" />
	{#if downloads.length == 0}
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
	{#if downloads.length > 0}
		<div class="overflow-x-auto mb-6">
			<table class="table">
				<thead>
					<tr>
						<th>PRODUTO</th>
						<th>DOWNLOADS RESTANTES</th>
						<th>EXPIRA EM</th>
						<th>BAIXAR</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Algas</th>
						<td>3</td>
						<td>25 de Abril de 2024</td>
						<th>
							<button class="btn btn-sm btn-success">Algas.zip</button>
						</th>
					</tr>
					<tr>
						<th>Homeostase</th>
						<td>0</td>
						<td>21 de Abril de 2024</td>
						<th>
							<button class="btn btn-sm btn-disabled">Algas.zip</button>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	{/if}
</div>
