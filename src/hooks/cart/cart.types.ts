export interface Cart {
  message: string;
  cartData: CartDaum[];
  totalCount: number;
}

export interface CartDaum {
  _id: string;
  items: Item[];
  user: string;
  __v: number;
}

export interface Item {
  _id: string;
  productId: string;
  quantity: number;
  cartId: string;
  __v: number;
  product: Product;
}

export interface Product {
  _id: string;
  isActive: boolean;
  currency: string;
  category: Category;
  inventory: number;
  available: boolean;
  name: string;
  price: Price;
  description: string;
  shipping_details: ShippingDetails;
  sku: string;
  media: string[];
}

export interface Category {
  _id: string;
  children: any[];
  name: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Price {
  wholesaler_price: number;
  retailer_price: number;
  distributor_price: number;
}

export interface ShippingDetails {
  weight: number;
  width: number;
  height: number;
  depth: number;
}
