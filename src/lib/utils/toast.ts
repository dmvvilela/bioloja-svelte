import toast from 'svelte-french-toast';

export function showToast(
	promise: Promise<any>,
	messages: { loading: string; success: any; error: any }
) {
	toast.promise(
		promise,
		{
			loading: messages.loading,
			success: (result) =>
				typeof messages.success === 'function' ? messages.success(result) : messages.success,
			error: (err) => (typeof messages.error === 'function' ? messages.error(err) : messages.error)
		},
		{
			position: 'bottom-center',
			style: 'border-radius: 200px; background: #002336; color: #fff; padding: 12px;'
		}
	);
}
