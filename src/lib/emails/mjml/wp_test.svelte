<script lang="ts">
	import { Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'svelte-email';

	export let firstName: string;

	var orderNumber = '12345';
	var createdDateUtcIso = '2022-02-01T14:48:00.000Z';
	var createdDateLocalDate = '2022-02-01';
	var createdDateLocalTime = '14:48';

	var deliveryInfo = {
		fullName: 'John Doe',
		address: {
			address: '123 Main St',
			number: 'Apt 4B',
			complement: 'Near the big park',
			neighborhood: 'Downtown',
			city: 'New York',
			state: 'NY',
			cep: '10001'
		}
	};

	var userEmail = 'johndoe@example.com';
</script>

<mj-section full-width="full-width">
	<mj-column>
		<mj-image
			src="https://mcusercontent.com/e0addde433bc3e841fe26fdf5/images/b5c707be-d2bd-4e74-b14b-8f8233058654.png"
		/>
		<mj-divider border-color="#0abcf2" />
		<mj-text font-size="30px" color="#ffffff" align="left">Obrigado pelo seu pedido</mj-text>
		<mj-text color="#636363" font-size="14px"
			>Seu pedido foi recebido e está sendo processado. Os detalhes do pedido serão exibidos abaixo
			para sua conferência:</mj-text
		>
		<mj-text color="#0abcf2" font-size="18px" font-weight="bold"
			>Pedido #{orderNumber} (<time datetime={createdDateUtcIso}
				>{createdDateLocalDate} às {createdDateLocalTime}</time
			>)</mj-text
		>
		<mj-table>
			<tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
				<th style="padding: 0 15px 0 0;">Produto</th>
				<th style="padding: 0 15px;">Preço</th>
				<th style="padding: 0 15px;">Quantidade</th>
				<th style="padding: 0 0 0 15px;">Total</th>
			</tr>
			<tr>
				<td style="padding: 0 15px 0 0;">Mask Model XYZ</td>
				<td style="padding: 0 15px;">$10.00</td>
				<td style="padding: 0 15px;">1</td>
				<td style="padding: 0 0 0 15px;">$10.00</td>
			</tr>
			<tr>
				<td style="padding: 0 15px 0 0;">Mask Model ABC</td>
				<td style="padding: 0 15px;">$15.00</td>
				<td style="padding: 0 15px;">2</td>
				<td style="padding: 0 0 0 15px;">$30.00</td>
			</tr>
			<tr>
				<td style="padding: 0 15px 0 0;">Total</td>
				<td style="padding: 0 15px;" />
				<td style="padding: 0 15px;" />
				<td style="padding: 0 0 0 15px;">$40.00</td>
			</tr>
		</mj-table>
		<mj-text color="#0abcf2" font-size="18px" font-weight="bold">Endereço de cobrança</mj-text>
		<mj-text color="#636363"
			>{deliveryInfo.fullName}<br />{deliveryInfo.address.address}
			{deliveryInfo.address.number}<br />{deliveryInfo.address.complement}<br />{deliveryInfo
				.address.neighborhood}<br />{deliveryInfo.address.city}<br />{deliveryInfo.address.state}<br
			/>{deliveryInfo.address.cep}<br />
			<p style="margin: 0 0 16px">{userEmail}</p></mj-text
		>
		<mj-divider border-color="#0abcf2" />
		<mj-text color="#0abcf2" align="center">Mask Me!</mj-text>
		<mj-text color="#0abcf2" align="center">maskme@d2vsolutions.com</mj-text>
	</mj-column>
</mj-section>
