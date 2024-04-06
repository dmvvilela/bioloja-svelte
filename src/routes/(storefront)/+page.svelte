<script lang="ts">
	import MainBanner from './main-banner.svelte';
	import Features from './features.svelte';
	import type { PageServerData } from './$types';
	import Categories from './categories.svelte';
	import PromoBanner from './promo-banner.svelte';
	import Promotions from './promotions.svelte';
	import BestSellers from './best-sellers.svelte';
	import MailingList from '$lib/components/layout/mailing-list.svelte';

	export let data: PageServerData;
	const { promotions } = data;
</script>

<MainBanner />
<Features />
<Categories />
<Promotions {promotions} />
<PromoBanner />
<BestSellers />
<MailingList />
