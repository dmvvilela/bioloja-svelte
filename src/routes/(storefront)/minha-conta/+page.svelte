<script lang="ts">
	import Breadcrumbs from '$lib/components/layout/breadcrumbs.svelte';
</script>

<div class="container mx-auto">
	<Breadcrumbs />
	<div class="grid grid-cols-12 items-start gap-6 pt-4 pb-16">
		<!-- sidebar -->
		<div class="col-span-3">
			<div class="px-4 py-3 shadow flex items-center gap-4">
				<div class="flex-shrink-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="rounded-full w-14 h-14 ml-6"
					>
						<path
							fill-rule="evenodd"
							d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
							clip-rule="evenodd"
						/>
					</svg>
					<!-- <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="rounded-full w-12 h-12 border border-gray-200 p-1 object-cover"
					>
						<path
							fill-rule="evenodd"
							d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
							clip-rule="evenodd"
						/>
					</svg> -->
				</div>
				<div class="flex-grow">
					<p class="text-gray-600">Hello,</p>
					<h4 class="text-gray-800 font-medium">John Doe</h4>
				</div>
			</div>

			<div
				class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600"
			>
				<div class="space-y-1 pl-8">
					<a href="#" class="relative text-primary block font-medium capitalize transition">
						<span class="absolute -left-8 top-0.5 text-base">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
								/>
							</svg>
						</span>
						Manage account
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						Profile information
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						Manage addresses
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						Change password
					</a>
				</div>

				<div class="space-y-1 pl-8 pt-4">
					<a href="#" class="relative hover:text-primary block font-medium capitalize transition">
						<span class="absolute -left-8 top-0.5 text-base">
							<!-- <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
								/>
							</svg> -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
								/>
								<path
									fill-rule="evenodd"
									d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
						My order history
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						My returns
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						My Cancellations
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition">
						My reviews
					</a>
				</div>

				<div class="space-y-1 pl-8 pt-4">
					<a href="#" class="relative hover:text-primary block font-medium capitalize transition">
						<span class="absolute -left-8 top-0.5 text-base">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
								/>
							</svg>
						</span>
						Payment methods
					</a>
					<a href="#" class="relative hover:text-primary block capitalize transition"> voucher </a>
				</div>

				<div class="space-y-1 pl-8 pt-4">
					<a href="#" class="relative hover:text-primary block font-medium capitalize transition">
						<span class="absolute -left-8 top-0.5 text-base">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
								/>
							</svg>
						</span>
						My wishlist
					</a>
				</div>

				<div class="space-y-1 pl-8 pt-4">
					<a href="#" class="relative hover:text-primary block font-medium capitalize transition">
						<span class="absolute -left-8 top-0.5 text-base">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
						Sair
					</a>
				</div>
			</div>
		</div>
		<!-- ./sidebar -->

		<!-- info -->
		<div class="col-span-9 grid grid-cols-3 gap-4">
			<div class="shadow rounded bg-white px-4 pt-6 pb-8">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-medium text-gray-800 text-lg">Personal Profile</h3>
					<a href="#" class="text-primary">Edit</a>
				</div>
				<div class="space-y-1">
					<h4 class="text-gray-700 font-medium">John Doe</h4>
					<p class="text-gray-800">example@mail.com</p>
					<p class="text-gray-800">0811 8877 988</p>
				</div>
			</div>

			<div class="shadow rounded bg-white px-4 pt-6 pb-8">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-medium text-gray-800 text-lg">Shipping address</h3>
					<a href="#" class="text-primary">Edit</a>
				</div>
				<div class="space-y-1">
					<h4 class="text-gray-700 font-medium">John Doe</h4>
					<p class="text-gray-800">Medan, North Sumatera</p>
					<p class="text-gray-800">20371</p>
					<p class="text-gray-800">0811 8877 988</p>
				</div>
			</div>

			<div class="shadow rounded bg-white px-4 pt-6 pb-8">
				<div class="flex items-center justify-between mb-4">
					<h3 class="font-medium text-gray-800 text-lg">Billing address</h3>
					<a href="#" class="text-primary">Edit</a>
				</div>
				<div class="space-y-1">
					<h4 class="text-gray-700 font-medium">John Doe</h4>
					<p class="text-gray-800">Medan, North Sumatera</p>
					<p class="text-gray-800">20317</p>
					<p class="text-gray-800">0811 8877 988</p>
				</div>
			</div>
		</div>
		<!-- ./info -->
	</div>
</div>
