<script lang="ts">
	import { PUBLIC_TURNSTILE_KEY } from '$env/static/public';
	import logo from '$lib/images/logo/full.png';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Página de Contato - Bioloja</title>
	<meta name="description" content="Envie-nos uma mensagem." />
</svelte:head>

<div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
	<svg
		class="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
		aria-hidden="true"
	>
		<defs>
			<pattern
				id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
				width="200"
				height="200"
				x="50%"
				y="-64"
				patternUnits="userSpaceOnUse"
			>
				<path d="M100 200V.5M.5 .5H200" fill="none" />
			</pattern>
		</defs>
		<svg x="50%" y="-64" class="overflow-visible fill-gray-50">
			<path
				d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
				stroke-width="0"
			/>
		</svg>
		<rect
			width="100%"
			height="100%"
			stroke-width="0"
			fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
		/>
	</svg>
	<div class="mx-auto max-w-xl lg:max-w-4xl">
		<h2 class="text-4xl font-bold tracking-tight text-gray-900">Precisa falar com a gente?</h2>
		<p class="mt-2 text-lg leading-8 text-gray-600">
			Caso possua alguma dúvida ou deseja resolver algum problema.
		</p>
		<div class="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
			<form method="POST" class="lg:flex-auto">
				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div>
						<label for="name" class="block text-sm font-semibold leading-6 text-gray-900"
							>Nome completo</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="name"
								id="name"
								autocomplete="name"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div>
						<label for="email" class="block text-sm font-semibold leading-6 text-gray-900"
							>E-mail</label
						>
						<div class="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autocomplete="email"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div>
						<label for="order-number" class="block text-sm font-semibold leading-6 text-gray-900"
							>Número do pedido</label
						>
						<div class="mt-2.5">
							<input
								id="order-number"
								name="order-number"
								type="text"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label for="phone" class="block text-sm font-semibold leading-6 text-gray-900"
							>Telefone</label
						>
						<div class="mt-2.5">
							<input
								type="phone"
								name="phone"
								id="phone"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="message" class="block text-sm font-semibold leading-6 text-gray-900"
							>Mensagem</label
						>
						<div class="mt-2.5">
							<textarea
								id="message"
								name="message"
								rows="4"
								maxlength="1000"
								class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
				</div>
				<div class="mt-8">
					<button
						type="submit"
						class="btn block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>Enviar</button
					>
				</div>
				<div class="cf-turnstile mt-4" data-sitekey={PUBLIC_TURNSTILE_KEY} />
				{#if form?.success == true}
					<div class="mt-6">
						<p class="mt-2 text-sm leading-5 text-gray-500">Obrigado por entrar em contato!</p>
						<p class="mt-2 text-sm leading-5 text-gray-500">Em breve retornaremos.</p>
					</div>
				{:else if form?.success == false}
					<div class="mt-6">
						{#if form?.failedCaptcha}
							<p class="mt-2 text-sm leading-5 text-gray-500">
								Falhou o desafio do captcha. Se ainda estiver tendo problemas, envie um e-mail para
								<a class="link" href="mailto:contato@bioloja.bio.br">contato@bioloja.bio.br</a>.
							</p>
						{:else}
							<p class="mt-2 text-sm leading-5 text-gray-500">Ocorreu um erro.</p>
							<p class="mt-2 text-sm leading-5 text-gray-500">Tente novamente mais tarde.</p>
						{/if}
					</div>
				{/if}
				<!-- <p class="mt-4 text-sm leading-6 text-gray-500">
					By submitting this form, I agree to the <a href="#" class="font-semibold text-indigo-600"
						>privacy&nbsp;policy</a
					>.
				</p> -->
			</form>
			<div class="lg:mt-6 lg:w-80 lg:flex-none">
				<img class="h-12 w-auto" src={logo} alt="logo" />
				<figure class="mt-10">
					<blockquote class="text-lg font-semibold leading-8 text-gray-900">
						<p>
							Quer resolver algum problema com um pedido? Enviar elogios ou sugestões? Mande aqui
							sua mensagem que responderemos em breve.
						</p>
					</blockquote>
					<figcaption class="mt-10 flex flex-col gap-y-4">
						<!-- <img
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
							alt=""
							class="h-12 w-12 flex-none rounded-full bg-gray-50"
						/> -->
						<div>
							<div class="text-base font-semibold text-gray-900">Ana Luisa Miranda-Vilela</div>
							<div class="text-sm leading-6 text-gray-600">Autora de conteúdo</div>
						</div>
						<div>
							<div class="text-base font-semibold text-gray-900">Daniel de M. V. Vilela</div>
							<div class="text-sm leading-6 text-gray-600">Desenvolvedor Web</div>
						</div>
					</figcaption>
				</figure>
			</div>
		</div>
	</div>
</div>
