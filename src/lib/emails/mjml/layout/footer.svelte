<script lang="ts">
	export let email = '';
</script>

<mj-section padding-top="20px">
	<mj-column>
		<mj-divider border-width="2px" border-color="#eaeaea" padding-bottom="10px" />
		<mj-text font-size="12px" padding-top="5px" padding-bottom="5px" align="left">
			Você recebeu este e-mail por estar cadastrado em nossa lista.<br />
			Caso não queira mais receber estes e-mails,
			<a
				href={`https://bioloja.bio.br/desinscreva-se${email !== '' ? `?email=${email}` : ''}`}
				style="color:#7895A3;text-decoration:underline;font-weight:400"
				target="_blank">desinscreva-se aqui</a
			>.
		</mj-text>
	</mj-column>
</mj-section>

<mj-section padding-top="4px" padding-bottom="20px">
	<mj-column>
		<mj-social font-size="15px" icon-size="24px" mode="horizontal">
			<mj-social-element name="facebook-noshare" href="https://www.facebook.com/Bioloja" />
			<mj-social-element name="instagram-noshare" href="https://www.instagram.com/biolojaoficial" />
			<mj-social-element name="twitter-noshare" href="https://twitter.com/Bioloja" />
		</mj-social>
	</mj-column>
</mj-section>
