import type { CartItem } from "../interface/cart";

export async function GetCartApi(
  setLoading: (value: boolean) => void,
  setCartItems: (value: CartItem[]) => void,
) {
  const res = await fetch("/carts");
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  const response = await res.json();
  const { status, data } = response;

  if (status === "success") {
    setCartItems(data);
    setLoading(false);
  } else {
    throw new Error("장바구니 상품 목록을 성공적으로 불러오지 못했습니다.");
  }
}
