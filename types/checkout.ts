export type CheckoutLine = {
	id: string;
	name: string;
	image: string;
	quantity: number;
	packLabel: string;
	unitPrice: number;
	unitOriginalPrice: number;
};

export type CheckoutTotals = {
	subtotal: number;
	discount: number;
	vatPercentage: number;
	vat: number;
	shipping: number;
	total: number;
};

export type PaymentMethod = "cash" | "credit_card";

export type DeliveryTime =
	| "08:00 AM - 11:00 AM"
	| "11:00 AM - 03:00 PM"
	| "02:00 PM - 04:00 PM"
	| "04:00 PM - 08:00 PM";

export type ShipmentType = "flat" | "free";

export type AddressType = "home" | "office" | "others";

export type CheckoutForm = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	emailAddress: string;
	country: string;
	state: string;
	city: string;
	zipCode: string;
	apartment: string;
	deliveryTime: DeliveryTime;
	shipmentType: ShipmentType;
	addressType: AddressType;
};

export type CheckoutField = keyof CheckoutForm;

