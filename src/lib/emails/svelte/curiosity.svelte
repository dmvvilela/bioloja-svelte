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
			<Text style={paragraph}>Caro(a) leitor,</Text>
			<Text style={paragraph}>
				Seja bem-vindo(a) ao nosso site! Estamos muito felizes em tê-lo(a) conosco.
			</Text>
			<Text style={paragraph}>
				Sabia que a anatomia e fisiologia humana são campos fascinantes de estudo? Essas áreas são
				responsáveis por entendermos como o nosso corpo funciona e como ele é estruturado.
			</Text>
			<Text style={paragraph}>
				A anatomia humana é o estudo da estrutura do corpo humano, enquanto a fisiologia humana é o
				estudo das funções do corpo humano. Juntas, essas áreas de estudo nos ajudam a entender como
				cada órgão e sistema do nosso corpo funciona individualmente e como eles se interconectam
				para manter a homeostase, ou seja, o equilíbrio interno do nosso corpo.
			</Text>
			<Text style={paragraph}>
				Assim, o estudo da anatomia e fisiologia humana é fundamental para a compreensão de diversas
				áreas da saúde, como a medicina, a enfermagem e a fisioterapia. Compreender como o nosso
				corpo funciona pode nos ajudar a prevenir e tratar doenças e a promover uma vida mais
				saudável.
			</Text>
			<Text style={paragraph}>
				Esperamos que você goste de explorar nosso site e aprender mais sobre a anatomia e
				fisiologia humana. Não hesite em entrar em contato conosco caso tenha alguma dúvida ou
				sugestão.
			</Text>
			<Text style={paragraph}>
				Atenciosamente,
				<br />
				Equipe AFH
			</Text>
			<Button pX={12} pY={12} style={button} href="https://anatomiaefisiologiahumana.com.br">
				Ir para o site
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
