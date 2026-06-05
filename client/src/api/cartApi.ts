import type { CartItemType } from "../interface/cart";

export async function GetCartApi(
  setLoading: (value: boolean) => void,
  setCartItems: (value: CartItemType[]) => void,
  setError: (value: string) => void,
) {
  const res = await fetch("/carts");
  if (!res.ok) return setError(`HTTP error: ${res.status}`);
  const response = await res.json();
  const { status, data } = response;

  if (status === "success") {
    setCartItems(data);
    setLoading(false);
  } else {
    setError("장바구니 상품 목록을 성공적으로 불러오지 못했습니다.");
  }
}

export async function UpdateQuantityApi(
  productId: number,
  quantity: number,
): Promise<boolean> {
  const res = await fetch(`/carts/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) return false;
  const { status } = await res.json();
  return status === "success";
}
