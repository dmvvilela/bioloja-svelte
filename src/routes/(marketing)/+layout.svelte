<script lang="ts">
	import { navigating } from '$app/stores';
	import '../../app.css';

	// TODO: add analytics
	// $: if ($navigating) {
	// 	 logEvent(analytics, "page_view", { page_location: router.pathname });
	// }
</script>

<slot />
