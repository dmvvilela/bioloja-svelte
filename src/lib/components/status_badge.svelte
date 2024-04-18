<script>
	export let status = '';
</script>

<span
	class={status === 'Concluído'
		? 'badge badge-success badge-sm'
		: status === 'Pagamento Pendente'
		? 'badge badge-ghost badge-sm'
		: status === 'Processando'
		? 'badge badge-outline badge-sm'
		: status === 'Cancelado'
		? 'badge badge-error badge-sm'
		: status === 'Aguardando'
		? 'badge badge-warning badge-sm'
		: 'badge badge-info badge-sm'}
>
	{status}
</span>
