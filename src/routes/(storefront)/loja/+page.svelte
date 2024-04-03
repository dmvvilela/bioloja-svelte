<script lang="ts">
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
	import Products from './products.svelte';
	import Sidebar from './sidebar.svelte';
</script>

<div class="container mx-auto">
	<Breadcrumbs />

	<div class="grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
		<Sidebar />

		<Products />
	</div>
</div>
