<script lang="ts">
	import banner from '$lib/images/banner-bg.jpg';
	import slide1 from '$lib/images/slides1/Slide1.jpg';
	import slide2 from '$lib/images/slides1/Slide2.jpg';
	import slide3 from '$lib/images/slides1/Slide3.jpg';
	import slide4 from '$lib/images/slides1/Slide4.jpg';
	import slide5 from '$lib/images/slides1/Slide5.jpg';
	import slide6 from '$lib/images/slides1/Slide6.jpg';
	import slide7 from '$lib/images/slides1/Slide7.jpg';
	import slide8 from '$lib/images/slides1/Slide8.jpg';
	import ProductLink from './product_link.svelte';
</script>

<!-- banner -->
<div class="bg-cover bg-no-repeat bg-center" style="background-image: url({banner});">
	<div class="bg-slate-100 bg-opacity-90 backdrop-blur-md py-24">
		<div class="container mx-auto">
			<div class="max-w-2xl rounded-xl p-4">
				<h1 class="text-6xl text-gray-800 font-semibold mb-4 leading-tight tracking-normal">
					Materiais Didáticos <br /> de Biologia
				</h1>
				<p class="text-lg font-lora font-medium">
					Aulas em PowerPoint, Apostilas, Exercícios e Simulados de Biologia.<br />
					Para os Ensinos Fundamental, Médio, Superior e o Enem.
				</p>
				<div class="mt-12">
					<button
						class="btn btn-primary btn-md glass bg-primary-focus text-base border border-primary text-white px-8 font-medium
							rounded-md hover:shadow-lg">Comprar Agora</button
					>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- ./banner -->

<!-- features -->
<div class="container mx-auto py-16">
	<div class="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
		<div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="2.8em"
				viewBox="0 0 384 512"
				fill="currentColor"
				class="text-primary"
				><path
					d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z"
				/></svg
			>
			<div>
				<h4 class="font-semibold capitalize text-lg">Materiais Exclusivos</h4>
				<p class="text-gray-500 text-sm">Download direto pelo nosso site</p>
			</div>
		</div>
		<div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="3em"
				viewBox="0 0 512 512"
				fill="currentColor"
				class="text-primary"
				><path
					d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
				/></svg
			>
			<div>
				<h4 class="font-semibold text-lg">Suporte via E-mail</h4>
				<p class="text-gray-500 text-sm">Estamos sempre disponíveis</p>
			</div>
		</div>
		<div class="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="2.6em"
				fill="currentColor"
				viewBox="0 0 576 512"
				class="text-primary"
			>
				<path
					d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
				/></svg
			>
			<div>
				<h4 class="font-semibold capitalize text-lg">Pagamentos Seguros</h4>
				<p class="text-gray-500 text-sm">100% Confiabilidade</p>
			</div>
		</div>
	</div>
</div>
<!-- ./features -->

<!-- categories -->
<div class="container mx-auto py-16">
	<h2 class="text-2xl font-bold text-gray-800 uppercase mb-6">Comprar por categoria</h2>
	<div class="grid grid-cols-3 gap-3">
		<div class="relative rounded-sm overflow-hidden group tracking-wider">
			<img src={slide1} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Genética</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img src={slide2} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Seres Vivos</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img src={slide3} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Microbiologia
			</a>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img src={slide4} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Anatomia e Fisiologia</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img src={slide5} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Bioquímica</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img src={slide6} alt="category 1" class="w-full" />
			<a
				href="#"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Evolução</a
			>
		</div>
	</div>
</div>
<!-- ./categories -->

<!-- promotional -->
<div class="container mx-auto pb-16">
	<h2 class="text-2xl font-bold text-gray-800 uppercase mb-6">Materiais em promoção</h2>
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
		<ProductLink slide={slide1} />
		<ProductLink slide={slide2} />
		<ProductLink slide={slide3} />
		<ProductLink slide={slide4} />
	</div>
</div>
<!-- ./promotional -->

<!-- banner 2 -->
<div class="relative container mx-auto h-[362px] border-primary/20 border mb-16 overflow-hidden">
	<a href="#">
		<img src={banner} alt="ads" class="w-full h-full object-cover" />
		<div
			class="absolute -top-10 left-0 w-4/12 h-[560px] bg-slate-50 rounded-r-full flex items-center justify-center"
		>
			<div class="text-left -mt-28 -ml-6">
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
<!-- ./banner 2 -->

<!-- best sellers -->
<div class="container mx-auto pb-16">
	<h2 class="text-2xl font-bold text-gray-800 uppercase mb-6">Mais vendidos</h2>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
		<ProductLink slide={slide1} />
		<ProductLink slide={slide2} />
		<ProductLink slide={slide3} />
		<ProductLink slide={slide4} />
		<ProductLink slide={slide5} />
		<ProductLink slide={slide6} />
		<ProductLink slide={slide7} />
		<ProductLink slide={slide8} />
	</div>
</div>
<!-- ./best sellers -->
