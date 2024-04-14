import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type GuestCart = {
	products: number[];
	coupon?: {
		code: string;
		type: string;
		value: number;
	};
};

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

export const cartItemsCount = writable(0);

const createGuestCartStore = (key: string) => {
	const { subscribe, set, update } = writable<GuestCart>();

	const cart = getLocalStorage(key);
	set(cart || { products: [] });

	return {
		subscribe,
		add: (productId: number) =>
			update((cart) => {
				cart.products.push(productId);
				setLocalStorage(key, cart);
				return cart;
			}),
		remove: (productId: number) =>
			update((cart) => {
				const products = cart.products.filter((item) => item !== productId);
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
			set({ products: [] });
		}
	};
};

export const guestCart = createGuestCartStore('guestCart');
