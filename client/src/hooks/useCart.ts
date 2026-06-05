import { useEffect, useState } from "react";
import type { CartItemType } from "../types/cart";

interface CartApi {
  fetchCart: (
    setLoading: (v: boolean) => void,
    setCartItems: (v: CartItemType[]) => void,
    setError: (v: string) => void
  ) => void;
  updateCart: (productId: number, quantity: number) => Promise<boolean>;
  deleteCart: (productId: number) => Promise<boolean>;
}

export function useCart({ fetchCart, updateCart, deleteCart }: CartApi) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    fetchCart(setLoading, setCartItems, setError);
  }, []);

  async function updateQuantity(productId: number, quantity: number) {
    const success = await updateCart(productId, quantity);
    if (success) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }

  async function deleteItem(productId: number) {
    const success = await deleteCart(productId);
    if (success) {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    }
  }

  return { loading, error, cartItems, updateQuantity, deleteItem };
}
