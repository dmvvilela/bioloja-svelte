<script lang="ts">
	import Header from './layout/header.svelte';

	export let name: string;
	export let verificationLink: string;
</script>

<Header>Olá, {name}</Header>

<mj-section mj-class="main-section">
	<mj-column vertical-align="middle" width="100%">
		<!-- <mj-text mj-class="big-text">
			Hi, { email }.
		</mj-text> -->

		<mj-text mj-class="text">
			Foi solicitada uma redefinição de senha para a sua conta. Caso não tenha sido você, por favor
			desconsidere este e-mail. <br /><br />Caso queira prosseguir com a redefinição, clique no
			botão abaixo:<br />
		</mj-text>

		<mj-button mj-class="btn" href={verificationLink}>Redefinir Senha</mj-button>
	</mj-column>
</mj-section>

<mj-section mj-class="bottom-section">
	<mj-column vertical-align="middle" width="70%">
		<mj-text font-size="14px">
			Ou então cole a seguinte url no browser: <br />{verificationLink}
		</mj-text>

		<mj-text font-size="14px">Este link estará disponível por 2h.</mj-text>
	</mj-column>
</mj-section>
