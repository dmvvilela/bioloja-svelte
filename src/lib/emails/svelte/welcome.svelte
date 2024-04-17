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
				src="https://bioimages.d2vsolutions.com/logo%2Ffull.jpg"
				alt="Bioloja logo"
				style={logo}
				width="534"
				height="244"
			/>
			<Text style={paragraph}>Prezado leitor,</Text>
			<Text style={paragraph}>
				É com grande prazer que lhe damos as boas-vindas ao maior portal de anatomia e fisiologia
				humana do Brasil. Estamos felizes em tê-lo(a) como parte de nossa comunidade e estamos
				ansiosos para compartilhar com você uma variedade de recursos e informações sobre o corpo
				humano.
			</Text>
			<Text style={paragraph}>
				Por se cadastrar em nossa lista de e-mails, você receberá atualizações sobre novos artigos,
				exercícios e materiais educacionais relacionados à anatomia e fisiologia humana. Nossa
				equipe de especialistas está constantemente trabalhando para fornecer informações precisas e
				atualizadas sobre o funcionamento do corpo humano, desde os sistemas mais básicos até os
				mais complexos.
			</Text>
			<Text style={paragraph}>
				Nosso objetivo é tornar a aprendizagem da anatomia e fisiologia humana uma experiência
				interessante e enriquecedora, oferecendo informações que podem ajudar você a entender melhor
				o seu próprio corpo e melhorar a sua saúde e bem-estar.
			</Text>
			<Text style={paragraph}>
				Assim, o estudo da anatomia e fisiologia humana é fundamental para a compreensão de diversas
				áreas da saúde, como a medicina, a enfermagem e a fisioterapia. Compreender como o nosso
				corpo funciona pode nos ajudar a prevenir e tratar doenças e a promover uma vida mais
				saudável.
			</Text>
			<Text style={paragraph}>
				Mais uma vez, seja bem-vindo(a) ao nosso site de anatomia e fisiologia humana. Esperamos que
				você desfrute de tudo o que temos a oferecer e sinta-se livre para entrar em contato conosco
				caso tenha alguma dúvida ou sugestão.
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
