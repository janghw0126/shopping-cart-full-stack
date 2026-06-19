import { supabase } from "@db/supabase";
import type { Coupon, Product } from "@/type";
import type { OrderProduct } from "./orders.schema";

export type OrderRow = {
  id: number;
  isExpired: boolean;
  isRemoteArea: boolean;
  deliveryFee: number;
};

export type OrderProductRow = Product & { quantity: number };

type ProductWithStock = Product & { stock: number };

const mapToCoupon = (row: Record<string, unknown>): Coupon => ({
  id: row.id as number,
  code: row.code as string,
  title: row.title as string,
  discountType: row.discount_type as Coupon["discountType"],
  discountValue: row.discount_value as number,
  minimumAmount: (row.minimum_amount as number) ?? undefined,
  expirationDate: row.expiration_date as string,
  availableTime:
    row.available_time_start
      ? {
          start: row.available_time_start as string,
          end: row.available_time_end as string,
        }
      : undefined,
});

export const getProductWithStockQuery = async (
  productId: number,
): Promise<ProductWithStock | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image, stock")
    .eq("id", productId)
    .single();

  if (error || !data) return null;
  return data as ProductWithStock;
};

export const reserveProductsQuery = async (
  items: OrderProduct[],
): Promise<void> => {
  for (const item of items) {
    const { data: product } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.id)
      .single();

    await supabase
      .from("products")
      .update({ stock: (product?.stock ?? 0) - item.quantity })
      .eq("id", item.id);
  }
};

export const getAllCouponsQuery = async (): Promise<Coupon[]> => {
  const { data, error } = await supabase.from("coupons").select("*");

  if (error || !data) return [];
  return data.map(mapToCoupon);
};

export const getProductsByIdsQuery = async (
  productIds: number[],
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image")
    .in("id", productIds);

  if (error || !data) return [];
  return data as Product[];
};

export const createOrderQuery = async (): Promise<{ id: number }> => {
  const { data, error } = await supabase
    .from("orders")
    .insert({ is_expired: false, is_remote_area: false, delivery_fee: 3000 })
    .select("id")
    .single();

  if (error || !data) throw new Error(`주문 생성에 실패했습니다. ${error?.message}`);
  return data as { id: number };
};

export const createOrderProductsQuery = async (
  orderId: number,
  items: (OrderProduct & { price: number })[],
): Promise<void> => {
  const rows = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error } = await supabase.from("order_products").insert(rows);
  if (error) throw new Error(`주문 상품 저장에 실패했습니다. ${error.message}`);
};

export const createOrderCouponsQuery = async (
  orderId: number,
  couponIds: number[],
): Promise<void> => {
  const rows = couponIds.map((couponId) => ({
    order_id: orderId,
    coupon_id: couponId,
  }));

  const { error } = await supabase.from("order_coupons").insert(rows);
  if (error) throw new Error("주문 쿠폰 저장에 실패했습니다.");
};
