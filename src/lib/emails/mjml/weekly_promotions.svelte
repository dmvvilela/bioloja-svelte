<script lang="ts">
	import Footer from './layout/footer.svelte';
	import Header from './layout/header.svelte';

	interface Product {
		title: string;
		price: number;
		discount_price: number;
		image: string;
		link: string;
	}

	export let mainProduct: Product;
	export let products: Product[];
</script>

<Header>Confira nossas promoções da semana!</Header>

<mj-section background-color="#f3f3f3" padding-top="20px" padding-bottom="10px">
	<mj-column>
		<mj-image width="240px" src={mainProduct.image} />
	</mj-column>
	<mj-column>
		<mj-text font-weight="bold" align="justify" font-size="22px" color="#000"
			>{mainProduct.title}</mj-text
		>
		<mj-text font-size="22px" color="#7895A3" font-weight="600" padding-top="12px">
			R$ {mainProduct.discount_price || mainProduct.price}
		</mj-text>
		{#if mainProduct.discount_price}
			<mj-text font-size="16px" color="#A0AEC0" text-decoration="line-through">
				R$ {mainProduct.price}
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
			<mj-image width="165px" src={product.image} />
			<mj-text font-weight="bold" font-size="16px" color="#000">{product.title}</mj-text>
			<mj-text font-size="19px" color="#7895A3" font-weight="600" padding-top="12px">
				R$ {product.discount_price || product.price}
			</mj-text>
			{#if product.discount_price}
				<mj-text font-size="16px" color="#A0AEC0" text-decoration="line-through">
					R$ {product.price}
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
