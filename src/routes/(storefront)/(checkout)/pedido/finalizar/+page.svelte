<script lang="ts">
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { Address, Elements, PaymentElement } from 'svelte-stripe';
	import { onMount } from 'svelte';
	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	import { goto, invalidate } from '$app/navigation';
	import { getLocalePrice, getSlideImageUrl, removeFromCart } from '$lib/utils/product';
	import { isEmail } from '$lib/utils/validation';
	import { trackEvent } from '$lib/utils/analytics';
	import type { Cart } from '$lib/types/checkout';
	import type { PageData } from './$types';

	export let data: PageData;

	$: cart = data.cart as Cart;
	$: clientSecret = data.clientSecret;

	// Our form fields
	let email = data.user?.email || '';
	let name = '';
	let phone = '';
	let contactError: string | null = null;

	// Stripe fields
	let stripe: any = null;
	let error: any = null;
	let elements: any;
	let processing = false;

	// const submitDirectly = async () => {
	// 	const payment = {
	// 		id: 'pi_3PEzjmJCLP6ZyyZ70FOGL4XH',
	// 		payment_method: 'pm_1PEzkHJCLP6ZyyZ7ZZZihTeD',
	// 		next_action: null,
	// 		amount: cart.total,
	// 		status: ''
	// 	};
	// 	const response = await fetch('/api/order', {
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		},
	// 		body: JSON.stringify({ email, name, phone, cart, payment })
	// 	});

	// 	const { orderNumber } = await response.json();
	// 	console.log(orderNumber);

	// 	await goto(`/pedido/confirmado?order=${orderNumber}`);
	// 	invalidate('app:checkout');

	// 	trackEvent('event', 'purchase', {
	// 		transaction_id: payment.id,
	// 		currency: 'BRL',
	// 		tax: 0,
	// 		shipping: 0,
	// 		value: cart.total / 100,
	// 		items: cart.products.map((product) => ({
	// 			item_id: product.id,
	// 			item_name: product.name,
	// 			price: (product.price / 100).toFixed(2),
	// 			quantity: 1,
	// 			item_category: product.categories.join(','),
	// 			item_variant: product.slug,
	// 			index: product.lineId
	// 		}))
	// 	});
	// };

	const submit = async () => {
		if (!isEmail(email) || name.length < 3 || phone.length < 8) {
			contactError = 'Verifique suas informações de contato.';
			return;
		} else {
			contactError = null;
		}

		// Avoid processing duplicates
		if (processing) return;
		processing = true;
		error = null;

		// Confirm payment with stripe
		// TODO: If check for errors is needed.. add idempotency key on backend and retry..
		try {
			const result = await stripe.confirmPayment({
				elements,
				redirect: 'if_required'
			});

			if (result.error) {
				// Payment failed, notify user
				error = result.error;
				processing = false;
			} else {
				// Payment succeeded. We create the order
				const response = await fetch('/api/order', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ email, name, phone, cart, payment: result.paymentIntent })
				});

				const { orderNumber } = await response.json();

				// Payment succeeded, redirect to order details page
				await goto(`/pedido/confirmado?order=${orderNumber}`);

				// Cart should now be empty
				invalidate('app:checkout');

				trackEvent('event', 'purchase', {
					transaction_id: result.paymentIntent.id,
					currency: 'BRL',
					tax: 0,
					shipping: 0,
					value: cart.total / 100,
					items: cart.products.map((product) => ({
						item_id: product.id,
						item_name: product.name,
						price: (product.price / 100).toFixed(2),
						quantity: 1,
						item_category: product.categories.join(','),
						item_variant: product.slug,
						index: product.lineId
					}))
				});
			}
		} catch (err: any) {
			console.error(err);
			error = err.error;
			processing = false;

			await fetch('/api/log', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({ message: err.message, type: 'error', sendToDiscord: true })
			});
		}
	};

	onMount(async () => {
		if (!cart) {
			await goto('/carrinho');
			return;
		}

		name = cart.userName || '';

		stripe = await loadStripe(PUBLIC_STRIPE_PUBLISHABLE_KEY);

		trackEvent('event', 'begin_checkout', {
			value: cart.total / 100,
			currency: 'BRL',
			items: cart.products.map((product) => ({
				item_id: product.id,
				item_name: product.name,
				price: (product.price / 100).toFixed(2),
				quantity: 1,
				item_category: product.categories.join(','),
				item_variant: product.slug,
				index: product.lineId
			}))
		});
	});
</script>

<div class="bg-gray-50 py-2">
	<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Checkout</h2>

		<!-- <button on:click={submitDirectly} class="inline-flex items-center px-4 py-2 border"
			>Submit Directly</button
		> -->
		<form class="lg:grid lg:grid-cols-2 lg:gap-x-10 xl:gap-x-12">
			<div>
				<!-- Contact Info -->
				<div>
					<h2 class="text-lg font-medium text-gray-900">Informações de contato</h2>

					<div class="mt-4">
						<!-- <label for="email-address" class="block text-sm font-medium text-gray-700">E-mail</label
						> -->
						<div class="mt-1">
							<input
								type="email"
								id="email-address"
								name="email-address"
								autocomplete="email"
								bind:value={email}
								class="py-3 block w-full rounded-md border-gray-200 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400 disabled:bg-gray-200/80"
							/>
						</div>
					</div>

					<div class="mt-1.5 grid grid-cols-1 gap-y-1.5 sm:grid-cols-5 sm:gap-x-2.5">
						<div class="col-span-3">
							<!-- <label for="name" class="block text-sm font-medium text-gray-700">Nome completo</label
							> -->
							<div class="mt-1">
								<input
									type="text"
									id="name"
									name="name"
									autocomplete="name"
									required
									bind:value={name}
									placeholder="Nome completo"
									class="py-3 block w-full rounded-md border-gray-200 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400"
								/>
							</div>
						</div>
						<div class="col-span-2">
							<!-- <label for="phone" class="block text-sm font-medium text-gray-700">Telefone</label> -->
							<div class="mt-1">
								<input
									type="tel"
									id="phone"
									name="phone"
									autocomplete="tel"
									required
									placeholder="Telefone"
									bind:value={phone}
									class="py-3 block w-full rounded-md border-gray-200 shadow-sm focus:border-bioloja-400 focus:ring-bioloja-400"
								/>
							</div>
						</div>
					</div>
					{#if contactError}
						<p class="ml-2 mt-2 text-red-500">{contactError}</p>
					{/if}
				</div>

				<!-- Shipping -->
				<div class="mt-8 border-t border-gray-200 pt-8">
					<fieldset>
						<legend class="text-lg font-medium text-gray-900">Informações de entrega</legend>

						<div class="mt-4 max-w-md">
							<div
								class="relative flex rounded-lg bg-white p-4 shadow-sm focus:outline-none -inset-px border-2 border-primary/80"
							>
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
							</div>
						</div>
					</fieldset>
				</div>

				<!-- Payment -->
				<div class="mt-8 border-t border-gray-200 pt-8">
					<h2 class="text-lg font-medium text-gray-900 mb-4">Pagamento</h2>

					{#if clientSecret}
						<Elements
							{stripe}
							{clientSecret}
							theme="stripe"
							labels="floating"
							fonts={[
								{
									cssSrc: 'https://fonts.googleapis.com/css?family=Poppins'
								}
							]}
							variables={{
								fontFamily: 'Poppins, Ideal Sans, system-ui, sans-serif',
								colorPrimary: '#7895A3'
							}}
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
								{#if error}
									<p class="mt-2 text-red-500">{error.message}</p>
								{/if}
								{#if contactError}
									<p class="mt-2 text-red-500">{contactError}</p>
								{/if}
							</form>
						</Elements>
					{:else}
						Loading...
					{/if}
				</div>
			</div>

			<!-- Order summary -->
			<div class="mt-10 lg:mt-0">
				<h2 class="text-lg font-medium text-gray-900">Resumo do pedido</h2>

				<div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
					<h3 class="sr-only">Items no seu carrinho</h3>
					<ul role="list" class="divide-y divide-gray-200">
						{#each cart?.products || [] as product}
							<li class="flex px-4 py-6 sm:px-6">
								<div class="flex-shrink-0 self-center">
									<img
										src={getSlideImageUrl(product.imageUrls)}
										alt="{product.name} capa"
										class="w-28 rounded-sm"
									/>
								</div>

								<div class="ml-6 flex flex-1 flex-col">
									<div class="flex">
										<div class="min-w-0 flex-1">
											<h4 class="text-base">
												<a
													href="/loja/produto/{product.slug}"
													target="_blank"
													class="font-medium text-gray-700 hover:text-gray-800">{product.name}</a
												>
											</h4>
											<p class="mt-1 text-sm text-gray-500">{product.categories.join(', ')}</p>
										</div>

										<!-- <div class="ml-4 flow-root flex-shrink-0">
											<div class="tooltip" data-tip="Remover">
												<button
													type="button"
													on:click={() => removeFromCart(product)}
													class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
												>
													<span class="sr-only">Remover</span>
													<svg
														class="h-[17px] w-[17px]"
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
										</div> -->
									</div>

									<div class="flex flex-1 items-end justify-between pt-2">
										<div class="flex items-baseline space-x-2 mt-1">
											<p class="text-sm text-primary font-semibold">
												R${getLocalePrice(product.discountPrice || product.price)}
											</p>
											{#if product.discountPrice}
												<p class="text-sm text-gray-400 line-through">
													R${getLocalePrice(product.price)}
												</p>
											{/if}
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
					<dl class="space-y-4 border-t border-gray-200 px-4 py-6 sm:px-6">
						<div class="flex items-center justify-between">
							<dt class="text-sm">Subtotal</dt>
							<dd class="text-sm font-medium text-gray-900">R${getLocalePrice(cart?.subtotal)}</dd>
						</div>
						<div class="flex items-center justify-between">
							<dt class="text-sm flex">
								Desconto <span class="ml-1.5 flex">
									{#if cart?.coupon?.code}
										<span class="badge badge-success badge-sm uppercase py-2.5"
											>{cart?.coupon?.code}
										</span>
										<!-- <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
											<span class="sr-only">Remover cupom</span>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												class="w-5 h-5 rounded-full text-gray-400 p-[1px] mt-[1px] -ml-1 hover:text-gray-600"
											>
												<path
													fill-rule="evenodd"
													d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
													clip-rule="evenodd"
												/>
											</svg>
										</a> -->
									{/if}
								</span>
							</dt>
							<dd class="text-sm font-medium text-gray-900">
								- R${getLocalePrice(cart?.couponDiscount || 0)}
							</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt class="text-base font-medium">Total</dt>
							<dd class="text-base font-medium text-gray-900">R${getLocalePrice(cart?.total)}</dd>
						</div>
					</dl>
				</div>
			</div>
		</form>
	</div>
</div>
