<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let name: string;
	export let email: string;
	export let message: string;

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
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '32px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Você recebeu uma mensagem do AFH." />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://firebasestorage.googleapis.com/v0/b/anatomia-e-fisiologia-humanas.appspot.com/o/AFH_reduzida_principal.png?alt=media&token=3c661a73-463c-4fcd-a274-bc25a24cfdec"
				alt="AFH logo"
				style={logo}
				width="534"
				height="244"
			/>
			<Text style={paragraph}>
				{name}
				{`<${email}>`}, enviou em {new Date().toLocaleString('pt-BR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				})}:
			</Text>
			<Text style={paragraph}><pre>{message}</pre></Text>
			<Hr style={hr} />
			<Button pX={12} pY={12} style={button} href="https://anatomiaefisiologiahumana.com.br">
				Ir para o site
			</Button>
			<!-- <Text style={footer}>Prof. Dr. Ana Luisa</Text> -->
		</Container>
	</Section>
</Html>
