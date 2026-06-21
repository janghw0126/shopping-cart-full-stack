export interface OrderProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderCoupon {
  id: number;
  title: string;
  discountType: string;
  discountValue: number;
}

export interface OrderDetail {
  products: OrderProduct[];
  coupons: OrderCoupon[];
  isRemoteArea: boolean;
  deliveryFee: number;
}
