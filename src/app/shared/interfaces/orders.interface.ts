import { Products } from './product.interface';

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
  productId: Products;
  quantity: string; // If this should be a number, change it to `number`.
  price: number;
  stock: number;
  image: string;
  name: string;
  _id: string;
  status: string;
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
  user: any;
  product: Product[];
  paymentMethod: string;
  payment: boolean;
  shippingAddress: ShippingAddress;
  discountCoupon: string;
  discountAmount: number;
  orderComfirmed: string; // If this is always "pending" or similar states, you can use a union type like `"pending" | "confirmed"`.
  total: number;
  createdAt: any; // Use `Date` if you plan to parse these strings into actual `Date` objects.
  updatedAt: any; // Same as above.
  orderNumber: string;
  __v: number;
  salesorderId: string;
  invoiceId: string;
  totalOrder: number;
  itemsTotal: number;
  vat: number;
  deliveryCharge: number;
  remark?: string;
}



export interface ReturnRequest {
  _id: string;
  userId: any // Nullable because it can be null
  orderId: Order;
  productId: Products;
  quantity: number;
  email: string;
  price: number;
  messages: string;
  response: string;
  request: string; // Enum based on possible values
  status: string; // Enum based on schema
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}


