<script lang="ts">
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import PrivacyNotice from '$lib/components/layout/privacy_notice.svelte';
	import { onMount } from 'svelte';
	import { cartItemsCount } from '$lib/stores/cart';
	import type { LayoutData } from './$types';
	import '../../app.css';

	export let data: LayoutData;

	const title = 'Bioloja - Materiais Didáticos de Biologia';
	const description =
		'Aulas, apostilas, exercícios e simulados de Biologia para os Ensinos Fundamental/Médio/Superior e o Enem. Tanto para professores quanto alunos.';

	onMount(() => {
		cartItemsCount.set(data.cartItemsCount);
	});
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
	<Header />
	<!-- <button class="btn btn-primary">Button</button> -->
	<!-- <Searchbox isOpen={isSearchOpen} {toggleSearch} /> -->
	<!-- {#if $toasts}
		<section class="fixed right-2.5 z-[999] mt-2.5 flex flex-col justify-center">
			{#each $toasts as toast (toast.id)}
				<Toast
					type={toast.type}
					dismissible={toast.dismissible}
					on:dismiss={() => dismissToast(toast.id)}
				>
					{toast.message}
				</Toast>
			{/each}
		</section>
	{/if} -->

	<main>
		<slot />
	</main>

	<PrivacyNotice />
	<Footer />
</div>

<!-- <style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style> -->
