<script lang="ts">
	import type { PageData } from './$types';
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import { getLocalePrice } from '$lib/utils/product';

	// export let data: PageData;

	// const  user = data.user!;

	const products = [
		{
			id: 1,
			category: 'Botânica, Seres Vivos',
			name: 'Algas',
			slug: 'product-1',
			image: slide1,
			price: 1299,
			discountPrice: 1099
		},
		{
			id: 2,
			category: 'Genética',
			name: 'Homeostase',
			slug: 'product-2',
			image: slide2,
			price: 2100,
			discountPrice: 1599
		},
		{
			id: 3,
			category: 'Promoções, Anatomia e Fisiologia Humana',
			name: 'Mega nome grande que deveria atrapalhar tudo mas mesmo assim funciona pq eu sou foda',
			slug: 'product-3',
			image: slide3,
			price: 4230
		}
	];
</script>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<div class="flex items-baseline">
			<h1 class="py-2 text-2xl font-semibold">Pedido #8049</h1>
			<span class="badge badge-success badge-sm ml-2">Concluído</span>
		</div>
		<p class="font- text-slate-600">Pedido realizado em 26 de Abril de 2024.</p>
	</div>
	<hr class="mt-4 mb-8" />
	<p class="py-2 mb-2 text-xl font-semibold">Resumo</p>
	<div class="bg-white rounded-lg p-4">
		<h2 class="sr-only">Resumo do pedido</h2>
		<h3 class="sr-only">Items</h3>
		<div>
			{#each products as product}
				<div class="flex space-x-6 border-b border-gray-200 py-4">
					<img
						src={slide1}
						alt={product.name + ' capa'}
						class="h-24 w-24 flex-none object-contain object-center sm:h-36 sm:w-36"
					/>
					<div class="flex flex-auto flex-col">
						<div>
							<h4 class="font-medium text-gray-900 max-w-lg">
								<a
									href="/loja/produto/{product.slug}"
									class="font-semibold text-lg leading-tight uppercase text-gray-700 hover:text-gray-800"
									>{product.name}</a
								>
							</h4>
							<div class="mt-1">
								<p class="text-gray-400 text-sm">{product.category}</p>
							</div>
						</div>
						<div class="mt-6 flex flex-1 items-end">
							<dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
								<div class="flex items-baseline mb-1 space-x-2 mt-1">
									<p class="text-xl text-primary font-semibold">
										R${getLocalePrice(product.discountPrice || product.price)}
									</p>
									{#if product.discountPrice}
										<p class="text-sm text-gray-400 line-through">
											R${getLocalePrice(product.price)}
										</p>
									{/if}
								</div>
							</dl>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="sm:ml-40 sm:pl-6">
			<h3 class="sr-only">Your information</h3>
			<h4 class="sr-only">Payment</h4>
			<dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-5 text-sm">
				<div>
					<dt class="font-medium text-gray-900">Método de pagamento</dt>
					<dd class="mt-2 text-gray-700">
						<p>Apple Pay</p>
						<p>Mastercard</p>
						<p><span aria-hidden="true">••••</span><span class="sr-only">Ending in </span>1545</p>
					</dd>
				</div>
				<div>
					<dt class="font-medium text-gray-900">Endereço de cobrança</dt>
					<dd class="mt-2 text-gray-700">
						<p>SQN 211 Bl J</p>
						<p>70863-100</p>
						<p>Brasília / DF</p>
					</dd>
				</div>
			</dl>

			<h3 class="sr-only">Resumo do pedido</h3>

			<dl class="space-y-2 border-t border-gray-200 pt-6 text-sm">
				<div class="flex justify-between">
					<dt class="font-medium text-gray-900">Subtotal</dt>
					<dd class="text-gray-700">$36.00</dd>
				</div>
				<div class="flex justify-between">
					<dt class="flex font-medium text-gray-900">
						Desconto
						<span class="ml-1.5 mt-0.5 rounded-full bg-gray-200 px-2 h-4 text-xs text-gray-600"
							>BIOLOJANOTA10</span
						>
					</dt>
					<dd class="text-gray-700">-R$18,00</dd>
				</div>

				<div class="flex justify-between pt-2">
					<dt class="font-medium text-gray-900">Total</dt>
					<dd class="text-gray-900">R$23,00</dd>
				</div>
			</dl>
		</div>
	</div>

	<hr class="mt-4 mb-8" />
	<p class="py-2 text-xl font-semibold">Downloads</p>
	<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
		<p class="text-gray-600">Disponíveis até 31 de Abril de 2024</p>
	</div>
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
</div>
