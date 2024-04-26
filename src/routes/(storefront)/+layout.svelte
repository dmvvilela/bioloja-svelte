<script lang="ts">
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import PrivacyNotice from '$lib/components/layout/privacy_notice.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { onNavigate } from '$app/navigation';
	import '../../app.css';

	const title = 'Bioloja - Materiais Didáticos de Biologia';
	const description =
		'Aulas, apostilas, exercícios e simulados de Biologia para os Ensinos Fundamental/Médio/Superior e o Enem. Tanto para professores quanto alunos.';

	onNavigate((navigation) => {
		if (!(document as any).startViewTransition) return;

		return new Promise((resolve) => {
			(document as any).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
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
	<Header />
	<Toaster />

	<main>
		<slot />
	</main>

	<PrivacyNotice />
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.white);
	}
</style>
