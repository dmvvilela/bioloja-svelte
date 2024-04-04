// Fórmula original no Apple Numbers:
// SE(R2<31;R2×0,5;SE(R2<61;(15+(R2−30)×0,45);SE(R2<101;(28,5+(R2−60)×0,4);(44,5+(R2−100)×0,35))))
export const calculatePrice = (numberOfSlides: number, discountPercentage = 0) => {
	let price;

	if (numberOfSlides < 31) {
		price = numberOfSlides * 0.5;
	} else if (numberOfSlides < 61) {
		price = 15 + (numberOfSlides - 30) * 0.45;
	} else if (numberOfSlides < 101) {
		price = 28.5 + (numberOfSlides - 60) * 0.4;
	} else {
		price = 44.5 + (numberOfSlides - 100) * 0.35;
	}

	const discount = price * (discountPercentage / 100);
	return price - discount;
};
