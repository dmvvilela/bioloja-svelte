<script lang="ts">
	import { page } from '$app/stores';
	import { showToast } from '$lib/utils/toast';

	let email = '';

	// TODO: Show info/warning toast instead of error
	const submit = async () => {
		showToast(
			new Promise((resolve, reject) => {
				(async () => {
					const response = await fetch('/api/subscribe', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							from: $page.url.pathname
						})
					});

					if (response.ok) {
						resolve({});
					} else {
						reject(await response.json());
					}
				})();
			}),
			{
				loading: 'Enviando...',
				success: 'E-mail cadastrado!',
				error: (error: any) => error.message
			}
		);
	};
</script>

<div class="relative sm:py-16 bg-gray-50">
	<div class="relative max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
		<div
			class="relative px-6 py-10 overflow-hidden shadow-lg rounded-3xl bg-bioloja-400 sm:px-12 sm:py-20"
		>
			<div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
				<svg
					class="absolute inset-0 w-full h-full"
					preserveAspectRatio="xMidYMid slice"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 1463 360"
				>
					<path
						class="text-bioloja-500 text-opacity-40"
						fill="currentColor"
						d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
					/>
					<path
						class="text-bioloja-700 text-opacity-40"
						fill="currentColor"
						d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
					/>
				</svg>
			</div>
			<div class="relative">
				<div class="mb-12 sm:text-center">
					<h2 class="text-4xl font-extrabold text-white tracking-tight sm:text-4.5xl font-display">
						<!-- Saiba quando adicionarmos novos materiais -->
						Receba nossas promoções e novidades
					</h2>
					<p class="max-w-xl mx-auto mt-6 text-lg text-bioloja-50">
						Fique por dentro das novidades da Bioloja! Receba ofertas exclusivas e avisos de novos
						materiais publicados.
					</p>
				</div>
				<form class="sm:mx-auto sm:max-w-lg sm:flex" on:submit|preventDefault={submit}>
					<div class="relative w-full max-w-xl mx-auto bg-white rounded-full h-14 lg:max-w-none">
						<input
							class="rounded-full w-full h-14 bg-transparent py-0 text-bioloja-700 sm:pl-6 pl-5 pr-16 sm:pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-bioloja-200 focus:border-bioloja-200"
							placeholder="Endereço de e-mail"
							autocomplete="email"
							type="email"
							name="email"
							id="email"
							bind:value={email}
							required
						/>
						<button
							type="submit"
							class="absolute inline-flex items-center h-12 p-4 text-sm text-white transition duration-150 ease-in-out rounded-r-full rounded-bl-full outline-none right-1 top-1 bg-bioloja-400 sm:py-2 sm:px-6 sm:rounded-full sm:text-base sm:font-medium hover:bg-bioloja-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bioloja-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="-ml-0.5 sm:-ml-1 sm:mr-2 h-5 w-5"
								width="44"
								height="44"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="10" y1="14" x2="21" y2="3" />
								<path
									d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"
								/>
							</svg>
							<span class="hidden sm:inline-block">Enviar</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
