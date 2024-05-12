<script lang="ts">
	import { getImageUrl, getLocalePrice } from '$lib/utils/product';
	import Footer from './layout/footer.svelte';
	import Header from './layout/header.svelte';

	interface Product {
		name: string;
		price: number;
		discount_price: number;
		image: string;
		link: string;
	}

	// export let mainProduct: Product;
	// export let products: Product[];

	// TODO: Add coupon text and button to the main store page.

	let products = [
		{
			name: 'Promoção - 15% de desconto: Excreção Comparada   Apostila',
			price: 6477,
			discount_price: 5505,
			image: 'uploads/2020/04/Cópia-de-Sistema-e-Apostila-Promo.png',
			link: 'https://bioloja.bio.br/loja/produto/promocao-15porcento-de-desconto-excrecao-comparada-apostila'
		},
		{
			name: 'Apostila Excreção comparada',
			price: 4650,
			discount_price: 3953,
			image: 'uploads/2020/04/Excreção-comparada-1.jpg',
			link: 'https://bioloja.bio.br/loja/produto/apostila-excrecao-comparada'
		},
		{
			name: 'Fisiologia vegetal II (ensino médio) – Crescimento e desenvolvimento',
			price: 2890,
			discount_price: 2310,
			image: 'uploads/2019/09/Slide1.jpg',
			link: 'https://bioloja.bio.br/loja/produto/fisiologia-vegetal-ii-ensino-medio-crescimento-e-desenvolvimento'
		},
		{
			name: 'Infecções sexualmente transmissíveis 2 (IST-2)',
			price: 5080,
			discount_price: 4060,
			image: 'uploads/2019/02/Slide1-2.jpg',
			link: 'https://bioloja.bio.br/loja/produto/infeccoes-sexualmente-transmissiveis-2-ist-2'
		}
	];

	const mainProduct = products[0];
	products = products.slice(1);
</script>

<Header>Confira Nossas Promoções da Semana!</Header>

<mj-section background-color="#f3f3f3" padding-top="20px" padding-bottom="10px">
	<mj-column>
		<mj-image width="240px" src={getImageUrl(mainProduct.image)} />
	</mj-column>
	<mj-column>
		<mj-text font-weight="bold" font-size="22px" color="#000">{mainProduct.name}</mj-text>
		<mj-text font-size="22px" color="#7895A3" font-weight="600" padding-top="12px">
			R$ {getLocalePrice(mainProduct.discount_price || mainProduct.price)}
		</mj-text>
		{#if mainProduct.discount_price}
			<mj-text font-size="16px" color="#A0AEC0" text-decoration="line-through">
				R$ {getLocalePrice(mainProduct.price)}
			</mj-text>
		{/if}
		<mj-button
			align="left"
			background-color="#7895A3"
			border-radius="40px"
			font-size="12px"
			font-weight="600"
			href={mainProduct.link}>COMPRAR</mj-button
		>
	</mj-column>
</mj-section>
<mj-section>
	{#each products as product}
		<mj-column>
			<mj-image width="165px" src={getImageUrl(product.image)} />
			<mj-text font-weight="bold" font-size="16px" color="#000">{product.name}</mj-text>
			<mj-text font-size="19px" color="#7895A3" font-weight="600" padding-top="12px">
				R$ {getLocalePrice(product.discount_price || product.price)}
			</mj-text>
			{#if product.discount_price}
				<mj-text font-size="16px" color="#A0AEC0" text-decoration="line-through">
					R$ {getLocalePrice(product.price)}
				</mj-text>
			{/if}
			<mj-button
				background-color="#7895A3"
				border-radius="40px"
				font-size="12px"
				font-weight="600"
				href={product.link}>COMPRAR</mj-button
			>
		</mj-column>
	{/each}
</mj-section>

<Footer />
