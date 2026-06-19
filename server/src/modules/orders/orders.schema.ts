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

export interface PatchOrderCouponBody {
  type: "coupon";
  couponIds: number[];
}

export interface PatchOrderShippingBody {
  type: "shipping";
  isRemoteArea: boolean;
}

export type PatchOrderBody = PatchOrderCouponBody | PatchOrderShippingBody;

export const validatePatchOrder = (body: unknown): PatchOrderBody => {
  if (!body || typeof body !== "object") throw new AppError("INVALID_PATCH_ORDER");
  const b = body as Record<string, unknown>;

  if (b.type === "coupon") {
    if (
      !Array.isArray(b.couponIds) ||
      !b.couponIds.every((id) => typeof id === "number")
    ) throw new AppError("INVALID_PATCH_ORDER");
    return { type: "coupon", couponIds: b.couponIds as number[] };
  }

  if (b.type === "shipping") {
    if (typeof b.isRemoteArea !== "boolean") throw new AppError("INVALID_PATCH_ORDER");
    return { type: "shipping", isRemoteArea: b.isRemoteArea };
  }

  throw new AppError("INVALID_PATCH_ORDER");
};

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
