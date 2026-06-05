import type { ProductType } from "./product";

export interface CartItemType {
  product: ProductType;
  quantity: number;
}
