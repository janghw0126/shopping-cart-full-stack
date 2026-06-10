import { describe, it, expect } from "vitest";
import { calcOrderSummary } from "../utils/orderSummaryUtils";
import type { CartItemType } from "../types/cart";

const items: CartItemType[] = [
  { product: { id: 1, name: "A", price: 10000, image: "" }, quantity: 2 },
  { product: { id: 2, name: "B", price: 50000, image: "" }, quantity: 1 },
  { product: { id: 3, name: "C", price: 5000, image: "" }, quantity: 3 },
];

describe("calcOrderSummary", () => {
  it("선택된 상품만 합산한다", () => {
    const isSelected = { 1: true, 2: false, 3: true };
    const result = calcOrderSummary(items, isSelected);
    expect(result.orderAmount).toBe(10000 * 2 + 5000 * 3); // 35000
    expect(result.selectedCount).toBe(2);
    expect(result.totalQuantity).toBe(5);
  });

  it("주문 금액이 100,000원 미만이면 배송비 3,000원이 부과된다", () => {
    const isSelected = { 1: true, 2: false, 3: false };
    const result = calcOrderSummary(items, isSelected);
    expect(result.orderAmount).toBe(20000);
    expect(result.shippingFee).toBe(3000);
    expect(result.totalAmount).toBe(23000);
  });

  it("주문 금액이 100,000원 미만이면 배송비가 부과된다", () => {
    // 10000*2 + 50000*1 + 5000*3 = 85000 → 무료 배송 미달
    const isSelected = { 1: true, 2: true, 3: true };
    const result = calcOrderSummary(items, isSelected);
    expect(result.shippingFee).toBe(3000);
  });

  it("주문 금액이 정확히 100,000원이면 무료 배송이다", () => {
    const freeItems: CartItemType[] = [
      { product: { id: 1, name: "A", price: 100000, image: "" }, quantity: 1 },
    ];
    const result = calcOrderSummary(freeItems, { 1: true });
    expect(result.shippingFee).toBe(0);
    expect(result.totalAmount).toBe(100000);
  });

  it("선택된 항목이 없으면 모두 0이다", () => {
    const isSelected = { 1: false, 2: false, 3: false };
    const result = calcOrderSummary(items, isSelected);
    expect(result.orderAmount).toBe(0);
    expect(result.selectedCount).toBe(0);
    expect(result.totalQuantity).toBe(0);
    expect(result.shippingFee).toBe(3000);
    expect(result.totalAmount).toBe(3000);
  });
});
