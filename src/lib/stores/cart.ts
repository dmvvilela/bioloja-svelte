import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { customAlphabet } from 'nanoid';

export type Product = {
	id: number;
	name: string;
	slug: string;
	categories: string[];
	price: number;
	discountPrice: number | null;
	imageUrls: string;
};

export type GuestCart = {
	cartId: string;
	products: Product[];
	coupon?: {
		code: string;
		type: string;
		value: number;
	};
	couponDiscount: number;
	subtotal: number;
	total: number;
	createdAt: Date;
};

const LONG_ALPHABET = '123467890ABCDEFGHJKLMNPQRTUVWXYZ';
const createId = () => customAlphabet(LONG_ALPHABET, 8)();

const getLocalStorage = (key: string) => {
	const data = browser && localStorage.getItem(key);
	if (!data) return null;
	return JSON.parse(localStorage.getItem(key)!);
};

const setLocalStorage = (key: string, cart: GuestCart) => {
	browser && localStorage.setItem(key, JSON.stringify(cart));
};

const removeLocalStorage = (key: string) => {
	browser && localStorage.removeItem(key);
};

const initCart = () => ({
	cartId: createId(),
	products: [],
	total: 0,
	subtotal: 0,
	couponDiscount: 0,
	createdAt: new Date()
});

export const cartItemsCount = writable(0);

const createGuestCartStore = (key: string) => {
	const { subscribe, set, update } = writable<GuestCart>();

	const cart = getLocalStorage(key);
	set(cart || initCart());

	return {
		subscribe,
		add: (product: Product) =>
			update((cart) => {
				// Check if the product already exists in the cart
				const productExists = cart.products.some(
					(existingProduct) => existingProduct.id === product.id
				);

				// If the product doesn't exist, add it to the cart and update the totals
				if (!productExists) {
					cart.products.push(product);
					cart.subtotal += product.discountPrice || product.price;
					cart.total = cart.subtotal - cart.couponDiscount;
					setLocalStorage(key, cart);
				}

				return cart;
			}),
		remove: (productId: number) =>
			update((cart) => {
				const product = cart.products.find((item) => item.id === productId);
				const products = cart.products.filter((item) => item.id !== productId);
				if (product) {
					cart.subtotal -= product.discountPrice || product.price;
					cart.total = cart.subtotal - cart.couponDiscount;
				}
				const newCart = { ...cart, products };
				setLocalStorage(key, newCart);
				return newCart;
			}),
		get count() {
			let count = 0;
			this.subscribe((cart) => {
				count = cart.products.length;
			})();
			return count;
		},
		addCoupon: (coupon: { code: string; type: string; value: number }) =>
			update((cart) => {
				const newCart = {
					...cart,
					coupon
				};
				setLocalStorage(key, newCart);
				return newCart;
			}),
		removeCoupon: () =>
			update((cart) => {
				const newCart = {
					...cart,
					coupon: undefined
				};
				setLocalStorage(key, newCart);
				return newCart;
			}),
		clear: () => {
			removeLocalStorage(key);
			set(initCart());
		}
	};
};

export const guestCart = createGuestCartStore('guestCart');
