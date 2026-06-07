import { useEffect, useMemo, useState } from "react";
import type { CartItemType } from "../types/cart";

const STORAGE_KEY = "cart-selected";

export function useCartSelection(cartItems: CartItemType[]) {
  const [isSelected, setIsSelected] = useState<{ [id: number]: boolean }>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : {};
    },
  );

  const activeSelection = useMemo(
    () =>
      Object.fromEntries(
        cartItems.map((item) => [item.product.id, isSelected[item.product.id] ?? true]),
      ),
    [cartItems, isSelected],
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeSelection));
  }, [activeSelection]);

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => activeSelection[item.product.id] === true);

  function toggleItem(id: number) {
    setIsSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll(checked: boolean) {
    const result: { [id: number]: boolean } = {};
    for (const item of cartItems) {
      result[item.product.id] = checked;
    }
    setIsSelected(result);
  }

  return { isSelected: activeSelection, allSelected, toggleItem, toggleAll };
}
