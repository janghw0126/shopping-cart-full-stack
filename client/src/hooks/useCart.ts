import { useEffect, useState } from "react";
import { DeleteCartItemApi, GetCartApi, UpdateQuantityApi } from "../api/cartApi";
import type { CartItemType } from "../types/cart";

export function useCart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    GetCartApi(setLoading, setCartItems, setError);
  }, []);

  async function updateQuantity(productId: number, quantity: number) {
    const success = await UpdateQuantityApi(productId, quantity);
    if (success) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }

  async function deleteItem(productId: number) {
    const success = await DeleteCartItemApi(productId);
    if (success) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    }
  }

  return { loading, error, cartItems, updateQuantity, deleteItem };
}
