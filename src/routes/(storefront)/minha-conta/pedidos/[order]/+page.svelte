<script lang="ts">
	import type { PageData } from './$types';
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';

	// export let data: PageData;

	// const  user = data.user!;
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
			<div class="flex space-x-6 border-b border-gray-200 py-4">
				<img
					src={slide1}
					alt="Glass bottle with black plastic pour top and mesh insert."
					class="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
				/>
				<div class="flex flex-auto flex-col">
					<div>
						<h4 class="font-medium text-gray-900">
							<a href="#">Cold Brew Bottle</a>
						</h4>
						<p class="mt-2 text-sm text-gray-600">
							This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee.
							Pour from any angle and remove the top for easy cleaning.
						</p>
					</div>
					<div class="mt-6 flex flex-1 items-end">
						<dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
							<div class="flex">
								<dt class="font-medium text-gray-900">Quantity</dt>
								<dd class="ml-2 text-gray-700">1</dd>
							</div>
							<div class="flex pl-4 sm:pl-6">
								<dt class="font-medium text-gray-900">Price</dt>
								<dd class="ml-2 text-gray-700">$32.00</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
			<div class="flex space-x-6 border-b border-gray-200 py-4">
				<img
					src={slide2}
					alt="Glass bottle with black plastic pour top and mesh insert."
					class="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
				/>
				<div class="flex flex-auto flex-col">
					<div>
						<h4 class="font-medium text-gray-900">
							<a href="#">Cold Brew Bottle</a>
						</h4>
						<p class="mt-2 text-sm text-gray-600">
							This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee.
							Pour from any angle and remove the top for easy cleaning.
						</p>
					</div>
					<div class="mt-6 flex flex-1 items-end">
						<dl class="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
							<div class="flex">
								<dt class="font-medium text-gray-900">Quantity</dt>
								<dd class="ml-2 text-gray-700">1</dd>
							</div>
							<div class="flex pl-4 sm:pl-6">
								<dt class="font-medium text-gray-900">Price</dt>
								<dd class="ml-2 text-gray-700">$32.00</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>

		<div class="sm:ml-40 sm:pl-6">
			<h3 class="sr-only">Your information</h3>
			<h4 class="sr-only">Payment</h4>
			<dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-5 text-sm">
				<div>
					<dt class="font-medium text-gray-900">Payment method</dt>
					<dd class="mt-2 text-gray-700">
						<p>Apple Pay</p>
						<p>Mastercard</p>
						<p><span aria-hidden="true">••••</span><span class="sr-only">Ending in </span>1545</p>
					</dd>
				</div>
				<div>
					<dt class="font-medium text-gray-900">Shipping method</dt>
					<dd class="mt-2 text-gray-700">
						<p>DHL</p>
						<p>Takes up to 3 working days</p>
					</dd>
				</div>
			</dl>

			<h3 class="sr-only">Summary</h3>

			<dl class="space-y-2 border-t border-gray-200 pt-6 text-sm">
				<div class="flex justify-between">
					<dt class="font-medium text-gray-900">Subtotal</dt>
					<dd class="text-gray-700">$36.00</dd>
				</div>
				<div class="flex justify-between">
					<dt class="flex font-medium text-gray-900">
						Discount
						<span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600"
							>STUDENT50</span
						>
					</dt>
					<dd class="text-gray-700">-$18.00 (50%)</dd>
				</div>
				<div class="flex justify-between">
					<dt class="font-medium text-gray-900">Shipping</dt>
					<dd class="text-gray-700">$5.00</dd>
				</div>
				<div class="flex justify-between">
					<dt class="font-medium text-gray-900">Total</dt>
					<dd class="text-gray-900">$23.00</dd>
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
