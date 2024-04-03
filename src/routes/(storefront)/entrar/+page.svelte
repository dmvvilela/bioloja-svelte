<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="py-16 lg:py-24 bg-slate-100/30">
	<div class="max-w-lg bg-white mx-auto shadow px-6 py-7 rounded overflow-hidden md:shadow-md">
		<h2 class="text-2xl uppercase font-medium mb-1">Entrar</h2>
		<p class="text-gray-600 mb-6 text-sm">Bem-vindo(a) de volta</p>
		<form method="post" use:enhance>
			<div class="space-y-2">
				<div>
					<label for="email" class="text-gray-600 mb-2 block">E-mail</label>
					<input
						type="email"
						name="email"
						id="email"
						autocomplete="email"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="youremail.@domain.com"
					/>
				</div>
				<div>
					<label for="password" class="text-gray-600 mb-2 block">Senha</label>
					<input
						type="password"
						name="password"
						id="password"
						autocomplete="current-password"
						class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
						placeholder="*******"
					/>
				</div>
			</div>
			<div class="flex items-center justify-between mt-6">
				<div class="flex items-center">
					<input
						type="checkbox"
						name="remember"
						id="remember"
						class="text-primary focus:ring-0 rounded-sm cursor-pointer"
					/>
					<label for="remember" class="text-gray-600 ml-3 cursor-pointer"
						>Lembrar nesse dispositivo</label
					>
				</div>
				<a href="/redefinir-senha" class="text-primary">Esqueceu a senha</a>
			</div>
			<div class="mt-4">
				<button
					type="submit"
					class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
					>Entrar</button
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
			Não tem uma conta? <a href="/cadastrar" class="text-primary">Cadastre-se</a>
		</p>
	</div>
</div>
