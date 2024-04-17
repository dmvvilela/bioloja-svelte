<script lang="ts">
	import Footer from '$lib/components/layout/footer.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import PrivacyNotice from '$lib/components/layout/privacy_notice.svelte';
	import { onMount } from 'svelte';
	import { cartItemsCount, guestCart } from '$lib/stores/cart';
	import { Toaster } from 'svelte-french-toast';
	import type { LayoutData } from './$types';
	import '../../../../app.css';

	export let data: LayoutData;

	const title = 'Bioloja - Carrinho';
	const description = 'Finalize sua compra.';

	onMount(() => {
		let itemsCount;
		if (!data.user) {
			itemsCount = guestCart.count;
		} else {
			itemsCount = data.cart?.products.length;
		}

		cartItemsCount.set(itemsCount || 0);
	});
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
