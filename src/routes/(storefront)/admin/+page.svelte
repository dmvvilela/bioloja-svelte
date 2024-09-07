<script lang="ts">
	import { Bar, Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement
	} from 'chart.js';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		LineElement,
		CategoryScale,
		LinearScale,
		PointElement
	);

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

	const salesData = {
		labels: months,
		datasets: [
			{
				label: 'Sales',
				data: [1200, 1900, 3000, 5000, 2000, 3000],
				backgroundColor: 'rgba(59, 130, 246, 0.5)',
				borderColor: 'rgb(59, 130, 246)',
				borderWidth: 1
			}
		]
	};

	const ordersData = {
		labels: months,
		datasets: [
			{
				label: 'Orders',
				data: [150, 220, 340, 480, 220, 300],
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top' as const
			},
			title: {
				display: true,
				text: 'Monthly Overview'
			}
		}
	};

	const couponUsage = [
		{ code: 'SUMMER10', usageCount: 156, totalValue: 1560.0 },
		{ code: 'NEWUSER20', usageCount: 89, totalValue: 890.0 },
		{ code: 'FLASH50', usageCount: 45, totalValue: 2250.0 }
	];

	// New users data
	const newUsers = [
		{ name: 'John Doe', email: 'joh*****@example.com', dateAdded: '2023-06-01' },
		{ name: 'Jane Smith', email: 'jan*****@example.com', dateAdded: '2023-06-02' },
		{ name: 'Bob Johnson', email: 'bob*****@example.com', dateAdded: '2023-06-03' },
		{ name: 'Alice Brown', email: 'ali*****@example.com', dateAdded: '2023-06-04' },
		{ name: 'Charlie Davis', email: 'cha*****@example.com', dateAdded: '2023-06-05' }
	];

	// Email subscribers data
	const emailSubscribers = [
		{ email: 'sub*****@example.com', dateAdded: '2023-06-01' },
		{ email: 'new*****@example.com', dateAdded: '2023-06-02' },
		{ email: 'use*****@example.com', dateAdded: '2023-06-03' },
		{ email: 'cus*****@example.com', dateAdded: '2023-06-04' },
		{ email: 'mem*****@example.com', dateAdded: '2023-06-05' }
	];
</script>

<div class="min-h-screen bg-base-200">
	<!-- Top Navigation -->
	<div class="navbar bg-base-100 shadow-lg">
		<div class="max-w-7xl mx-auto flex flex-grow">
			<div class="flex-1">
				<!-- <a class="btn btn-ghost normal-case text-xl">DigitalStore</a> -->
				<h1 class="text-3xl font-bold p-2">Dashboard</h1>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a class="active">Dashboard</a></li>
					<li><a>Products</a></li>
					<li><a>Orders</a></li>
					<li><a>Customers</a></li>
					<li><a>Analytics</a></li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="pt-8 pb-16 max-w-7xl mx-auto">
		<!-- Metrics -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
			<div class="stat bg-base-100 shadow">
				<div class="stat-title">Total Revenue</div>
				<div class="stat-value">$45,231.89</div>
				<div class="stat-desc text-success">↗︎ 20.1% from last month</div>
			</div>
			<div class="stat bg-base-100 shadow">
				<div class="stat-title">Orders</div>
				<div class="stat-value">2,350</div>
				<div class="stat-desc text-success">↗︎ 180.1% from last month</div>
			</div>
			<div class="stat bg-base-100 shadow">
				<div class="stat-title">New Customers</div>
				<div class="stat-value">12,234</div>
				<div class="stat-desc text-success">↗︎ 19% from last month</div>
			</div>
			<div class="stat bg-base-100 shadow">
				<div class="stat-title">Active Now</div>
				<div class="stat-value">573</div>
				<div class="stat-desc text-success">↗︎ 201 since last hour</div>
			</div>
		</div>

		<!-- Charts -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">Monthly Sales</h2>
					<div class="h-64">
						<Bar data={salesData} options={chartOptions} />
					</div>
				</div>
			</div>
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">Monthly Orders</h2>
					<div class="h-64">
						<Line data={ordersData} options={chartOptions} />
					</div>
				</div>
			</div>
		</div>

		<!-- Coupon Usage -->
		<div class="card bg-base-100 shadow-xl mb-8">
			<div class="card-body">
				<h2 class="card-title mb-4">Coupon Usage</h2>
				<div class="overflow-x-auto">
					<table class="table w-full">
						<thead>
							<tr>
								<th>Coupon Code</th>
								<th>Usage Count</th>
								<th>Total Value</th>
							</tr>
						</thead>
						<tbody>
							{#each couponUsage as coupon}
								<tr>
									<td>{coupon.code}</td>
									<td>{coupon.usageCount}</td>
									<td>${coupon.totalValue.toFixed(2)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<!-- New Users and Email Subscribers -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 mb-8">
			<!-- New Users Table -->
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">New Users</h2>
					<div class="overflow-x-auto">
						<table class="table w-full">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Date Added</th>
								</tr>
							</thead>
							<tbody>
								{#each newUsers as user}
									<tr>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.dateAdded}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Email Subscribers Table -->
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">Email Subscribers</h2>
					<div class="overflow-x-auto">
						<table class="table w-full">
							<thead>
								<tr>
									<th>Email</th>
									<th>Date Subscribed</th>
								</tr>
							</thead>
							<tbody>
								{#each emailSubscribers as subscriber}
									<tr>
										<td>{subscriber.email}</td>
										<td>{subscriber.dateAdded}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent Orders and Top Products -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">Recent Orders</h2>
					<div class="overflow-x-auto">
						<table class="table w-full">
							<thead>
								<tr>
									<th>Order</th>
									<th>Product</th>
									<th>Customer</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>#4324</td>
									<td>SEO Mastery Course</td>
									<td>johndoe@example.com</td>
									<td>$299.00</td>
								</tr>
								<tr>
									<td>#4323</td>
									<td>Digital Marketing eBook</td>
									<td>jane@example.com</td>
									<td>$19.99</td>
								</tr>
								<tr>
									<td>#4322</td>
									<td>Photoshop Masterclass</td>
									<td>bob@example.com</td>
									<td>$89.00</td>
								</tr>
								<tr>
									<td>#4321</td>
									<td>Web Dev Bootcamp</td>
									<td>sarah@example.com</td>
									<td>$499.00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title mb-4">Top Products</h2>
					<ul class="menu bg-base-100 w-full rounded-box">
						<li>
							<div class="flex justify-between items-center w-full">
								<div>
									<h3 class="font-medium">SEO Mastery Course</h3>
									<p class="text-sm opacity-70">1,234 sales</p>
								</div>
								<span class="badge">$299.00</span>
							</div>
						</li>
						<li>
							<div class="flex justify-between items-center w-full">
								<div>
									<h3 class="font-medium">Digital Marketing eBook</h3>
									<p class="text-sm opacity-70">5,678 sales</p>
								</div>
								<span class="badge">$19.99</span>
							</div>
						</li>
						<li>
							<div class="flex justify-between items-center w-full">
								<div>
									<h3 class="font-medium">Photoshop Masterclass</h3>
									<p class="text-sm opacity-70">987 sales</p>
								</div>
								<span class="badge">$89.00</span>
							</div>
						</li>
						<li>
							<div class="flex justify-between items-center w-full">
								<div>
									<h3 class="font-medium">Web Dev Bootcamp</h3>
									<p class="text-sm opacity-70">456 sales</p>
								</div>
								<span class="badge">$499.00</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>
