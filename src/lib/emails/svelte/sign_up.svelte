<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let firstName: string;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		backgroundColor: '#ffffff',
		margin: '0 auto',
		padding: '20px 24px 48px'
	};

	const logo = {
		margin: '0 auto'
	};

	const title = {
		fontFamily,
		fontSize: '26px',
		textAlign: 'center',
		textDecoration: 'underline',
		textUnderlineOffset: '6px',
		textDecorationThickness: '2px',
		fontWeight: 'bold',
		lineHeight: '26px',
		marginBottom: '24px'
	};

	const paragraph = {
		fontFamily,
		fontSize: '17px',
		lineHeight: '26px',
		marginBottom: '32px'
	};

	const button = {
		fontFamily,
		backgroundColor: '#FFA726',
		borderRadius: '3px',
		color: '#000',
		fontSize: '16px',
		fontWeight: 500,
		textDecoration: 'none',
		textAlign: 'center',
		display: 'block'
	};

	const hr = {
		borderColor: '#cccccc',
		margin: '32px 0 20px'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Sua conta no AFH foi criada." />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://firebasestorage.googleapis.com/v0/b/anatomia-e-fisiologia-humanas.appspot.com/o/AFH_reduzida_principal.png?alt=media&token=3c661a73-463c-4fcd-a274-bc25a24cfdec"
				alt="AFH logo"
				style={logo}
				width="534"
				height="244"
			/>
			<Text style={title}>Sua conta no AFH foi criada</Text>
			<Text style={paragraph}>Olá {firstName},</Text>
			<Text style={paragraph}>
				Agora você já pode usufruir dos nossos serviços. Experimente assinar o <strong>AFH+</strong>
				para ter acesso a exercícios exclusivos e materiais extras, além de ver o site sem anúncios.
			</Text>
			<Button
				pX={12}
				pY={12}
				style={button}
				href="https://anatomiaefisiologiahumana.com.br/assinar"
			>
				Conheça o AFH+
			</Button>
			<Hr style={hr} />
			<Text style={footer}>Prof. Dr. Ana Luisa Miranda-Vilela</Text>
		</Container>
	</Section>
</Html>
