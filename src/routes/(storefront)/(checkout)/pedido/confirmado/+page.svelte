<script lang="ts">
	import { getLocalePrice, getImageUrl } from '$lib/utils/product';
	import type { Order } from './+page.server';
	import type { PaymentMethod } from '$lib/types/stripe';
	import type { PageData } from './$types';

	export let data: PageData;

	const order = data.order as Order;
	const payment = data.payment as PaymentMethod;
</script>

<div class="container mx-auto my-16">
	<div class="mx-auto mb-14 py-4 text-center px-2 text-pretty">
		<h1 class="text-5xl font-bold text-secondary">Agradecemos o seu pedido!</h1>
		<p class="mt-8">
			Estamos verificando o pagamento. Assim que concluído, seus downloads estarão disponíveis.
		</p>
	</div>
	<div class="max-w-6xl px-2 mx-auto overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
		<div class="pt-4">
			<div class="flex items-baseline">
				<h1 class="py-2 text-4xl font-semibold text-secondary">Pedido confirmado</h1>
				<!-- <span class="badge badge-success badge-sm ml-2">Concluído</span> -->
			</div>
			<p class="font- text-slate-600">Realizado em 26 de Abril de 2024</p>
		</div>
		<hr class="mt-4 mb-6" />
		<p class="py-2 mb-2 text-2xl font-semibold text-secondary">Resumo do pedido</p>
		<div class="bg-white rounded-lg p-4">
			<h2 class="sr-only">Resumo do pedido</h2>
			<h3 class="sr-only">Items</h3>
			<div>
				{#each order.orderProducts as product}
					<div class="flex space-x-6 border-b border-gray-200 py-2.5">
						<img
							src={getImageUrl(product.image)}
							alt={product.name + ' capa'}
							class="h-24 w-24 flex-none object-contain object-center sm:h-36 sm:w-36"
						/>
						<div class="flex flex-auto flex-col">
							<div>
								<h4 class="font-medium text-gray-900 max-w-lg mt-2">
									<a
										href="/loja/produto/{product.slug}"
										class="font-semibold text-lg leading-tight uppercase text-gray-700 hover:text-gray-800"
										>{product.name}</a
									>
								</h4>
								<div class="mt-1">
									<p class="text-gray-400 text-sm">{product.categories}</p>
								</div>
							</div>
							<div class="mt-2.5 flex items-end">
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
				<h4 class="sr-only">Método de pagamento</h4>
				<dl class="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-5 text-sm">
					{#if order.paymentMethodTitle === 'card'}
						<div>
							<dt class="font-medium text-gray-900">Método de pagamento</dt>
							<dd class="mt-2 text-gray-700">
								<p>Cartão de crédito</p>
								<p class="capitalize py-1">{payment.card?.display_brand}</p>
								<p>
									<span aria-hidden="true"
										>••••<span class="sr-only">Terminando em </span> {payment.card?.last4}
									</span>
								</p>
							</dd>
						</div>
						<div>
							<dt class="font-medium text-gray-900">Endereço de cobrança</dt>
							<dd class="mt-2 text-gray-700">
								<p>{payment.billing_details.address.line1}</p>
								{#if payment.billing_details.address.line2}
									<p>{payment.billing_details.address.line2}</p>
								{/if}
								<p>{payment.billing_details.address.postal_code}</p>
								<p>
									{payment.billing_details.address.city} - {payment.billing_details.address.state}
								</p>
							</dd>
						</div>
					{/if}

					{#if order.paymentMethodTitle === 'boleto'}
						<div>
							<dt class="font-medium text-gray-900">Método de pagamento</dt>
							<dd class="mt-2 text-gray-700">
								<p>Boleto</p>
								<p>{order.boletoDetails.hosted_voucher_url}</p>
								<p>
									<span aria-hidden="true">••••</span><span class="sr-only">Ending in </span>1545
								</p>
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
					{/if}
				</dl>

				<h3 class="sr-only">Resumo do pedido</h3>

				<dl class="space-y-2 border-t border-gray-200 pt-6 text-sm">
					<div class="flex justify-between">
						<dt class="font-medium text-gray-900">Subtotal</dt>
						<dd class="text-gray-700">R$ {getLocalePrice(order.orderSubtotal)}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="flex font-medium text-gray-900">
							Desconto
							{#if order.couponCode}
								<span class="ml-1.5 mt-0.5 rounded-full bg-gray-200 px-2 h-4 text-xs text-gray-600"
									>{order.couponCode}</span
								>
							{/if}
						</dt>
						<dd class="text-gray-700">-R$ {getLocalePrice(order.cartDiscount)}</dd>
					</div>

					<div class="flex justify-between pt-2">
						<dt class="font-medium text-gray-900">Total</dt>
						<dd class="text-gray-900">R$ {getLocalePrice(order.orderTotal)}</dd>
					</div>
				</dl>
			</div>
		</div>

		<hr class="mt-6 mb-8" />
		<p class="py-2 text-2xl font-semibold text-secondary">Download dos materiais</p>
		<div class="flex flex-col gap-4 mb-6 py-4 max-w-4xl">
			<p class="text-gray-600">
				Seus downloads estarão disponíveis por até 7 dias a partir da data de confirmação do
				pagamento.
			</p>
			<p class="text-gray-600">
				Para pagamentos via boleto, pedimos até 3 dias úteis para liberar o acesso aos materiais.
			</p>
			<p class="text-gray-600">
				Por favor, verifique seus e-mail que mandaremos uma confirmação quando o pagamento for
				finalizado. Seus downloads estarão disponíveis em <a
					class="link"
					href="/minha-conta/downloads">Minha conta &gt; Downloads</a
				>
			</p>
			<p class="text-gray-600">
				Lembre-se que os materiais estão em formato auto-executável PPTX (duplo-clique para abri-los
				com o Power Point) e a senha pedida se encontra no arquivo LEIA-ME.txt contido no arquivo
				zip de download.
			</p>
			<p class="text-gray-60 mt-1.5 font-medium">Bons estudos!</p>
		</div>
		<a href="/loja">
			<button
				class="mb-8 px-4 py-2 btn btn-primary glass bg-primary-focus text-white rounded hover:shadow-md"
				>Voltar à Loja</button
			>
		</a>
	</div>
</div>
