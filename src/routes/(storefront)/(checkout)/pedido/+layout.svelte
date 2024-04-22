<script lang="ts">
	import '../../../../app.css';

	const title = 'Checkout - Bioloja';
	const description = 'Finalize seu pedido.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Prof. Dr. Ana Luisa Miranda-Vilela" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={'https://bioimages.d2vsolutions.com/logo%2Ffull.jpg'} />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={'https://bioimages.d2vsolutions.com/logo%2Ffull.jpg'} />
</svelte:head>

<div class="relative">
	<header>
		<div class="h-14 bg-secondary mb-4" />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<div class="bg-secondary py-3">
			<div
				class="container mx-auto px-6 lg:px-8 sm:flex sm:items-center sm:justify-between font-light"
			>
				<p
					class="text-bioloja-100 text-sm tracking-wide pl-2 sm:pl-0 mt-1 sm:mt-0 text-center w-full"
				>
					&copy; Bioloja - Todos os direitos reservados.
				</p>
				<!-- <div class="sm:flex sm:space-x-2 font-extralight mt-4 mb-1 sm:my-0 lg:mr-4">
					<a href="/termos-e-condicoes"
						><button class="btn btn-link btn-xs text-bioloja-400">Termos e Condições</button></a
					>
					<p class="text-bioloja-500 hidden sm:block">|</p>
					<a href="/politica-de-privacidade">
						<button class="btn btn-link btn-xs text-bioloja-400">Política de Privacidade</button></a
					>
				</div> -->
			</div>
		</div>
	</footer>
</div>
