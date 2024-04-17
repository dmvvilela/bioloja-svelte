export type BillingDetails = {
	address: {
		city: string;
		country: string;
		line1: string;
		line2: null | string;
		postal_code: string;
		state: string;
	};
	email: string | null;
	name: string;
	phone: null | string;
};

export type Card = {
	brand: string;
	checks: {
		address_line1_check: string;
		address_postal_code_check: string;
		cvc_check: string;
	};
	country: string;
	display_brand: string;
	exp_month: number;
	exp_year: number;
	fingerprint: string;
	funding: string;
	generated_from: string | null;
	last4: string;
	networks: {
		available: string[];
		preferred: string | null;
	};
	three_d_secure_usage: { supported: boolean };
	wallet: string | null;
};

export type Boleto = {
	fingerprint: string;
	tax_id: string;
};

export type PaymentMethod = {
	id: string;
	object: string;
	allow_redisplay?: string;
	billing_details: BillingDetails;
	card?: Card;
	boleto?: Boleto;
	created: number;
	customer: string | null;
	livemode: boolean;
	metadata: Record<string, unknown>;
	type: string;
};

export type PaymentIntent = {
	id: string;
	object: string;
	amount: number;
	amount_details: { tip: any };
	automatic_payment_methods: null;
	canceled_at: null;
	cancellation_reason: null;
	capture_method: string;
	client_secret: string;
	confirmation_method: string;
	created: number;
	currency: string;
	description: null;
	last_payment_error: null;
	livemode: boolean;
	next_action: NextAction;
	payment_method: string;
	payment_method_configuration_details: null;
	payment_method_types: string[];
	processing: null;
	receipt_email: null;
	setup_future_usage: null;
	shipping: null;
	source: null;
	status: Status;
};

export type Status = 'succeeded' | 'requires_action';

export type NextAction = null | {
	boleto_display_details?: {
		expires_at: number;
		hosted_voucher_url: string;
		number: string;
		pdf: string;
	};
	type: 'boleto_display_details';
};

export type WebhookEvent = {
	id: string;
	object: string;
	api_version: string;
	created: number;
	data: {
		object: {
			id: string;
			object: string;
			amount: number;
			amount_capturable: number;
			amount_details: {
				tip: any;
			};
			amount_received: number;
			application: null;
			application_fee_amount: null;
			automatic_payment_methods: null;
			canceled_at: null;
			cancellation_reason: null;
			capture_method: string;
			charges: Charges;
			client_secret: string;
			confirmation_method: string;
			created: number;
			currency: string;
			customer: null;
			description: null;
			invoice: null;
			last_payment_error: null;
			latest_charge: string;
			livemode: boolean;
			metadata: object;
			next_action: null | {
				boleto_display_details?: {
					expires_at: number;
					hosted_voucher_url: string;
					number: string;
					pdf: string;
				};
				type?: string;
			};
			on_behalf_of: null;
			payment_method: string;
			payment_method_configuration_details: null;
			payment_method_options: {
				boleto: {
					expires_after_days: number;
				};
				card: {
					installments: null;
					mandate_options: null;
					network: null;
					request_three_d_secure: string;
				};
			};
			payment_method_types: string[];
			processing: null;
			receipt_email: null;
			review: null;
			setup_future_usage: null;
			shipping: null;
			source: null;
			statement_descriptor: null;
			statement_descriptor_suffix: null;
			status: string;
			transfer_data: null;
			transfer_group: null;
		};
	};
	livemode: boolean;
	pending_webhooks: number;
	request: {
		id: string;
		idempotency_key: string;
	};
	type: string;
};

export type Charge = {
	id: string;
	object: string;
	amount: number;
	amount_captured: number;
	amount_refunded: number;
	application: null;
	application_fee: null;
	application_fee_amount: null;
	balance_transaction: null;
	billing_details: {
		address: {
			city: string;
			country: string;
			line1: string;
			line2: null;
			postal_code: string;
			state: string;
		};
		email: null;
		name: string;
		phone: null;
	};
	calculated_statement_descriptor: string;
	captured: boolean;
	outcome: {
		network_status: string;
		reason: null;
		risk_level: string;
		risk_score: number;
		seller_message: string;
		type: string;
	};
	paid: boolean;
	payment_intent: string;
	payment_method: string;
	payment_method_details: {
		card: {
			amount_authorized: number;
			brand: string;
			checks: {
				address_line1_check: string;
				address_postal_code_check: string;
				cvc_check: string;
			};
			country: string;
			exp_month: number;
			exp_year: number;
			extended_authorization: {
				status: string;
			};
			last4: string;
			network: string;
		};
		type: string;
	};
	receipt_url: string;
	status: string;
};

export type Charges = {
	object: string;
	data: Charge[];
	url: string;
};
