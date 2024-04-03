<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Entrar</h1>

<form method="post" use:enhance>
	<label for="email">E-mail</label>
	<input name="email" id="email" /><br />
	<label for="password">Senha</label>
	<input type="password" name="password" id="password" /><br />
	<button>Continue</button>
</form>
