<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Hr,
		Html,
		Img,
		Link,
		Preview,
		Section,
		Text
	} from 'svelte-email';

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		backgroundColor: '#ffffff',
		margin: '0 auto',
		padding: '20px'
	};

	const logo = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const link = {
		color: '#FFA726',
		textDecoration: 'underline'
	};

	const btnContainer = {
		textAlign: 'center'
	};

	const button = {
		fontFamily,
		backgroundColor: '#FFA726',
		borderRadius: '3px',
		color: '#000',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center',
		display: 'block',
		width: '100%'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Sabia que a anatomia e fisiologia humana são campos fascinantes de estudo?" />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://firebasestorage.googleapis.com/v0/b/anatomia-e-fisiologia-humanas.appspot.com/o/AFH_reduzida_principal.png?alt=media&token=3c661a73-463c-4fcd-a274-bc25a24cfdec"
				alt="AFH logo"
				style={logo}
				width="534"
				height="244"
			/>
			<Text style={paragraph}>Caro(a) leitor(a),</Text>
			<Text style={paragraph}>
				Gostaríamos de lembrá-lo(a) que você ainda não se inscreveu para o nosso plano de assinatura
				AFH+, que oferece acesso exclusivo a uma variedade de recursos educacionais e informações
				valiosas sobre a anatomia e fisiologia humana.
			</Text>
			<Text style={paragraph}>
				Queremos lembrá-lo(a) que, ao se inscrever no plano de assinatura AFH+, você terá acesso a
				recursos adicionais, como exercícios dinâmicos e diferenciados, materiais exclusivos de
				anatomia e fisiologia humana e muito mais.
			</Text>
			<Text style={paragraph}>
				Para poder desfrutar de todos os benefícios do AFH+ e aproveitar ao máximo sua experiência
				de aprendizagem, pedimos que faça o pagamento da sua assinatura o mais rápido possível. É
				importante lembrar que, sem o pagamento da assinatura, você não terá acesso aos recursos
				exclusivos que oferecemos.
			</Text>
			<Text style={paragraph}>
				Se você já fez o pagamento, por favor, desconsidere este e-mail. Caso contrário, clique no
				botão abaixo para ser redirecionado à página de assinatura do AFH+.
			</Text>
			<Text style={paragraph}>
				Agradecemos o seu interesse no nosso site de anatomia e fisiologia humana e esperamos que
				você continue a desfrutar de todos os benefícios que o nosso plano de assinatura tem a
				oferecer.
			</Text>
			<Text style={paragraph}>
				Atenciosamente,
				<br />
				Equipe AFH
			</Text>
			<Button
				pX={12}
				pY={12}
				style={button}
				href="https://anatomiaefisiologiahumana.com.br/assinar"
			>
				Assinar o AFH+
			</Button>
			<Hr style={hr} />
			<Text style={footer}>Prof. Dr. Ana Luisa</Text>
			<Text style={footer}>
				Você está recebendo essa mensagem pois se cadastrou na lista de e-mails do site
				https://anatomiaefisiologiahumana.com.br. Caso não queira mais receber nossas mensagens, <Link
					href="https://anatomiaefisiologiahumana.com.br/desinscreva-se"
					style={link}
				>
					clique aqui
				</Link> para se descadastrar.
			</Text>
		</Container>
	</Section>
</Html>
