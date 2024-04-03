<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class=" py-16 lg:py-24 bg-slate-100/30">
	<div class="max-w-lg mx-auto shadow px-6 py-7 rounded bg-white overflow-hidden">
		<h2 class="text-2xl uppercase font-medium mb-1">Crie sua conta</h2>
		<p class="text-gray-600 mb-6 text-sm">Cadastro de novo consumidor</p>
		<form method="post" autocomplete="off" use:enhance>
			<div class="space-y-2">
				<div>
					<label for="name" class="text-gray-600 mb-2 block">Nome Completo</label>
					<input
						type="text"
						name="name"
						id="name"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="Fulano de tal"
					/>
				</div>
				<div>
					<label for="email" class="text-gray-600 mb-2 block">E-mail</label>
					<input
						type="email"
						name="email"
						id="email"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="email@dominio.com"
					/>
				</div>
				<div>
					<label for="password" class="text-gray-600 mb-2 block">Senha</label>
					<input
						type="password"
						name="password"
						id="password"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="*******"
					/>
				</div>
				<div>
					<label for="confirm" class="text-gray-600 mb-2 block">Confirme sua senha</label>
					<input
						type="password"
						name="confirm"
						id="confirm"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="*******"
					/>
				</div>
			</div>
			<div class="mt-6">
				<div class="flex items-center">
					<input
						type="checkbox"
						name="aggrement"
						id="aggrement"
						class="text-primary focus:ring-0 rounded-sm cursor-pointer"
					/>
					<label for="aggrement" class="text-gray-600 ml-3 cursor-pointer"
						>Eu li e concordo com os <a href="#" class="text-primary">termos e condições</a>.</label
					>
				</div>
			</div>
			<div class="mt-4">
				<button
					type="submit"
					class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
					>Criar conta</button
				>
			</div>
		</form>

		<!-- <div class="mt-6 flex justify-center relative">
			<div class="text-gray-600 uppercase px-3 bg-white z-10 relative">Ou entre com</div>
			<div class="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
		</div>
		<div class="mt-4 flex gap-4">
			<a
				href="#"
				class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
				>facebook</a
			>
			<a
				href="#"
				class="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
				>google</a
			>
		</div> -->

		<p class="mt-4 text-center text-gray-600">
			Já possui uma conta? <a href="/entrar" class="text-primary">Entre agora</a>
		</p>
	</div>
</div>
