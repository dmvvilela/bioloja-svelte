<script lang="ts">
	export let totalPages: number;
	export let currentPage: number;
	export let baseUrl: string;

	const totalVisible = 10;
	const startPage = 1;

	let pages = range();
	$: {
		totalPages, (pages = range());
	}

	function createRange(totalPages: number, start = 1): number[] {
		return Array.from({ length: totalPages }, (v, k) => start + k);
	}

	function range() {
		if (totalPages <= 0 || isNaN(totalPages) || totalPages > Number.MAX_SAFE_INTEGER) return [];
		if (totalVisible <= 1) return [currentPage];

		if (totalPages <= totalVisible) {
			return createRange(totalPages, startPage);
		}

		const even = totalVisible % 2 === 0;
		const middle = even ? totalVisible / 2 : Math.floor(totalVisible / 2);
		const left = even ? middle : middle + 1;
		const right = totalPages - middle;

		if (left - currentPage >= 0) {
			return [...createRange(Math.max(1, totalVisible - 1), startPage), '...', totalPages];
		} else if (currentPage - right >= (even ? 1 : 0)) {
			const rangeLength = totalVisible - 1;
			const rangeStart = totalPages - rangeLength + startPage;
			return [startPage, '...', ...createRange(rangeLength, rangeStart)];
		} else {
			const rangeLength = Math.max(1, totalVisible - 3);
			const rangeStart =
				rangeLength === 1 ? currentPage : currentPage - Math.ceil(rangeLength / 2) + startPage;
			return [startPage, '...', ...createRange(rangeLength, rangeStart), '...', totalPages];
		}
	}
</script>

<nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
	<div class="-mt-px flex w-0 flex-1">
		<a
			href={currentPage <= 1 ? '#' : `${baseUrl}?page=${currentPage - 1}`}
			class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
		>
			<svg
				class="mr-3 h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
					clip-rule="evenodd"
				/>
			</svg>
			Anterior
		</a>
	</div>
	<div class="hidden md:-mt-px md:flex">
		{#each pages as page}
			{#if page === '...'}
				<span
					class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
					>...</span
				>
			{:else if page === currentPage}
				<span
					aria-current="page"
					class="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
				>
					{page}
				</span>
			{:else}
				<a
					href={`${baseUrl}?page=${page}`}
					class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
				>
					{page}
				</a>
			{/if}
		{/each}
	</div>
	<div class="-mt-px flex w-0 flex-1 justify-end">
		<a
			href={currentPage >= totalPages ? '#' : `${baseUrl}?page=${currentPage + 1}`}
			class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
		>
			Próximo
			<svg
				class="ml-3 h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	</div>
</nav>
