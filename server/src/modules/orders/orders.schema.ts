import { AppError } from "@/errors/AppError";

export interface OrderProduct {
  id: number;
  quantity: number;
}

export interface CreateOrderBody {
  products: OrderProduct[];
}

const isOrderProduct = (item: unknown): item is OrderProduct =>
  !!item &&
  typeof item === "object" &&
  "id" in item &&
  "quantity" in item &&
  typeof (item as OrderProduct).id === "number" &&
  typeof (item as OrderProduct).quantity === "number";

export const validateCreateOrder = (body: unknown): CreateOrderBody => {
  if (
    !body ||
    typeof body !== "object" ||
    !("products" in body) ||
    !Array.isArray((body as CreateOrderBody).products) ||
    !(body as CreateOrderBody).products.every(isOrderProduct)
  ) {
    throw new AppError("INVALID_ORDER");
  }

  return body as CreateOrderBody;
};
