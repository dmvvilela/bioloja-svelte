<script lang="ts">
	import { PUBLIC_SLIDES_BUCKET_URL } from '$env/static/public';
</script>

<!-- TODO: This whole thing correctly on the server!!! -->
<div class="container mx-auto py-16">
	<h2 class="text-2xl font-bold text-secondary uppercase mb-6 ml-8 sm:ml-0">
		Comprar por categoria
	</h2>
	<div class="flex flex-col m-8 sm:m-0 sm:grid grid-cols-2 lg:grid-cols-3 gap-3">
		<div class="relative rounded-sm overflow-hidden group tracking-wider">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Genética/Alterações cromossômicas estruturais/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/genetica"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Genética</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Ecologia/Conceitos e estimativas de biodiversidade/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/ecologia"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Ecologia</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Microbiologia/Bactérias/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/seres-vivos/microbiologia"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Microbiologia
			</a>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Anatomia e Fisiologia Humanas/Sistema reprodutor/Sistema reprodutor feminino/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/anatomia-e-fisiologia"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Anatomia e Fisiologia</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Bioquímica/Química celular e nutrição 2_Carboidratos/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/bioquimica"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Bioquímica</a
			>
		</div>
		<div class="relative rounded-sm overflow-hidden group">
			<img
				src="{PUBLIC_SLIDES_BUCKET_URL}/Evolução/Conceitos e estimativas de biodiversidade/slides/slide1.jpg"
				alt="category 1"
				class="w-full"
			/>
			<a
				href="/loja/categoria/evolucao"
				class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
				>Evolução</a
			>
		</div>
	</div>
</div>
