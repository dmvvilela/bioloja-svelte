<script lang="ts">
	import logo from '$lib/images/logo/icon.png';
</script>

<svelte:head>
	<title>Senha redefinida - Bioloja</title>
	<meta name="description" content="Sua senha foi modificada com sucesso." />
</svelte:head>

<div class="flex min-h-full flex-col justify-center py-44 sm:px-6 lg:px-8 bg-gray-50">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img class="mx-auto h-20 w-auto" src={logo} alt="Bioloja" />
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<h2 class="text-2xl uppercase font-medium mb-1">Senha alterada</h2>
			<p class="text-gray-600 mb-6 text-sm">Você mudou sua senha com sucesso!</p>
			<p class="text-gray-600 mb-6 text-sm">Clique abaixo para entrar novamente.</p>

			<a href="/entrar">
				<button
					type="submit"
					class="flex w-full uppercase justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 border border-primary text-white shadow-sm hover:bg-transparent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>Entrar</button
				>
			</a>
		</div>
	</div>
</div>
