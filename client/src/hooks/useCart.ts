import { useEffect, useState } from "react";
import type { CartItemType } from "../types/cart";

interface CartApi {
  fetchCart: () => Promise<CartItemType[]>;
  updateCart: (productId: number, quantity: number) => Promise<boolean>;
  deleteCart: (productId: number) => Promise<boolean>;
}

export function useCart({ fetchCart, updateCart, deleteCart }: CartApi) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch {
        setError("장바구니를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function updateQuantity(productId: number, quantity: number) {
    const prevItems = cartItems;
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
    try {
      const success = await updateCart(productId, quantity);
      if (!success) throw new Error();
    } catch {
      setCartItems(prevItems);
      alert("장바구니 상품 수량 업데이트에 실패하였습니다. 다시 시도해주세요.");
    }
  }

  async function deleteItem(productId: number) {
    const prevItems = cartItems;
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    try {
      const success = await deleteCart(productId);
      if (!success) throw new Error();
    } catch {
      setCartItems(prevItems);
      alert("장바구니 상품 삭제에 실패하였습니다. 다시 시도해주세요.");
    }
  }

  return { loading, error, cartItems, updateQuantity, deleteItem };
}
