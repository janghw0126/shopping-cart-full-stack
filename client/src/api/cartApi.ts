import type { CartItemType } from "../types/cart";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function getCartApi(): Promise<CartItemType[]> {
  const res = await fetch(`${BASE_URL}/carts`);
  if (!res.ok)
    throw new Error("장바구니를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
  const { status, data } = await res.json();
  if (status !== "success")
    throw new Error("장바구니를 불러오는 데 실패했습니다.");
  return data;
}

export async function deleteCartItemApi(productId: number): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/carts/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) return false;
  const { status } = await res.json();
  return status === "success";
}

export async function updateQuantityApi(
  productId: number,
  quantity: number,
): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/carts/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) return false;
  const { status } = await res.json();
  return status === "success";
}
