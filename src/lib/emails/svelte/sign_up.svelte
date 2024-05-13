<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let name: string;

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
		color: '#7895A3',
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
		backgroundColor: '#7895A3',
		borderRadius: '3px',
		color: '#fff',
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
	<Preview preview="Sua conta na Bioloja foi criada." />
	<Section style={main}>
		<Container style={container}>
			<Img
				src="https://bioimages.d2vsolutions.com/logo%2Ffull.jpg"
				alt="Bioloja logo"
				style={logo}
				width="534"
				height="244"
			/>
			<Text style={title}>Sua conta na Bioloja foi criada</Text>
			<Text style={paragraph}>Olá {name},</Text>
			<Text style={paragraph}>
				Agora você já pode usufruir dos nossos serviços. Experimente procurar os materiais que
				deseja com nossa busca avançada por filtros. Pesquise por nome, categoria, preços e muito
				mais!
			</Text>
			<Button pX={12} pY={12} style={button} href="https://bioloja.bio.br/loja"
				>Visitar a Loja</Button
			>
			<Hr style={hr} />
			<Text style={footer}>Prof. Dr. Ana Luisa Miranda-Vilela</Text>
		</Container>
	</Section>
</Html>
