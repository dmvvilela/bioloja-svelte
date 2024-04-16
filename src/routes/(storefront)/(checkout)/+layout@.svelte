<script lang="ts">
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import PrivacyNotice from '$lib/components/layout/privacy_notice.svelte';
	import { onMount } from 'svelte';
	import { cartItemsCount, guestCart } from '$lib/stores/cart';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import '../../../app.css';

	export let data: LayoutData;

	const title = 'Bioloja - Materiais Didáticos de Biologia';
	const description =
		'Aulas, apostilas, exercícios e simulados de Biologia para os Ensinos Fundamental/Médio/Superior e o Enem. Tanto para professores quanto alunos.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Prof. Dr. Ana Luisa Miranda-Vilela" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<!-- <meta
		property="og:image"
		content={'https://firebasestorage.googleapis.com/v0/b/anatomia-e-fisiologia-humanas.appspot.com/o/AFH_reduzida_principal.png?alt=media&token=3c661a73-463c-4fcd-a274-bc25a24cfdec'}
	/> -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<!-- <meta
		property="twitter:image"
		content={'https://firebasestorage.googleapis.com/v0/b/anatomia-e-fisiologia-humanas.appspot.com/o/AFH_reduzida_principal.png?alt=media&token=3c661a73-463c-4fcd-a274-bc25a24cfdec'}
	/> -->
	<!-- https://kit.svelte.dev/docs/seo -->
	<!-- A common pattern is to return SEO-related data from page load functions, then use it (as $page.data) in a <svelte:head> in your root layout. -->
</svelte:head>

<div class="relative">
	<header>
		<div class="h-14 bg-secondary mb-4" />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<div class="bg-secondary py-3 mt-8">
			<div
				class="container mx-auto px-6 lg:px-8 sm:flex sm:items-center sm:justify-between font-light"
			>
				<p class="text-bioloja-100 text-sm tracking-wide pl-2 sm:pl-0 mt-1 sm:mt-0">
					&copy; Bioloja - Todos os direitos reservados.
				</p>
				<div class="sm:flex sm:space-x-2 font-extralight mt-4 mb-1 sm:my-0 lg:mr-4">
					<a href="/termos-e-condicoes"
						><button class="btn btn-link btn-xs text-bioloja-400">Termos e Condições</button></a
					>
					<p class="text-bioloja-500 hidden sm:block">|</p>
					<a href="/politica-de-privacidade">
						<button class="btn btn-link btn-xs text-bioloja-400">Política de Privacidade</button></a
					>
				</div>
			</div>
		</div>
	</footer>
</div>
