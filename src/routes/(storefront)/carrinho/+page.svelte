<script lang="ts">
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import { getLocalePrice } from '$lib/utils/product';

	const products = [
		{
			id: 1,
			category: 'Farmacologia',
			name: 'Product 1',
			image: slide1,
			price: 1299
		},
		{
			id: 2,
			category: 'Genética',
			name: 'Product 2',
			image: slide2,
			price: 2100
		},
		{
			id: 3,
			category: 'Promoções',
			name: 'Product 3',
			image: slide3,
			price: 4230
		}
	];
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<h1 class="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Carrinho</h1>
		<form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
			<section aria-labelledby="cart-heading" class="lg:col-span-7">
				<h2 id="cart-heading" class="sr-only">Items no carrinho</h2>

				<ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
					{#each products as product}
						<li class="flex py-6">
							<div class="flex-shrink-0">
								<img
									src={product.image}
									alt="Front of men&#039;s Basic Tee in sienna."
									class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
								/>
							</div>

							<div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
								<div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
									<div>
										<div class="flex justify-between">
											<h3 class="text-sm">
												<a
													href="#"
													class="font-semibold text-lg leading-tight uppercase text-gray-700 hover:text-gray-800"
													>{product.name}</a
												>
											</h3>
										</div>
										<div class="mt-1 flex">
											<p class="text-gray-500">{product.category}</p>
											<!-- <p class="ml-4 border-l border-gray-200 pl-4 text-gray-500">Large</p> -->
										</div>
										<p class="mt-1 font-medium text-gray-600">
											R${getLocalePrice(product.price)}
										</p>
									</div>

									<div class="mt-4 sm:mt-0 sm:pr-9">
										<div class="absolute right-0 top-0">
											<button
												type="button"
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

								<p class="mt-4 flex space-x-2 text-sm text-gray-700">
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
								</p>
							</div>
						</li>
					{/each}
				</ul>
			</section>

			<!-- Order summary -->
			<section
				aria-labelledby="summary-heading"
				class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
			>
				<h2 id="summary-heading" class="text-lg font-semibold text-secondary uppercase">
					Resumo do pedido
				</h2>

				<dl class="mt-6 space-y-4">
					<div class="flex items-center justify-between">
						<dt class="text-sm text-gray-600">Subtotal</dt>
						<dd class="text-sm font-medium text-secondary">R$99,00</dd>
					</div>

					<div class="flex items-center justify-between border-t border-gray-200 pt-4">
						<dt class="flex text-sm text-gray-600">
							<span>Desconto (Cupom: BIOLOJANOTA10)</span>
							<a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
								<span class="sr-only">Learn more about how tax is calculated</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
										clip-rule="evenodd"
									/>
								</svg>
							</a>
						</dt>
						<dd class="text-sm font-medium text-secondary">R$8,32</dd>
					</div>
					<div class="flex items-center justify-between border-t border-gray-200 pt-4">
						<dt class="text-base font-medium text-secondary">Total do pedido</dt>
						<dd class="text-base font-medium text-secondary">R$112,32</dd>
					</div>
				</dl>

				<div class="mt-6">
					<a href="/pedido/finalizar">
						<button
							type="submit"
							class="w-full uppercase rounded-md border border-transparent bg-primary px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-bioloja-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>Finalizar compra</button
						></a
					>
				</div>

				<div class="container text-primary p-8 rounded-lg bg-white max-w-md mx-auto mt-8">
					<div class="text-3xl font-bold mb-4">Cupom</div>
					<div class="flex items-center w-full h-13 pl-3 bg-gray-100 border rounded-full">
						<input
							type="coupon"
							name="code"
							id="coupon"
							placeholder="Apply coupon"
							value="90off"
							class="w-full bg-gray-100 outline-none appearance-none focus:outline-none active:outline-none"
						/>
						<button
							type="submit"
							class="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
						>
							<svg
								aria-hidden="true"
								data-prefix="fas"
								data-icon="gift"
								class="w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								><path
									fill="currentColor"
									d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
								/></svg
							>
							<span class="font-medium">Aplicar</span>
						</button>
					</div>
					<div class="text-lg mb-4">
						Get <span class="text-yellow-400 font-bold">25% OFF</span> your next purchase!
					</div>
					<div class="text-base mb-4">Use coupon code:</div>
					<div
						class="bg-gray-200/60 text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between"
					>
						<span class="text-xl font-semibold">TAILOFFER25</span>
						<button
							class="bg-primary text-white px-3 py-1 rounded hover:bg-white/80 font-medium hover:text-primary border border-primary focus:outline-none"
							>Aplicar</button
						>
					</div>
					<div class="text-sm mt-4">
						<p>Valid until <span class="font-semibold">December 31, 2023</span></p>
						<p>Terms and conditions apply.</p>
					</div>
				</div>
			</section>
		</form>
	</div>
</div>
