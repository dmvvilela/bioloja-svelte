<script lang="ts">
	import Header from '$lib/emails/mjml/header.svelte';

	export let name: string;
	export let verificationLink: string;
</script>

<mj-section mj-class="main-section-image">
	<mj-column vertical-align="top" width="100%">
		<mj-image src="https://bioimages.d2vsolutions.com/logo%2Ffull.jpg" />
	</mj-column>
</mj-section>

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
		<mj-text mj-class="tiny-text">
			Ou então cole a seguinte url no browser: <br />{verificationLink}
		</mj-text>

		<mj-text mj-class="small-text">Este link estará disponível por 2h.</mj-text>
	</mj-column>
</mj-section>
