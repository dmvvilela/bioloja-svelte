<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import type { DownloadLink } from './+page.server';

	export let data: PageData;

	$: downloads = data.downloadLinks as DownloadLink[];

	const downloadProduct = async (
		orderNumber: string,
		productId: number,
		linkName: string,
		linkUrl: string
	) => {
		const response = await fetch('/api/product/download', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				orderNumber,
				productId,
				linkName,
				linkUrl
			})
		});

		const { link } = await response.json();
		invalidate('my-downloads');

		window.open(link, '_blank');
	};
</script>

<svelte:head>
	<title>Downloads - Bioloja</title>
	<meta name="description" content="Confira seus downloads disponíveis." />
</svelte:head>

<div class="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow mt-3">
	<div class="pt-4">
		<h1 class="py-2 text-2xl font-semibold">Meus Downloads</h1>
		<p class="text-slate-600">Verifique seus downloads disponíveis.</p>
	</div>
	<hr class="mt-4 mb-8" />
	{#if !downloads?.length}
		<div class="mb-8">
			<p class="text-gray-600 text-sm mb-7 italic">Você ainda não realizou nenhum pedido.</p>
			<a href="/loja">
				<button
					class="btn btn-primary btn-md glass bg-primary-focus text-base border border-primary text-white px-8 font-medium
				rounded-md hover:shadow-lg">Comprar Agora</button
				>
			</a>
		</div>
	{:else if downloads.length > 0}
		<div class="overflow-x-auto mb-6">
			<table class="table">
				<thead>
					<tr>
						<th>PRODUTO</th>
						<th>EXPIRA EM</th>
						<th>RESTANTES</th>
						<th>NOME</th>
						<th>AÇÃO</th>
					</tr>
				</thead>
				<tbody>
					{#each downloads as download}
						<tr>
							<th class="text-[13px]">{download.productName}</th>
							<td>{download.expirationDate.toLocaleDateString()}</td>
							<td>{download.remaining}</td>
							<th class="text-[13px]">{download.linkName}</th>
							<th>
								<button
									disabled={download.expired}
									on:click={() =>
										downloadProduct(
											download.orderNumber,
											download.productId,
											download.linkName,
											download.linkUrl
										)}
									class="btn btn-sm btn-success">Download</button
								>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
			<div class="m-8">
				<p class="text-gray-600 text-sm italic">
					<em class="font-semibold">OBS:</em> A senha para abrir os materiais se encontra no arquivo
					<span class="font-medium underline">LEIA-ME.txt</span>
					contido no arquivo <span class="font-medium">.zip</span> de download.
				</p>
			</div>
		</div>
	{/if}
</div>
