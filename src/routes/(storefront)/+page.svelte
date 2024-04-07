<script lang="ts">
	import MainBanner from './main-banner.svelte';
	import Features from './features.svelte';
	import Categories from './categories.svelte';
	import PromoBanner from './promo-banner.svelte';
	import Promotions from './promotions.svelte';
	import BestSellers from './best-sellers.svelte';
	import MailingList from '$lib/components/layout/mailing-list.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const { promotions, bestSellers } = data;
</script>

<MainBanner />
<Features />
<Categories />
<Promotions {promotions} />
<PromoBanner />
<BestSellers {bestSellers} />
<MailingList />
