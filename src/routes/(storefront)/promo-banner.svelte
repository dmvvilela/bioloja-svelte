<script lang="ts">
	import banner from '$lib/images/banner-bg.jpg';
</script>

<div class="relative container mx-auto h-[362px] border-primary/20 border mb-16 overflow-hidden">
	<a href="/loja?tag=apostilas">
		<img src={banner} alt="promo text" class="w-full h-full object-cover" />
		<div
			class="absolute -top-10 left-0 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 h-[560px] bg-slate-50 rounded-r-full flex items-center justify-center"
		>
			<div class="text-left -mt-28 ml-8 lg:ml-6">
				<p class="mb-4 font-medium text-3xl tracking-wider">EXCLUSIVO</p>
				<p class="mb-4 font-bold text-primary text-5xl">15% DESCONTO</p>
				<p class="mb-4 uppercase font-semibold text-2xl tracking-tight">Em Apostilas e Simulados</p>
				<button
					class="px-4 py-2 btn btn-primary glass bg-primary-focus text-white rounded hover:shadow-md"
					>Comprar Agora</button
				>
			</div>
		</div>
	</a>
</div>
