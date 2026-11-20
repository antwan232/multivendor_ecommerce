export interface CartLine {
	id: string;
	productId: string;
	name: string;
	href: string;
	image: string | null;
	variant: string;
	unitPrice: number;
	compareAtPrice: number | null;
	quantity: number;
	maxQuantity: number;
}

export interface CartCoupon {
	code: string;
	percent: number;
}

export interface CartTotals {
	subtotal: number;
	shipping: number;
	discount: number;
	total: number;
	itemCount: number;
	freeShippingRemaining: number;
	freeShippingProgress: number;
}

export type CouponFeedback =
	| { tone: "success"; message: string }
	| { tone: "error"; message: string }
	| null;

