<script lang="ts">
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { Address, Elements, PaymentElement } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	import { goto } from '$app/navigation';
	import type { Cart } from '../../types';
	import type { PageData } from './$types';
	import { getLocalePrice } from '$lib/utils/product';

	export let data: PageData;

	$: userId = data.user?.id;
	$: cart = data.cart as Cart;

	let stripe: any = null;
	let clientSecret: any = null;
	let error: any = null;
	let elements: any;
	let processing = false;

	// TODO: Remover layout. Deixar simples!
	const createPaymentIntent = async () => {
		const response = await fetch('/api/stripe/intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({})
		});

		const { clientSecret } = await response.json();
		return clientSecret;
	};

	const submit = async () => {
		// avoid processing duplicates
		if (processing) return;

		processing = true;

		// confirm payment with stripe
		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		// create order
		const orderNumber = 1234;

		// log results, for debugging
		console.log({ result });

		if (result.error) {
			// payment failed, notify user
			error = result.error;
			processing = false;
		} else {
			// payment succeeded, redirect to "thank you" page
			goto(`/minha-conta/pedidos/${orderNumber}`);
		}
	};

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);

		clientSecret = await createPaymentIntent();
	});
</script>

<div class="bg-gray-50">
	<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Checkout</h2>

		<form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
			<div>
				<div>
					<h2 class="text-lg font-medium text-gray-900">Informações de contato</h2>

					<div class="mt-4">
						<label for="email-address" class="block text-sm font-medium text-gray-700">E-mail</label
						>
						<div class="mt-1">
							<input
								type="email"
								id="email-address"
								name="email-address"
								autocomplete="email"
								disabled
								class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm disabled:bg-gray-200/80"
							/>
						</div>
					</div>

					<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
						<div>
							<label for="first-name" class="block text-sm font-medium text-gray-700"
								>Primeiro nome</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="first-name"
									name="first-name"
									autocomplete="given-name"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="last-name" class="block text-sm font-medium text-gray-700"
								>Sobrenome</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="last-name"
									name="last-name"
									autocomplete="family-name"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<label for="phone" class="block text-sm font-medium text-gray-700">Telefone</label>
							<div class="mt-1">
								<input
									type="text"
									name="phone"
									id="phone"
									autocomplete="tel"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<label for="address" class="block text-sm font-medium text-gray-700">Endereço</label>
							<div class="mt-1">
								<input
									type="text"
									name="address"
									id="address"
									autocomplete="street-address"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div class="sm:col-span-2">
							<label for="apartment" class="block text-sm font-medium text-gray-700"
								>Complemento</label
							>
							<div class="mt-1">
								<input
									type="text"
									name="apartment"
									id="apartment"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="city" class="block text-sm font-medium text-gray-700">Cidade</label>
							<div class="mt-1">
								<input
									type="text"
									name="city"
									id="city"
									autocomplete="address-level2"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="country" class="block text-sm font-medium text-gray-700">País</label>
							<div class="mt-1">
								<select
									id="country"
									name="country"
									autocomplete="country-name"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								>
									<option>Brasil</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						<div>
							<label for="region" class="block text-sm font-medium text-gray-700">Estado</label>
							<div class="mt-1">
								<input
									type="text"
									name="region"
									id="region"
									autocomplete="address-level1"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="postal-code" class="block text-sm font-medium text-gray-700">CEP</label>
							<div class="mt-1">
								<input
									type="text"
									name="postal-code"
									id="postal-code"
									autocomplete="postal-code"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

				<!-- Payment -->
				<div class="mt-10 border-t border-gray-200 pt-10">
					<h2 class="text-lg font-medium text-gray-900 mb-4">Pagamento</h2>

					{#if clientSecret}
						<Elements
							{stripe}
							{clientSecret}
							theme="flat"
							labels="floating"
							variables={{ colorPrimary: '#7895A3' }}
							rules={{ '.Input': { border: 'solid 1px #0002' } }}
							bind:elements
						>
							<form on:submit|preventDefault={submit}>
								<PaymentElement />
								<Address mode="billing" />

								<button
									class="mt-4 w-full uppercase font-semibold rounded-md border border-transparent bg-primary px-4 py-3 text-base text-white shadow-sm hover:bg-bioloja-700 focus:outline-none focus:ring-2 focus:ring-bioloja-400 focus:ring-offset-2 focus:ring-offset-gray-50"
									disabled={processing}
								>
									{#if processing}
										Processando...
									{:else}
										Confirmar pedido
									{/if}
								</button>
							</form>
						</Elements>
					{:else}
						Loading...
					{/if}

					<!-- <fieldset class="mt-4">
						<legend class="sr-only">Tipo de pagamento</legend>
						<div class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
							<div class="flex items-center">
								<input
									id="credit-card"
									name="payment-type"
									type="radio"
									checked
									class="h-4 w-4 border-gray-300 text-primary focus:ring-bioloja-400"
								/>
								<label for="credit-card" class="ml-3 block text-sm font-medium text-gray-700"
									>Cartão de crédito</label
								>
							</div>
							<div class="flex items-center">
								<input
									id="pagseguro"
									name="payment-type"
									type="radio"
									class="h-4 w-4 border-gray-300 text-primary focus:ring-bioloja-400"
								/>
								<label for="pagseguro" class="ml-3 block text-sm font-medium text-gray-700"
									>PagSeguro / Boleto</label
								>
							</div>
							<div class="flex items-center">
								<input
									id="paypal"
									name="payment-type"
									type="radio"
									class="h-4 w-4 border-gray-300 text-primary focus:ring-bioloja-400"
								/>
								<label for="paypal" class="ml-3 block text-sm font-medium text-gray-700"
									>PayPal</label
								>
							</div>
						</div>
					</fieldset>

					<div class="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
						<div class="col-span-4">
							<label for="card-number" class="block text-sm font-medium text-gray-700"
								>Número do cartão</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="card-number"
									name="card-number"
									autocomplete="cc-number"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div class="col-span-4">
							<label for="name-on-card" class="block text-sm font-medium text-gray-700"
								>Nome no cartão</label
							>
							<div class="mt-1">
								<input
									type="text"
									id="name-on-card"
									name="name-on-card"
									autocomplete="cc-name"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div class="col-span-3">
							<label for="expiration-date" class="block text-sm font-medium text-gray-700"
								>Data de expiração (MM/AA)</label
							>
							<div class="mt-1">
								<input
									type="text"
									name="expiration-date"
									id="expiration-date"
									autocomplete="cc-exp"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
							<div class="mt-1">
								<input
									type="text"
									name="cvc"
									id="cvc"
									class="block w-full rounded-md border-gray-300 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 sm:text-sm"
								/>
							</div>
						</div> 
					</div> -->
				</div>
			</div>

			<!-- Order summary -->
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">Resumo do pedido</h2>

				<div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
					<h3 class="sr-only">Items no seu carrinho</h3>
					<ul role="list" class="divide-y divide-gray-200">
						<li class="flex px-4 py-6 sm:px-6">
							<div class="flex-shrink-0">
								<img
									src="https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg"
									alt="Front of men&#039;s Basic Tee in black."
									class="w-20 rounded-md"
								/>
							</div>

							<div class="ml-6 flex flex-1 flex-col">
								<div class="flex">
									<div class="min-w-0 flex-1">
										<h4 class="text-sm">
											<a href="#" class="font-medium text-gray-700 hover:text-gray-800">Basic Tee</a
											>
										</h4>
										<p class="mt-1 text-sm text-gray-500">Black</p>
										<p class="mt-1 text-sm text-gray-500">Large</p>
									</div>

									<div class="ml-4 flow-root flex-shrink-0">
										<button
											type="button"
											class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
										>
											<span class="sr-only">Remover</span>
											<svg
												class="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>

								<div class="flex flex-1 items-end justify-between pt-2">
									<p class="mt-1 text-sm font-medium text-gray-900">R$32.00</p>

									<div class="ml-4">
										<label for="quantity" class="sr-only">Quantidade</label>
										<select
											id="quantity"
											name="quantity"
											class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-bioloja-400 focus:outline-none focus:ring-1 focus:ring-bioloja-400 sm:text-sm"
										>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
										</select>
									</div>
								</div>
							</div>
						</li>

						<!-- More products... -->
					</ul>
					<dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
						<div class="flex items-center justify-between">
							<dt class="text-sm">Subotal</dt>
							<dd class="text-sm font-medium text-gray-900">R${getLocalePrice(cart.subtotal)}</dd>
						</div>
						<div class="flex items-center justify-between">
							<dt class="text-sm">
								Desconto {#if cart.coupon?.code}(Cupom: {cart.coupon?.code}){/if}
							</dt>
							<dd class="text-sm font-medium text-gray-900">
								- R${getLocalePrice(cart.couponDiscount || 0)}
							</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt class="text-base font-medium">Total</dt>
							<dd class="text-base font-medium text-gray-900">R${getLocalePrice(cart.total)}</dd>
						</div>
					</dl>

					<div class="border-t border-gray-200 px-4 py-6 sm:px-6">
						<button
							type="submit"
							class="w-full uppercase font-semibold rounded-md border border-transparent bg-primary px-4 py-3 text-base text-white shadow-sm hover:bg-bioloja-700 focus:outline-none focus:ring-2 focus:ring-bioloja-400 focus:ring-offset-2 focus:ring-offset-gray-50"
							>Confirmar pedido</button
						>
						{#if error}
							<p class="error">{error.message} Please try again.</p>
						{/if}
					</div>
				</div>
				<div class="mt-10 border-t border-gray-200 pt-10">
					<fieldset>
						<legend class="text-lg font-medium text-gray-900">Informações de entrega</legend>

						<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
							<!--
                Checked: "border-transparent", Not Checked: "border-gray-300"
                Active: "ring-2 ring-bioloja-400"
              -->
							<label class="relative flex rounded-lg bg-white p-4 shadow-sm focus:outline-none">
								<input
									type="radio"
									name="delivery-method"
									value="Standard"
									class="sr-only"
									aria-labelledby="delivery-method-0-label"
									aria-describedby="delivery-method-0-description-0 delivery-method-0-description-1"
								/>
								<span class="flex flex-1">
									<span class="flex flex-col">
										<span
											id="delivery-method-0-label"
											class="block text-sm font-medium text-gray-900"
											>Download direto pelo site</span
										>
										<span
											id="delivery-method-0-description-0"
											class="mt-1 flex items-center text-sm text-gray-500"
											>Senha no arquivo zip de download</span
										>
										<span
											id="delivery-method-0-description-1"
											class="mt-6 text-sm font-medium text-gray-900"
											>7 dias para download.<br />3 downloads disponíveis.</span
										>
									</span>
								</span>
								<!-- Not Checked: "hidden" -->
								<svg
									class="h-5 w-5 text-bioloja-800"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
										clip-rule="evenodd"
									/>
								</svg>
								<!--
                  Active: "border", Not Active: "border-2"
                  Checked: "border-bioloja-400", Not Checked: "border-transparent"
                -->
								<span
									class="pointer-events-none absolute -inset-px rounded-lg border-2"
									aria-hidden="true"
								/>
							</label>
						</div>
					</fieldset>
				</div>
			</div>
		</form>
	</div>
</div>
