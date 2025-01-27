export interface OrderCount {
  pendingOrders: number;
  cancelledOrders: number;
  deliveredOrders: number;
  totalOrders: number;
}

interface BillingInfo {
  name: string;
  phone: number;
  addresss: string; // Assuming the misspelling is intentional; otherwise, change to `address`.
  city: string;
}

interface Product {
  productId: string;
  quantity: string; // If this should be a number, change it to `number`.
  price: number;
  stock: number;
  image: string;
  name: string;
  _id: string;
}

interface ShippingAddress {
  _id: string;
  type: string;
  flatname: string;
  flatno: string;
  street: string;
  landMark: string;
  city: string;
  pin: number;
  country: string;
  delivery: boolean;
}

export interface Order {
  billingInfo: BillingInfo;
  reFund: boolean;
  _id: string;
  user: string;
  product: Product[];
  paymentMethod: string;
  payment: boolean;
  shippingAddress: ShippingAddress;
  discountCoupon: string;
  discountAmount: number;
  orderComfirmed: string; // If this is always "pending" or similar states, you can use a union type like `"pending" | "confirmed"`.
  total: number;
  createdAt: string; // Use `Date` if you plan to parse these strings into actual `Date` objects.
  updatedAt: string; // Same as above.
  orderNumber: string;
  __v: number;
  salesorderId: string;
  invoiceNumber?: string;
}
