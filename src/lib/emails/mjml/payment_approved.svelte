<script lang="ts">
	export let email: string;
	export let orderNumber: string;
	export let orderDate: Date;
	export let paymentMethodTitle: string;
	export let couponCode: string;
	export let discount: number;
	export let subtotal: number;
	export let total: number;

	// const date = orderDate.toLocaleDateString('pt-BR', {
	// 	day: 'numeric',
	// 	month: 'long',
	// 	year: 'numeric',
	// 	hour: '2-digit',
	// 	minute: '2-digit'
	// });
</script>

<mj-section padding="20px 0">
	<mj-column width="60%">
		<!-- <mj-text font-size="10px">Você está recebendo este e-mail pois assinou o AFH.</mj-text> -->
	</mj-column>
	<mj-column width="40%">
		<!-- <mj-text align="right">[[PERMALINK]]</mj-text> -->
	</mj-column>
</mj-section>
<mj-section>
	<mj-column width="100%">
		<mj-image
			href="https://bioloja.bio.br"
			src="https://bioimages.d2vsolutions.com/logo%2Ffull.jpg"
		/>
	</mj-column>
</mj-section>
<mj-section>
	<mj-column width="100%">
		<!-- <mj-text align="center">Seu conteúdo favorito de anatomia e fisiologia humana!</mj-text> -->
	</mj-column>
</mj-section>
<mj-section>
	<mj-column width="66%">
		<mj-text align="center" font-weight="500" padding="0px" font-size="24px">
			Pagamento aprovado!
		</mj-text>
		<mj-divider border-width="2px" border-color="#616161" />
	</mj-column>
</mj-section>
<mj-section padding-top="8px">
	<mj-column width="100%">
		<mj-text>
			<!-- <p style="padding-bottom: 8px">Agradecemos o seu pedido.</p> -->
			<p style="padding-bottom: 8px">
				Recebemos o seu pagamento e seu pedido #{orderNumber} foi liberado.
			</p>
			<p style="padding-bottom: 8px">
				Acesse seus downloads no menu Minha Conta &gt; Downloads, ou acessando seu pedido clicando
				no botão abaixo.
			</p>
		</mj-text>
	</mj-column>
	<mj-column width="100%">
		<!-- <mj-text color="#7895A3" font-size="18px" font-weight="bold"
			>Pedido #{orderNumber} ({date}):</mj-text
		>
		<mj-table padding-top="10px" padding-bottom="20px">
			<tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
				<th style="padding: 0 15px 0 0;">Método de Pagamento</th>
				<th style="padding: 0 15px;">Cupom</th>
				<th style="padding: 0 15px;">Subtotal</th>
				<th style="padding: 0 15px;">Desconto</th>
				<th style="padding: 0 0 0 15px;">Total</th>
			</tr>
			<tr>
				<td style="padding: 0 15px 0 0;">{paymentMethodTitle}</td>
				<td style="padding: 0 15px;">{couponCode}</td>
				<td style="padding: 0 15px;">R$ {(subtotal / 100).toFixed(2).replace('.', ',')}</td>
				<td style="padding: 0 15px;">R$ {(discount / 100).toFixed(2).replace('.', ',')}</td>
				<td style="padding: 0 0 0 15px;">R$ {(total / 100).toFixed(2).replace('.', ',')}</td>
			</tr>

		</mj-table> -->
		<!-- <mj-text color="#7895A3" font-size="18px" font-weight="bold">Endereço de cobrança</mj-text>
		<mj-text color="#636363"
			>{deliveryInfo.fullName}<br />{deliveryInfo.address.address}
			{deliveryInfo.address.number}<br />{deliveryInfo.address.complement}<br />{deliveryInfo
				.address.neighborhood}<br />{deliveryInfo.address.city}<br />{deliveryInfo.address.state}<br
			/>{deliveryInfo.address.cep}<br />
			<p style="margin: 0 0 16px">{email}</p></mj-text
		> -->
	</mj-column>
</mj-section>
<mj-section>
	<mj-column>
		<mj-text padding="0 25px">
			<!-- <p style="color:#BDBDBD; line-height: 9px">Ana Luisa Miranda-Vilela - Editora de conteúdo</p> -->
			<!-- <p style="font-style: italic; color:#BDBDBD; line-height: 21px">
				Não podemos ensinar a outra pessoa diretamente; só podemos facilitar sua aprendizagem.
			</p> -->
		</mj-text>
	</mj-column>
</mj-section>
<mj-section>
	<mj-column>
		<mj-button
			href="https://bioloja.bio.br/minha-conta/pedidos/{orderNumber}"
			font-size="16px"
			font-weight="500"
			background-color="#7895A3"
			color="#fff"
		>
			Ver meus pedido
		</mj-button>
	</mj-column>
</mj-section>
<mj-section>
	<mj-column width="100%">
		<mj-divider border-width="1px" border-color="#E0E0E0" />
	</mj-column>
</mj-section>
<mj-section>
	<mj-text color="#002336" align="center">&copy; Bioloja - Todos os direitos reservados.</mj-text>
	<mj-text color="#002336" align="center">contato@bioloja.bio.br</mj-text>
	<mj-column width="25%">
		<mj-table>
			<tr style="list-style: none;line-height:1">
				<td>
					<!-- <a href="https://www.facebook.com/Bioloja">
						<img
							width="50"
							alt="facebook"
							src="https://w7.pngwing.com/pngs/844/596/png-transparent-facebook-logo-facebook-computer-icons-logo-blog-facebook-icon-text-rectangle-symbol.png"
						/>
					</a> -->
				</td>
				<td>
					<!-- <a href="https://instagram.com/biolojaoficial">
						<img
							width="25"
							alt="isntagram"
							src="https://w7.pngwing.com/pngs/998/289/png-transparent-instagram-icon-logo-grayscale-graphic-designer-instagram-customer-service-miscellaneous-angle-gdragon-thumbnail.png"
						/>
					</a> -->
				</td>
			</tr>
		</mj-table>
	</mj-column>
</mj-section>
