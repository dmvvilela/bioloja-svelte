<script lang="ts">
	import MailingList from '$lib/components/layout/mailing_list.svelte';
	import { getLocalePrice, getSlideImageUrl, removeFromCart } from '$lib/utils/product';
	import { invalidate } from '$app/navigation';
	import { showToast } from '$lib/utils/toast';
	import type { Cart } from '../types';
	import type { PageData } from './$types';

	export let data: PageData;

	$: userId = data.user?.id;
	$: cart = data.cart;

	let couponCode = '';

	const applyCoupon = async () => {
		showToast(
			new Promise((resolve, reject) => {
				(async () => {
					try {
						const response = await fetch(`/api/cart/coupon`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								cartId: (cart as Cart).cartId,
								subtotal: (cart as Cart).subtotal,
								couponCode
							})
						});

						if (!response.ok) {
							const json = await response.json();
							reject(json.message);
							return;
						}

						resolve({});
						invalidate('app:checkout');
					} catch (err: any) {
						reject(err.message);
					}
				})();
			}),
			{
				loading: 'Verificando cupom...',
				success: 'Cupom adicionado!',
				error: (message: any) => message
			}
		);

		couponCode = '';
	};

	const removeCoupon = async () => {
		showToast(
			new Promise((resolve, reject) => {
				(async () => {
					try {
						const response = await fetch(`/api/cart/coupon`, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								cartId: (cart as Cart).cartId
							})
						});

						if (!response.ok) {
							const json = await response.json();
							reject(json.message);
							return;
						}

						resolve({});
						invalidate('app:checkout');
					} catch (err: any) {
						reject(err.message);
					}
				})();
			}),
			{
				loading: 'Removendo cupom...',
				success: 'Cupom removido!',
				error: (message: any) => message
			}
		);
	};
</script>

<div class="bg-white">
	{#if !cart || !cart?.products?.length}
		<div class="mx-auto px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
			<div class="max-w-2xl lg:max-w-3xl">
				<h1 class="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Carrinho Vazio</h1>

				<p
					class="mt-12 pt-4 text-base italic text-gray-500 divide-yborder-b border-t border-gray-200"
				>
					Você ainda não adicionou items em seu carrinho.
				</p>
				<a href="/loja">
					<button
						class="mt-8 px-4 py-2 btn btn-primary glass bg-primary-focus text-white rounded hover:shadow-md"
						>Comprar Agora</button
					>
				</a>
				{#if !userId}
					<p class="mt-12 pt-4 text-sm text-gray-500 border-t border-gray-200">
						Caso possua um carrinho em sua conta, experimente <a href="/entrar" class="link"
							>Entrar</a
						>.
					</p>
					<p class="mt-4 pt-4 text-sm text-gray-500">
						Ainda não tem uma conta? <a href="/entrar" class="link">Cadastre-se</a>.
					</p>
				{/if}
			</div>
		</div>
		<MailingList />
	{:else}
		<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Carrinho</h1>

			<form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" class="lg:col-span-7">
					<h2 id="cart-heading" class="sr-only">Items no carrinho</h2>

					<ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
						{#each cart.products as product}
							<li class="flex py-1">
								<div class="flex-shrink-0">
									<img
										src={getSlideImageUrl(product.imageUrls)}
										alt="{product.name} capa"
										class="h-24 w-24 rounded-md object-contain object-center sm:h-40 sm:w-40"
									/>
								</div>

								<div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6 py-4">
									<div class="relative pr-9 sm:pr-12">
										<div>
											<div class="flex justify-between">
												<h3 class="text-sm">
													<a
														href="/loja/produto/{product.slug}"
														class="font-semibold text-lg leading-tight uppercase text-gray-700 hover:text-gray-800"
														>{product.name}</a
													>
												</h3>
											</div>
											<div class="mt-1 flex max-w-xs">
												<p class="text-gray-400 text-sm">{product.categories.join(', ')}</p>
												<!-- <p class="ml-4 border-l border-gray-200 pl-4 text-gray-500">Large</p> -->
											</div>

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
										</div>

										<div class="mt-4 sm:mt-0 sm:pr-9">
											<div class="absolute right-0 top-0">
												<button
													type="button"
													on:click={() => removeFromCart(product.id)}
													class="-m-2 inline-flex p-2 text-gray-400/80 hover:text-gray-500"
												>
													<span class="sr-only">Remover</span>
													<span title="Remover">
														<svg
															class="h-6 w-6"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
															/>
														</svg>
													</span>
												</button>
											</div>
										</div>
									</div>
									<!-- <p class="mt-4 flex space-x-2 text-sm text-gray-700">
									<svg
										class="h-5 w-5 flex-shrink-0 text-green-500"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
											clip-rule="evenodd"
										/>
									</svg>
									<span>Download Digital</span>
								</p> -->
								</div>
							</li>
						{/each}
					</ul>
				</section>

				<!-- Order summary -->
				<section
					aria-labelledby="summary-heading"
					class="bg-gray-50 mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
				>
					<h2 id="summary-heading" class="text-lg font-semibold text-secondary uppercase">
						Resumo do pedido
					</h2>

					<dl class="mt-6 space-y-4">
						<div class="flex items-center justify-between">
							<dt class="text-sm text-gray-600">Subtotal</dt>
							<dd class="text-sm font-medium text-secondary">R$ {getLocalePrice(cart.subtotal)}</dd>
						</div>

						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="flex text-sm text-gray-600">
								<span>Desconto </span>
								<span class="ml-1.5 flex">
									{#if cart.coupon?.code}
										<span class="badge badge-success badge-sm uppercase py-2.5"
											>{cart.coupon.code}
										</span>
										<div class="tooltip" data-tip="Remover cupom">
											<button
												on:click={removeCoupon}
												class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
											>
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
											</button>
										</div>
									{/if}
								</span>
							</dt>
							<dd class="text-sm font-medium text-secondary">
								-R$ {getLocalePrice(cart.couponDiscount || 0)}
							</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="text-base font-medium text-secondary">Total do pedido</dt>
							<dd class="text-base font-semibold text-secondary">
								R$ {getLocalePrice(cart.total)}
							</dd>
						</div>
					</dl>

					<div class="mt-6">
						<a href={userId ? '/pedido/finalizar' : '/cadastrar?redirectTo=/pedido/finalizar'}>
							<button
								type="submit"
								class="w-full uppercase rounded-md border border-transparent bg-primary px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-bioloja-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
								>Finalizar compra</button
							></a
						>
					</div>
					<div class="border-t border-gray-200 mt-8" />
					<div class="container text-primary p-5 rounded-lg bg-white max-w-md mx-auto mt-8">
						<div class="text-xl font-bold mb-4 uppercase tracking-[-0.01em]">Cupom de desconto</div>
						<div class="text-sm mb-4">Possui um cupom? Use-o aqui:</div>
						<div
							class="bg-gray-200/60 text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between"
						>
							<input
								type="coupon"
								name="code"
								id="coupon"
								bind:value={couponCode}
								placeholder="biolojanota10"
								class="text-lg font-semibold bg-transparent outline-none uppercase"
							/>
							<button
								on:click={applyCoupon}
								class="btn btn-sm bg-primary text-white px-2.5 py-1.5 rounded hover:bg-white/80 font-medium hover:text-primary border border-primary focus:outline-none"
								>Aplicar</button
							>
						</div>
						<!-- <div class="text-sm mt-4">
						<p>Valid until <span class="font-semibold">December 31, 2023</span></p>
						<p>Terms and conditions apply.</p>
					</div> -->
					</div>
				</section>
			</form>
		</div>
	{/if}
</div>
