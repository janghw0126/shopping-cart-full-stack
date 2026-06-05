import { useEffect, useState } from "react";
import type { CartItemType } from "../interface/cart";

const STORAGE_KEY = "cart-selected";

export function useCartSelection(cartItems: CartItemType[]) {
  const [isSelected, setIsSelected] = useState<{ [id: number]: boolean }>(
    () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved !== null ? JSON.parse(saved) : null;
      const result: { [id: number]: boolean } = {};

      for (const item of cartItems) {
        const id = item.product.id;
        // 저장된 값이 있으면 그 값을 쓰고, 없으면 기본값 true
        result[id] = parsed !== null ? (parsed[id] ?? true) : true;
      }

      return result;
    },
  );

  // isSelected가 바뀔 때마다 localStorage에 저장함
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isSelected));
  }, [isSelected]);

  // 전체 선택 여부 확인
  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) => isSelected[item.product.id] === true);

  function toggleItem(id: number) {
    setIsSelected({ ...isSelected, [id]: !isSelected[id] });
  }

  function toggleAll(checked: boolean) {
    const result: { [id: number]: boolean } = {};
    for (const item of cartItems) {
      result[item.product.id] = checked;
    }
    setIsSelected(result);
  }

  return { isSelected, allSelected, toggleItem, toggleAll };
}
