<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Pré-visualização de E-mails - Admin Bioloja</title>
	<meta name="description" content="Admin: Pré-visualize os templates de e-mails." />
</svelte:head>

<div class="flex items-center justify-center bg-gray-100 py-12">
	<div class="rounded bg-white px-8 py-8 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">Svelte Email Previews</h1>
		<p class="mb-4 text-gray-700">
			Clique em um dos items para visualizar o e-mail correspondente:
		</p>
		<ul>
			{#each data.svelteEmails as mail}
				<li class="mt-2">
					<a
						class="font-bold capitalize text-blue-500 hover:text-blue-400"
						href="/admin/email/preview?type=svelte&template={mail}"
					>
						{mail.replaceAll('-', ' ').replaceAll('_', ' ')}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="flex items-center justify-center bg-gray-100 py-5 pb-14">
	<div class="rounded bg-white px-8 py-8 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">MJML Email Previews</h1>
		<p class="mb-4 text-gray-700">
			Clique em um dos items para visualizar o e-mail correspondente:
		</p>
		<ul>
			{#each data.mjmlEmails as mail}
				<li class="mt-2">
					<a
						class="font-bold capitalize text-blue-500 hover:text-blue-400"
						href="/admin/email/preview?type=mjml&template={mail}"
					>
						{mail.replaceAll('-', ' ').replaceAll('_', ' ')}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="flex items-center justify-center bg-gray-100 py-5 pb-14">
	<div class="rounded bg-white px-8 py-8 shadow-md">
		<h1 class="mb-4 text-2xl font-bold">React Email Previews</h1>
		<p class="mb-4 text-gray-700">
			Clique em um dos items para visualizar o e-mail correspondente:
		</p>
		<ul>
			{#each data.reactEmails as mail}
				<li class="mt-2">
					<a
						class="font-bold capitalize text-blue-500 hover:text-blue-400"
						href="/admin/email/preview?type=react&template={mail}"
					>
						{mail.replaceAll('-', ' ').replaceAll('_', ' ')}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
