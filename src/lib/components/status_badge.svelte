<script lang="ts">
	export let status:
		| 'COMPLETED'
		| 'PAYMENT_PENDING'
		| 'PROCESSING'
		| 'CANCELLED'
		| 'AWAITING'
		| 'REFUNDED';

	let statusMap = {
		COMPLETED: { class: 'badge-success', text: 'Concluído' },
		PAYMENT_PENDING: { class: 'badge-ghost', text: 'Pagamento Pendente' },
		PROCESSING: { class: 'badge-outline', text: 'Processando' },
		CANCELLED: { class: 'badge-error', text: 'Cancelado' },
		AWAITING: { class: 'badge-warning', text: 'Aguardando' },
		REFUNDED: { class: 'badge-info', text: 'Reembolsado' }
	};
</script>

<span class="badge badge-sm font-medium py-2.5 {statusMap[status].class}">
	{statusMap[status].text}
</span>
