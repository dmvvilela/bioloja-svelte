<script lang="ts">
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import PrivacyNotice from '$lib/components/layout/privacy_notice.svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../../../../app.css';

	const title = 'Bioloja - Carrinho';
	const description = 'Finalize sua compra.';
</script>

<!-- TODO: Fix this -->
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
